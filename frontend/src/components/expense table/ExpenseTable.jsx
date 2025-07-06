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
    const token = localStorage.getItem("token");
    const userPermision = confirm("Are you sure ?");

    if (userPermision) {
      try {
        const res = await axios.delete(
          `${backendUrl}/api/v1/expense/remove/${expenseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-xs sm:text-sm table-auto">
        <thead>
          <tr className="bg-[#1e1e2f] text-white text-center">
            <th className="px-1 py-2 whitespace-nowrap">Description</th>
            <th className="px-1 py-2 whitespace-nowrap">Category</th>
            <th className="px-1 py-2 whitespace-nowrap">Date</th>
            <th className="px-1 py-2 whitespace-nowrap">Actions</th>
            <th className="px-1 py-2 whitespace-nowrap">Amount</th>
          </tr>
        </thead>

        <tbody>
          {tempExpense.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="text-center bg-[#1f2937] text-gray-400 italic py-6 rounded-md"
              >
                Start Adding Your Expenses
              </td>
            </tr>
          ) : (
            tempExpense.map((expense) => (
              <tr
                key={expense._id}
                className="text-center border-b border-gray-700"
              >
                <td className="px-1 py-2 break-words">{expense.description}</td>
                <td className="px-1 py-2">{expense.category}</td>
                <td className="px-1 py-2 whitespace-nowrap">
                  {new Date(expense.createdAt)
                    .toLocaleDateString("IN")
                    .split("/")
                    .join("-")}
                </td>
                <td className="px-1 py-2">
                  <div className="flex justify-center items-center gap-1">
                    <button
                      onClick={() => handleExpenseDelete(expense._id)}
                      className="bg-red-500 hover:bg-red-600 p-[5px] sm:p-[6px] rounded-md flex items-center justify-center"
                    >
                      <Trash className="text-white w-[12px] h-[12px] sm:w-[14px] sm:h-[14px]" />
                    </button>
                    <button
                      onClick={() => openUpdateDialog(expense)}
                      className="bg-orange-500 hover:bg-orange-600 p-[5px] sm:p-[6px] rounded-md flex items-center justify-center"
                    >
                      <Pencil className="text-white w-[12px] h-[12px] sm:w-[14px] sm:h-[14px]" />
                    </button>
                  </div>
                </td>
                <td className="px-1 py-2">₹{expense.amount}</td>
              </tr>
            ))
          )}
        </tbody>

        <tfoot>
          <tr className="bg-[#111827] text-white font-semibold text-sm sm:text-base">
            <td colSpan={4} className="text-left px-1 py-2">
              Total
            </td>
            <td className="text-center px-1 py-2">₹{totalAmount}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default ExpenseTable;
