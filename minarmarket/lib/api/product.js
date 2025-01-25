export async function fetchProduct(productId) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product-listings/fetch-product-details/${productId}`)
  if (!response.ok) throw new Error('Failed to fetch product')
    const data = await response.json()
  return data.product
}

export async function uploadToCloudinary(file) {
    console.log(file)

  const formData = new FormData()
  //Read blob data from url
    const blob = await fetch(file.preview).then((r) => r.blob())
  formData.append("file", blob)
  formData.append("upload_preset", "xxy7dsyf")

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dm56xy1oj/image/upload",
    {
      method: "POST",
      body: formData,
    }
  )
  const data = await response.json()
  console.log(data)
  return data.secure_url
}

export async function createProduct(data) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addProductListing`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to create product')
  return response.json()
}

export async function updateProduct(productId, data) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product-listings/updateProduct/${productId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to update product')
  return response.json()
}

export async function showMyProductListings(userId) { 
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product-listings/buyer/my-product-listings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: userId }),
  })
  if (!response.ok) throw new Error('Failed to fetch product listings')
  return response.json()
  
}