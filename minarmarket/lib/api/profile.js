export async function getProfile() {
    try {
      const response = await fetch("http://localhost:4000/profile", {
        method: "GET",
        credentials: "include", // Send cookies or credentials
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch profile: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error in getProfile:", error);
      throw error;
    }
  }
  