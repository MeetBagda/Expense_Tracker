const IncomeSchema = require("../models/incomeModel");

exports.addIncome = async (req,res)=>{
    const {title, amount, category, description, date} = req.body;

    const income = IncomeSchema({
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
        await income.save()
        res.status(200).json({message:'Income Added successfully'})
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
    console.log(income);
}

exports.getIncome = async (req,res)=>{
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json('Server Error')
    }
}


exports.deleteIncome = async (req,res)=>{
    const {id} = req.params;
    // console.log(req.params) //it will shows id of the object 
    IncomeSchema.findByIdAndDelete(id).then((income)=>{
        res.status(200).json({message:'Income Deleted!!!!'})
    }).catch((error)=>{
        res.status(400).json({message:"No such income found"})
    });
}