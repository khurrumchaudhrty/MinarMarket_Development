const Proposal = require('../models/Proposal');

const addProposal = async (req, res) => {
    try {
        const { buyerId, sellerId, productId, price, description } = req.body;
        const proposal = new Proposal({
            buyerId,
            sellerId,
            productId,
            price,
            description
        });
        await proposal.save();
        res.status(201).json({ message: 'Proposal created successfully', proposal });
    } catch (error) {
        res.status(500).json({ message: 'Error creating proposal', error: error.message });
    }
};

const getProposalsByBuyer = async (req, res) => {
    try {
        const { userId } = req.body;
        const proposals = await Proposal.find({ buyerId: userId })
            .populate('sellerId', 'name email')
            .populate('productId', 'title description')
            .sort({ createdAt: -1 });
        res.status(200).json({ proposals });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching proposals', error: error.message });
    }
};

const getProposalsBySeller = async (req, res) => {
    try {
        const { userId } = req.body;
        const proposals = await Proposal.find({ sellerId: userId })
            .populate('buyerId', 'name email')
            .populate('productId', 'title description')
            .sort({ createdAt: -1 });
        res.status(200).json({ proposals });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching proposals', error: error.message });
    }
};

module.exports = {
    addProposal,
    getProposalsByBuyer,
    getProposalsBySeller
};