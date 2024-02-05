const express = require('express');
const { addIncome, getIncome, deleteIncome } = require('../controllers/income');
const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const router = express.Router();

// router.get('/', (req, res) => {
//     res.send('Hello world! its working');
// });

router.post('/add-income', addIncome)
router.get('/get-income', getIncome)
router.delete('/delete-income/:id', deleteIncome)

router.post('/add-expense', addExpense)
router.get('/get-expense', getExpense)
router.delete('/delete-expense/:id', deleteExpense)

module.exports = router;
