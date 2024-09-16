const express = require('express');
const router = express.Router();
const investmentController = require('../controllers/investmentController');

router.post('/investment', investmentController.createInvestment);

router.get('/investments', investmentController.getInvestments);

router.get('investment/:id', investmentController.getInvestmentById);

router.put('investment/:id', investmentController.updateInvestment);

router.delete('investment/:id', investmentController.deleteInvestment);

module.exports = router;
