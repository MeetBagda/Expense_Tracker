const ExpenseSchema = require("../models/expenseModel");

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    try {
        // validation
        if (!title || !amount || !category || !description || !date) {
            const errorMessage = 'All fields are required';
            console.error(`Validation Error: ${errorMessage}`);
            return res.status(400).json({ message: errorMessage });
        }

        // Check if amount is a valid number
        if (isNaN(Number(amount)) || Number(amount) <= 0) {
            const errorMessage = 'Amount must be a valid number greater than 0';
            console.error(`Validation Error: ${errorMessage}`);
            return res.status(400).json({ message: errorMessage });
        }

        const expense = new ExpenseSchema({
            title,
            amount,
            category,
            description,
            date,
        });

        await expense.save();
        const successMessage = 'Expense Added successfully';
        console.log(`Success: ${successMessage}`);
        res.status(200).json({ message: successMessage });
        console.log(expense);
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getExpense = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
        res.status(200).json(expenses);
        console.log('Success: Get Expense request successful');
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
        console.error(`Error: ${error}`);
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;

    try {
        const expense = await ExpenseSchema.findByIdAndDelete(id);
        if (expense) {
            res.status(200).json({ message: 'Expense Deleted!!!!' });
            console.log('Success: Delete Expense request successful');
        } else {
            res.status(400).json({ message: 'No such expense found' });
            console.error('Error: No such expense found');
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
        console.error(`Error: ${error}`);
    }
};
