import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { Newspaper, Pencil, Trash } from "lucide-react";
import { Button } from "../ui/button";
import UpdateExpense from "../update expense/UpdateExpense";
import axios from "axios";
import { toast } from "sonner";
import "../../App.css";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function ExpenseTable() {
  const { expenses } = useSelector((store) => store.expense);
  const [tempExpense, setTempExpense] = useState([]);

  useEffect(() => {
    setTempExpense(expenses);
  }, [expenses]);

  const totalAmount = tempExpense.reduce((acc, expense) => {
    return acc + expense.amount;
  }, 0);

  const handleExpenseDelete = async (expenseId) => {
    const userPermision = confirm("Are you sure ?");

    if (userPermision) {
      try {
        const res = await axios.delete(
          `${backendUrl}/api/v1/expense/remove/${expenseId}`
        );
        if (res.data.success) {
          toast.success(res.data.message);
          const filteredExpenses = tempExpense.filter(
            (expense) => expense._id !== expenseId
          );
          setTempExpense(filteredExpenses);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleExpenseUpdate = (updatedExpense) => {
    setTempExpense((prev) =>
      prev.map((exp) => (exp._id === updatedExpense._id ? updatedExpense : exp))
    );
  };

  return (
    <Table>
      <TableCaption>A list of your recent expenses.</TableCaption>
      <TableHeader className="bg-[#1e1e2f] border-b border-[#2c2c3a] text-white">
        <TableRow className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
          <TableHead className="text-center">Description</TableHead>
          <TableHead className="text-center">Category</TableHead>
          <TableHead className="text-center">Date</TableHead>
          <TableHead className="text-center">Actions</TableHead>
          <TableHead className="text-center">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tempExpense.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center bg-[#1f2937] text-gray-400 italic py-6 rounded-md"
            >
              Start Adding Your Expenses
            </TableCell>
          </TableRow>
        ) : (
          tempExpense?.map((expense) => (
            <TableRow key={expense._id}>
              <TableCell className="text-center text-sm sm:text-base">
                {expense.description}
              </TableCell>
              <TableCell className="text-center text-sm sm:text-base">
                {expense.category}
              </TableCell>
              <TableCell className="text-center text-sm sm:text-base">
                {expense.createdAt?.split("T")[0]}
              </TableCell>
              <TableCell className="text-center text-sm sm:text-base">
                <div className="flex items-center gap-5">
                  <Button
                    onClick={() => handleExpenseDelete(expense._id)}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    <Trash className="text-white w-4 h-4" />
                  </Button>
                  <UpdateExpense
                    expense={expense}
                    onUpdate={handleExpenseUpdate}
                  />
                </div>
              </TableCell>
              <TableCell className="text-center text-sm sm:text-base">
                {expense.amount}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
      <TableFooter>
        <TableRow className="bg-[#111827] text-white font-semibold text-lg">
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-center text-sm sm:text-base">
            ₹{totalAmount}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default ExpenseTable;
