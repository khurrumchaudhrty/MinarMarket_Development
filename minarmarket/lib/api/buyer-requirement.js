import { getUserDetails } from "@/lib/SessionManager"

export async function getBuyerRequirements() {
  const user = getUserDetails()
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/buyer-product-requirement?userId=${user?.userId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!response.ok) throw new Error('Failed to fetch buyer requirements')
  return response.json()
}