const { MongoClient } = require("mongodb");
const { pipeline } = require("node:stream/promises");
const dotenv = require('dotenv'); // Uncommented
const { createEmbedding } = require("./embeddingService");

dotenv.config(
    {
        path: './config/config.env' // Uncommented
    }
); // Uncommented
// Use the correct environment variable for the MongoDB connection string
const uri = process.env.DB_URL;

// Update the check to use the correct variable name in the error message
if (!uri) {
  console.error("Error: MongoDB connection string (DB_URL) is not defined in environment variables.");
  process.exit(1); // Exit if the connection string is missing
}

const client = new MongoClient(uri);

// Initialize vector search index if it doesn't exist
async function initializeVectorSearchIndexes() {
  try {
    const database = client.db("minarmarket");
    const productCollection = database.collection("productlistings");
    const serviceCollection = database.collection("servicelistings");
    console.log("Connected to MongoDB");
    // Product embeddings index
    const productIndex = {
      name: "product_vector_index",
      type: "vectorSearch",
      definition: {
        fields: [
          {
            type: "vector",
            numDimensions: 768, // Using a lightweight model with 768 dimensions
            path: "embedding",
            similarity: "cosine"
          }
        ]
      }
    };

    // Service embeddings index
    const serviceIndex = {
      name: "service_vector_index",
      type: "vectorSearch",
      definition: {
        fields: [
          {
            type: "vector",
            numDimensions: 768, // Using a lightweight model with 768 dimensions
            path: "embedding",
            similarity: "cosine"
          }
        ]
      }
    };

    // Create indexes if they don't exist
    const productIndexes = await productCollection.listSearchIndexes().toArray();
    if (!productIndexes.some(idx => idx.name === "product_vector_index")) {
      await productCollection.createSearchIndex(productIndex);
      console.log("Product vector search index created");
    }

    const serviceIndexes = await serviceCollection.listSearchIndexes().toArray();
    if (!serviceIndexes.some(idx => idx.name === "service_vector_index")) {
      await serviceCollection.createSearchIndex(serviceIndex);
      console.log("Service vector search index created");
    }

    return { success: true };
  } catch (error) {
    console.error("Error initializing vector search indexes:", error);
    return { success: false, error };
  }
}

// Perform vector search for products
async function searchProducts(query, limit = 10) {
  try {
    const queryEmbedding = await createEmbedding(query);
    if (!queryEmbedding) {
      throw new Error("Failed to create embedding for query");
    }

    const database = client.db("minarmarket");
    const collection = database.collection("productlistings");

    const agg = [
      {
        $vectorSearch: {
          index: "product_vector_index",
          path: "embedding",
          queryVector: queryEmbedding,
          numCandidates: 100,
          limit: limit
        }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          price: 1,
          category: 1,
          images: 1,
          status: 1,
          score: { $meta: "vectorSearchScore" }
        }
      }
    ];

    return await collection.aggregate(agg).toArray();
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
}

// Perform vector search for services
async function searchServices(query, limit = 10) {
  try {
    const queryEmbedding = await createEmbedding(query);
    if (!queryEmbedding) {
      throw new Error("Failed to create embedding for query");
    }

    const database = client.db("minarmarket");
    const collection = database.collection("servicelistings");

    const agg = [
      {
        $vectorSearch: {
          index: "service_vector_index",
          path: "embedding",
          queryVector: queryEmbedding,
          numCandidates: 100,
          limit: limit
        }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          rate: 1,
          pricingModel: 1,
          category: 1,
          images: 1,
          status: 1,
          score: { $meta: "vectorSearchScore" }
        }
      }
    ];

    return await collection.aggregate(agg).toArray();
  } catch (error) {
    console.error("Error searching services:", error);
    throw error;
  }
}

// Combined search function for both products and services
async function combinedSearch(query, limit = 20) {
  try {
    const [products, services] = await Promise.all([
      searchProducts(query, limit / 2),
      searchServices(query, limit / 2)
    ]);
    
    return { products, services };
  } catch (error) {
    console.error("Error in combined search:", error);
    throw error;
  }
}

// Quick search for autocomplete suggestions
async function quickSearch(query, limit = 5) {
  try {
    const [products, services] = await Promise.all([
      searchProducts(query, limit),
      searchServices(query, limit)
    ]);
    
    // Return a combined array of just titles for suggestions
    const suggestions = [
      ...products.map(p => ({ id: p._id, title: p.title, type: 'product' })),
      ...services.map(s => ({ id: s._id, title: s.title, type: 'service' }))
    ].sort((a, b) => b.score - a.score).slice(0, limit);
    
    return suggestions;
  } catch (error) {
    console.error("Error in quick search:", error);
    throw error;
  }
}

module.exports = {
  initializeVectorSearchIndexes,
  searchProducts,
  searchServices,
  combinedSearch,
  quickSearch
};
