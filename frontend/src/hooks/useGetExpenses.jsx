import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setExpenses } from "../redux/expenseSlice";
import { toast } from "sonner";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useGetExpenses = () => {
  const dispatch = useDispatch();
  let { category } = useSelector((state) => state.expense);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchExpenses = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `${backendUrl}/api/v1/expense/getall?category=${category}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.success) {
          dispatch(setExpenses(res.data.expense));
          toast.success(`All expenses of catergory ${category}`);
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          dispatch(setExpenses([]));
          toast.warning("No expenses found");
        } else {
          toast.error("Something went wrong");
        }
      }
    };
    fetchExpenses();
  }, [category, dispatch]);
};
