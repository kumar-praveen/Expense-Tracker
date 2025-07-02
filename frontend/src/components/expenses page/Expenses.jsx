import React from "react";
import Navbar from "../navbar/Navbar";
import CreateExpense from "../create expense/CreateExpense";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { setCategory } from "../../redux/expenseSlice";
import ExpenseTable from "../expense table/ExpenseTable";
import { useGetExpenses } from "../../hooks/useGetExpenses";
import "../../App.css";

function Expenses() {
  useGetExpenses();
  const dispatch = useDispatch();

  const selectValueChangeHandler = (value) => {
    dispatch(setCategory(value));
  };

  return (
    <div className="min-h-screen w-full bg-black/90 text-white">
      <Navbar />

      <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[70%] mx-auto mt-4 flex flex-col gap-6">
        {/* Header and Create Expense */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center md:text-left">
            Track All Your Expenses
          </h1>
          <CreateExpense />
        </div>

        {/* Filter Section */}
        {/* Filter Section */}
        <div
          className="w-full flex flex-wrap items-center gap-4 
  justify-center lg:justify-start text-sm sm:text-base lg:text-lg font-medium mt-2"
        >
          <p>Filter By:</p>
          <Select onValueChange={selectValueChangeHandler}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-[#1f2937] border border-[#374151] rounded-md shadow-lg text-white">
              <SelectGroup>
                <SelectLabel className="text-xs text-gray-400 px-4 py-2 uppercase tracking-wide">
                  Filter By Category
                </SelectLabel>
                {[
                  "House Rent",
                  "Grocery",
                  "Education",
                  "Shopping",
                  "Food",
                  "Entertainment",
                  "All",
                ].map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="cursor-pointer px-4 py-2 text-sm hover:bg-[#374151] hover:text-white focus:bg-[#4b5563] focus:text-white transition-colors duration-150 rounded"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <div className="w-[95%] sm:w-[85%] md:w-[80%] lg:w-[75%] xl:w-[70%] mx-auto overflow-x-auto rounded-xl">
            <ExpenseTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expenses;
