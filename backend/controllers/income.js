const IncomeSchema = require("../models/incomeModel");

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    try {
        // validation
        if (!title || !category || !description || !date) {
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

        const income = new IncomeSchema({
            title,
            amount,
            category,
            description,
            date,
        });

        await income.save();
        const successMessage = 'Income Added successfully';
        console.log(`Success: ${successMessage}`);
        res.status(200).json({ message: successMessage });
        console.log(income)
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ message: 'Server Error' });
    }
};



exports.getIncome = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
        res.status(200).json(incomes);
        console.log('Success: Get Income request successful');
    } catch (error) {
        res.status(500).json('Server Error');
        console.error(`Error: ${error}`);
    }
};

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;

    try {
        const income = await IncomeSchema.findByIdAndDelete(id);
        if (income) {
            res.status(200).json({ message: 'Income Deleted!!!!' });
            console.log('Success: Delete Income request successful');
        } else {
            res.status(400).json({ message: 'No such income found' });
            console.error('Error: No such income found');
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
        console.error(`Error: ${error}`);
    }
};
