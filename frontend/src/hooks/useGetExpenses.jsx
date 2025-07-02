import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setExpenses } from "../redux/expenseSlice";
import { toast } from "sonner";

export const useGetExpenses = () => {
  const dispatch = useDispatch();
  let { category } = useSelector((state) => state.expense);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `http://localhost:3000/api/v1/expense/getall?category=${category}`
        );
        if (res.data.success) {
          dispatch(setExpenses(res.data.expense));
        } else {
          category = ""
          dispatch(setExpenses([]));
          toast.warning("No expenses found");
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpenses();
  }, [dispatch, category]);
};
