"use client"

import { useState, useEffect, use } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "@/components/image-upload"
import { productSchema, requirementSchema } from "@/lib/validations/product"
import { updateRequirement, createRequirement } from "@/lib/api/product"
import { fetchProductRequirements } from "@/lib/api/buyer-requirement"
import { useToast } from "@/hooks/use-toast"
import { getUserDetails } from "@/lib/SessionManager"
import { Toaster } from "./ui/toaster"


const categories = ['Electronics', 'Clothing', 'Books', 'Other']

export function RequirementForm() {
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const productRequirementId = searchParams.get('id')
  const queryClient = useQueryClient()
  const [uploading, setUploading] = useState(false)
  const [files, setFiles] = useState([])
  const user = getUserDetails()


  const form = useForm({
    resolver: zodResolver(requirementSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      images: [],
    },

  });

  // Fetch product details if editing
const { data: productRequirementData, isLoading } = useQuery({
  queryKey: ['productRequirement', productRequirementId],
  queryFn: () => fetchProductRequirements(productRequirementId),
  enabled: !!productRequirementId, // Only fetch if productRequirementId exists
});


// Prefill form when product data is available
useEffect(() => {
  if (productRequirementData) {
    form.reset({
      title: productRequirementData.title || "",
      description: productRequirementData.description || "",
      price: productRequirementData.price || "",
      category: productRequirementData.category || "",
      images: productRequirementData.images || [],
    });
  }
}, [productRequirementData, form]);



  // Mutations for creating/updating products
  const mutation = useMutation({
    mutationFn: async (formData) => {
      try {
        setUploading(true)

        // Prepare final data for submission
        const finalData = {
          ...formData,
          userId: user.userId,
          // images: uploadedImages,
        }

        if (productRequirementId) {
          return await updateRequirement(productRequirementId, user.userId, finalData)
        }
        return await createRequirement(finalData)
      } catch (error) {
        console.error("Mutation error:", error)
        throw error
      } finally {
        setUploading(false)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products'])
      toast({
        title: productRequirementId ? "Product updated" : "Product created",
        description: "Your product has been submitted for approval.",
      })
      router.push('/app/buyer/my-products')
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  

  const handleFilesSelected = (newFiles) => {
    // Directly use the File objects
    setFiles(prevFiles => {
      const updatedFiles = [...prevFiles, ...newFiles];
      // Limit to 5 files
      if (updatedFiles.length > 5) {
        toast({
          title: "Error",
          description: "Maximum 5 images allowed",
          variant: "destructive",
        });
        return prevFiles;
      }
      return updatedFiles;
    });
  }

  async function onSubmit() {
    try {
      console.log("submitting");
      const data = form.getValues();
      console.log(data);  
      mutation.mutate(data);
    } catch (error) {
      console.error("Submit error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit product",
        variant: "destructive",
      });
    }
  }

  const removeFile = (fileName) => {
    setFiles(prevFiles =>
      prevFiles.filter(file =>
        (file.name !== fileName) &&
        (typeof file === 'string' ? file !== fileName : true)
      )
    );
  }

  return (
    <><Toaster /><Form {...form}>
      <form onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit(onSubmit)();
        
      }
      } className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description (Max. 200 words)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter product description"
                      className="min-h-[120px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <span className="absolute pl-2 ">PKR</span>
                      <Input className="pl-12" placeholder="0.00" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>


        </div>

        <Button type="submit"
          // onClick={form.handleSubmit(onSubmit)}
          className="w-full md:w-auto" disabled={mutation.isPending}>
          Submit for Approval
        </Button>
      </form>
    </Form>
    </>

  )
}

