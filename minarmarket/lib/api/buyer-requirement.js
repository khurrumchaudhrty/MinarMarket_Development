import { getUserDetails } from "@/lib/SessionManager";

export async function getBuyerRequirements() {
  const user = getUserDetails();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/buyer-product-requirement?userId=${user?.userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Add if using token
      },
    }
  );
  if (!response.ok) throw new Error("Failed to fetch buyer requirements");
  return response.json();
}

export async function fetchProductRequirements(productRequirementId) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/buyer-requirement/fetch-product-requirements/${productRequirementId}`
  );
  if (!response.ok)
    throw new Error("Failed to fetch the Product Requirement Details");
  const data = await response.json();

  return data.data;
}
