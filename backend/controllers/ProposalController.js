const Proposal = require('../models/Proposal');

exports.createProposal = async (req, res) => {
  try {
    const { buyerId, sellerId, requirementId, price, description } = req.body;

    if (!buyerId || !sellerId || !requirementId || !price || !description) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const proposal = new Proposal({
      buyerId,
      sellerId,
      requirementId,
      price,
      description
    });

    await proposal.save();

    res.status(201).json({
      success: true,
      message: 'Proposal created successfully',
      proposal
    });

  } catch (error) {
    console.error('Error creating proposal:', error);
    res.status(500).json({
      success: false, 
      message: 'Error creating proposal',
      error: error.message
    });
  }
};

exports.getProposalsByUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const { role } = req.params;

    if (!userId || !role) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const query = role === 'seller' ? { sellerId: userId } : { buyerId: userId };

    const proposals = await Proposal.find(query)
      .populate('buyerId', 'name')
      .populate('sellerId', 'name')
      .populate('requirementId', 'title description')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      proposals
    });

  } catch (error) {
    console.error('Error fetching proposals:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching proposals',
      error: error.message
    });
  }
};