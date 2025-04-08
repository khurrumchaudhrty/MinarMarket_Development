export default function Loading() {
    return null
  }
  



// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Plus, MoreHorizontal, Search, Filter } from "lucide-react"

// export default function MessagingPage() {
//   return (
//     <div className="flex h-screen bg-white">
//       {/* Left sidebar with conversations */}
//       <div className="w-full md:w-[400px] border-r border-gray-200 flex flex-col">
//         {/* Header */}
//         <div className="p-4 border-b border-gray-200 flex justify-between items-center">
//           <h1 className="text-xl font-semibold">Message</h1>
//           <div className="flex gap-2">
//             <Button variant="ghost" size="icon" className="h-8 w-8">
//               <Plus className="h-5 w-5 text-gray-500" />
//             </Button>
//             <Button variant="ghost" size="icon" className="h-8 w-8">
//               <MoreHorizontal className="h-5 w-5 text-gray-500" />
//             </Button>
//           </div>
//         </div>

//         {/* Search bar */}
//         <div className="p-4 border-b border-gray-200">
//           <div className="flex items-center gap-2">
//             <Button variant="ghost" size="icon" className="h-8 w-8">
//               <Plus className="h-5 w-5 text-gray-500" />
//             </Button>
//             <div className="relative flex-1">
//               <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <Input placeholder="Search message..." className="pl-8 h-9 bg-gray-100 border-0" />
//             </div>
//             <Button variant="ghost" size="icon" className="h-8 w-8">
//               <Filter className="h-5 w-5 text-gray-500" />
//             </Button>
//           </div>
//         </div>

//         {/* Conversation list */}
//         <div className="flex-1 overflow-auto">
//           <ConversationItem
//             name="George Paul"
//             message="Hey Ersad! 👋 How is..."
//             date="05 Jan"
//             avatar="/placeholder.svg?height=40&width=40"
//             hasUnread={true}
//           />
//           {/* <ConversationItem
//             name="Zaire Siphron"
//             message="I can help 👍"
//             date="03 Jan"
//             avatar="/placeholder.svg?height=40&width=40"
//           />
//           <ConversationItem
//             name="Giana Press"
//             message="I have a new project! 👨‍💻"
//             date="03 Jan"
//             avatar="/placeholder.svg?height=40&width=40"
//           />
//           <ConversationItem
//             name="Zain Bator"
//             message="Need to fix this place.."
//             date="06 Jan"
//             avatar="/placeholder.svg?height=40&width=40"
//           />
//           <ConversationItem
//             name="Ann Herwitz"
//             message="I understood, okey 👌"
//             date="06 Jan"
//             avatar="/placeholder.svg?height=40&width=40"
//           />
//           <ConversationItem
//             name="Wilson Carder"
//             message="As you wish 🍷"
//             date="05 Jan"
//             avatar="/placeholder.svg?height=40&width=40"
//           />
//           <ConversationItem
//             name="Paityn Lipshutz"
//             message="Thank you! 👍"
//             date="06 Jan"
//             avatar="/placeholder.svg?height=40&width=40"
//           /> */}
//         </div>
//       </div>

//       {/* Right content area - empty state */}
//       <div className="hidden md:flex flex-1 items-center justify-center">
//         <div className="text-center max-w-md px-4">
//           {/* <div className="mx-auto w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-6">
//             <div className="relative w-20 h-20">
//               <Image
//                 src="/placeholder.svg?height=80&width=80"
//                 alt="Message icon"
//                 width={80}
//                 height={80}
//                 className="object-contain"
//               />
//             </div>
//           </div> */}
//           <h2 className="text-2xl font-semibold text-gray-800 mb-2">Message someone and chat right now!</h2>
//           {/* <Button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-full">Send Message</Button> */}
//         </div>
//       </div>
//     </div>
//   )
// }

// function ConversationItem({ name, message, date, avatar, hasUnread }) {
//   return (
//     <div className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer">
//       <div className="relative">
//         <Image
//           src={avatar || "/placeholder.svg"}
//           alt={name}
//           width={48}
//           height={48}
//           className="rounded-full object-cover"
//         />
//       </div>
//       <div className="flex-1 min-w-0">
//         <div className="flex justify-between items-center">
//           <h3 className="font-medium text-gray-900 truncate">{name}</h3>
//           <span className="text-xs text-gray-500">{date}</span>
//         </div>
//         <p className="text-sm text-gray-600 truncate">{message}</p>
//       </div>
//       {hasUnread && (
//         <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
//           <span className="text-xs text-white">1</span>
//         </div>
//       )}
//     </div>
//   )
// }