const express = require('express');
const router = express.Router();
const { 
    listServiceRequirement, 
    getMyServiceRequirements, 
    fetchServiceRequirementDetails
} = require('../controllers/BuyerServiceRequirementController');

router.post('/', listServiceRequirement);
router.get('/', getMyServiceRequirements);
router.get('/fetch-service-requirement-details/:serviceRequirementId', fetchServiceRequirementDetails);

module.exports = router;
