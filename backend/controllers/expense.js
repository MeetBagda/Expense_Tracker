const ExpenseSchema = require("../models/expenseModel");

exports.addExpense = async (req,res)=>{
    const {title, amount, category, description, date} = req.body;

    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date,
    }) 

    try {
        // validation
        if(!title||!amount||!category||!description) {
            return res.status(400).json({message:'All fields are required'})
        }
        if(amount<=0 || !amount === 'number') {
            return res.status(400).json({message:'Amount must be a number and a number greater than 0'})
        }
        await expense.save()
        res.status(200).json({message:'Expense Added successfully'})
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
    console.log(expense);
}

exports.getExpense = async (req,res)=>{
    try {
        const expenses = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json('Server Error')
    }
}


exports.deleteExpense = async (req,res)=>{
    const {id} = req.params;
    // console.log(req.params) //it will shows id of the object 
    ExpenseSchema.findByIdAndDelete(id).then((expense)=>{
        res.status(200).json({message:'expense Deleted!!!!'})
    }).catch((error)=>{
        res.status(400).json({message:"No such expense found"})
    });
}