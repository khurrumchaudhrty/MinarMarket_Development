const { searchProducts, searchServices, combinedSearch, quickSearch } = require('../utils/vectorSearch');

// Handler for combined search (both products and services)
exports.search = async (req, res) => {
  try {
    const { q, limit = 20 } = req.query;
    
    if (!q) {
      return res.status(400).json({ 
        success: false, 
        message: 'Search query is required' 
      });
    }

    const results = await combinedSearch(q, parseInt(limit));
    
    res.status(200).json({
      success: true,
      results: results
    });
  } catch (error) {
    console.error('Error in search controller:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Handler for quick search (autocomplete/suggestions)
exports.quickSearch = async (req, res) => {
  try {
    const { q, limit = 5 } = req.query;
    
    if (!q) {
      return res.status(400).json({ 
        success: false, 
        message: 'Search query is required' 
      });
    }

    const suggestions = await quickSearch(q, parseInt(limit));
    
    res.status(200).json({
      success: true,
      suggestions: suggestions
    });
  } catch (error) {
    console.error('Error in quick search controller:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Handler for products search
exports.searchProducts = async (req, res) => {
  try {
    const { q, limit = 10 } = req.query;
    
    if (!q) {
      return res.status(400).json({ 
        success: false, 
        message: 'Search query is required' 
      });
    }

    const products = await searchProducts(q, parseInt(limit));
    
    res.status(200).json({
      success: true,
      products: products
    });
  } catch (error) {
    console.error('Error in products search controller:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Handler for services search
exports.searchServices = async (req, res) => {
  try {
    const { q, limit = 10 } = req.query;
    
    if (!q) {
      return res.status(400).json({ 
        success: false, 
        message: 'Search query is required' 
      });
    }

    const services = await searchServices(q, parseInt(limit));
    
    res.status(200).json({
      success: true,
      services: services
    });
  } catch (error) {
    console.error('Error in services search controller:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message
    });
  }
};
