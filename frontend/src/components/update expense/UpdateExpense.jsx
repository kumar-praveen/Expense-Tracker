import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Loader2, Pencil } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { toast } from "sonner";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function UpdateExpense({ expense, onUpdate }) {
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    description: expense.description || "",
    amount: expense.amount || "",
    category: expense.category || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(
        `${backendUrl}/api/v1/expense/update/${expense._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        onUpdate(res.data.expense);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.res.data.message || "Something went wrong while updating"
      );
    } finally {
      setLoading(false);
      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button className="bg-orange-500 hover:bg-orange-600 p-[5px] sm:p-[6px] rounded-md flex items-center justify-center">
          <Pencil
            onClick={() => setIsDialogOpen(true)}
            className="text-white w-[12px] h-[12px] sm:w-[14px] sm:h-[14px]"
          />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-[#1f2937] border border-[#374151] rounded-lg shadow-xl text-gray-200">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-white">
              Update the Expense
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-400">
              Click update button after making changes.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="bg-[#111827] border border-[#374151] text-white"
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="amount">Amount</Label>
              <Input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="bg-[#111827] border border-[#374151] text-white"
              />
            </div>

            <div className="grid gap-3">
              <Select
                value={formData.category}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-[180px] bg-[#111827] border border-[#374151] text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-[#1f2937] border border-[#374151] text-white">
                  <SelectGroup>
                    <SelectLabel className="text-xs text-gray-400 px-4 py-2 uppercase tracking-wide">
                      Expense Category
                    </SelectLabel>
                    {[
                      "House Rent",
                      "Grocery",
                      "Food",
                      "Education",
                      "Shopping",
                      "Entertainment",
                      "Other",
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
          </div>

          <DialogFooter className="flex justify-center mt-4">
            {loading ? (
              <Button className="w-full my-4 bg-emerald-500 hover:bg-emerald-600 text-white">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                Save Changes
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateExpense;
