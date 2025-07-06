import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "sonner";
import { setExpenses } from "../../redux/expenseSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/Loader";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function CreateExpense() {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { expenses } = useSelector((store) => store.expense);
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const selectValueChangeHandler = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      category: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${backendUrl}/api/v1/expense/add`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        dispatch(setExpenses([...expenses, res.data.expense]));
        toast.success(res.data.message);
        setIsDialogOpen(false);
        setFormData({ description: "", amount: "", category: "" }); // reset form
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsDialogOpen(true)}
          variant="outline"
          className="border-gray-500 text-white hover:bg-[#1f2937] bg-[#111827]"
        >
          Add New Expense
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-[#1f2937] text-white border border-[#374151] shadow-xl rounded-lg">
        <form onSubmit={submitHandler} className="grid gap-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-white">
              Add an Expense
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Click add button when you're done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-gray-300">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                placeholder="E.g :- Pizza"
                className="bg-[#111827] text-white border-gray-600 focus:border-emerald-500"
                value={formData.description}
                onChange={onChangeHandler}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="amount" className="text-gray-300">
                Amount
              </Label>
              <Input
                type="number"
                id="amount"
                name="amount"
                className="bg-[#111827] text-white border-gray-600 focus:border-emerald-500"
                value={formData.amount}
                onChange={onChangeHandler}
              />
            </div>

            <div className="grid gap-2">
              <Label className="text-gray-300">Category</Label>
              <Select onValueChange={selectValueChangeHandler}>
                <SelectTrigger className="bg-[#111827] text-white border border-gray-600 focus:ring-emerald-500 w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-[#1f2937] text-white border border-gray-600 rounded-md shadow-lg">
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
                    ].map((item) => (
                      <SelectItem
                        key={item}
                        value={item}
                        className="cursor-pointer px-4 py-2 hover:bg-[#374151] focus:bg-[#4b5563] rounded transition-colors"
                      >
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex justify-center">
            {loading ? (
              <Button
                disabled
                className="w-1/2 bg-emerald-600 text-white cursor-not-allowed"
              >
                <Loader />
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white w-1/2"
              >
                Add
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default CreateExpense;
