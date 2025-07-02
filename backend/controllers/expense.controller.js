import { Expense } from "../models/expense.model.js";

export const addExpense = async (req, res) => {
  try {
    const { description, amount, category } = req.body;
    const userId = req.id;

    if (!description || !amount || !category) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const expense = await Expense.create({
      description,
      amount,
      category,
      userId,
    });
    return res.status(201).json({
      message: "New Expense Added Successfully",
      expense,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error. Can't add expense",
      });
  }
};

export const getAllExpense = async (req, res) => {
  try {
    const userId = req.id;
    const category = req.query.category || "";

    const query = {
      userId, //filter by userId
    };

    if (category.toLowerCase() !== "all" && category.trim() !== "") {
      query.category = { $regex: category, $options: "i" };
    }

    const expense = await Expense.find(query);

    if (!expense || expense.length === 0) {
      return res.status(404).json({
        message: "No Such Expense Found",
        success: false,
      });
    }

    return res.status(200).json({
      expense,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const removeExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    await Expense.findByIdAndDelete(expenseId);

    return res.status(200).json({
      message: "Expense deleted successfully",
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error. Can't delete" });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { description, amount, category } = req.body;

    const expenseId = req.params.id;
    const updatedData = { description, amount, category };

    const expense = await Expense.findByIdAndUpdate(expenseId, updatedData, {
      new: true,
    });

    return res.status(200).json({
      message: "Expense updated successfully",
      expense,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error.Can't update" });
  }
};
