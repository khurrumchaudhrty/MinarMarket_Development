const { pipeline } = require('@xenova/transformers');
const dotenv = require('dotenv');

dotenv.config();

// Cache the pipeline instance
let extractor = null;

async function createEmbedding(text) {
  try {
    // Initialize the pipeline only once
    if (!extractor) {
      // Use a lightweight model suitable for CPU inference
      extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
      console.log('Feature extraction pipeline loaded.');
    }

    // Generate embedding
    const output = await extractor(text, { pooling: 'mean', normalize: true });

    // The output contains the embedding vector in output.data
    // Convert Float32Array to a regular array if necessary for storage/compatibility
    console.log('Embedding created successfully.');
    return Array.from(output.data);
    
  } catch (error) {
    console.error('Error creating embedding locally:', error);
    // Consider if returning null or throwing the error is better
    // Returning null might mask issues, throwing might stop processes that depend on embeddings
    return null;
  }
}

// Add embeddings to a product or service document
async function addEmbeddingToDocument(doc) {
  try {
    if (!doc.title || !doc.description) {
      throw new Error('Document must have title and description');
    }

    const textToEmbed = `${doc.title} ${doc.description} ${doc.category || ''}`;
    const embedding = await createEmbedding(textToEmbed);
    
    if (!embedding) {
      throw new Error('Failed to create embedding');
    }
    
    return {
      ...doc,
      embedding
    };
  } catch (error) {
    console.error('Error adding embedding to document:', error);
    throw error;
  }
}

module.exports = {
  createEmbedding,
  addEmbeddingToDocument
};
