import { Header } from '@/components/header';
import { SidebarNav } from '@/components/sidebar-nav';
import ProductDetailsClient from './ProductDetailsClient'; // Import the new client component

// Fetch product data on the server (remains the same)
async function getProduct(id) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product-listings/fetch-product-details/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store' // Ensure fresh data on each request if needed
    });

    // Check for non-OK response status
    if (!response.ok) {
      console.error(`Error fetching product: ${response.status} ${response.statusText}`);
      // Optionally, try to parse error message from response body
      try {
        const errorData = await response.json();
        console.error("Error details:", errorData);
      } catch (parseError) {
        // Ignore if response body is not JSON or empty
      }
      return null; // Return null or throw an error
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
    return null;
  }
}


export default async function IndividualProductPage({ params }) {
  const { id } = params; // Get product ID from URL
  let product;

  // Removed client-side useEffect and recordVisit function

  try {
    product = await getProduct(id);
    // Handle case where product fetch failed or returned null/invalid structure
    if (!product || !product.product) {
       throw new Error("Product data is invalid or not found.");
    }
  } catch (error) {
    console.error("Error in IndividualProductPage:", error);
    // Render a user-friendly error message
    return (
      <div className="flex min-h-screen flex-col px-4">
        <Header />
        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-4 md:py-6">
          <SidebarNav />
          <main>
            <div className="text-center text-red-500">Error loading product details. Please try again later.</div>
          </main>
        </div>
      </div>
    );
  }

  // Render the main structure and pass data to the client component
  return (
    <div className="flex min-h-screen flex-col px-4">
      <Header />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-4 md:py-6">
        <SidebarNav />
        <main>
          {/* Render the client component with fetched data */}
          <ProductDetailsClient product={product} id={id} />
        </main>
      </div>
    </div>
  );
}

