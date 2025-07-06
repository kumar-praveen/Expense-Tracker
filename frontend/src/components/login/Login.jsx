import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Logo from "../shared/Logo";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setLoading, setUserName } from "../../redux/authSlice";
import Loader from "../loader/Loader";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const loading = useSelector((store) => store.auth.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${backendUrl}/api/v1/user/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        toast.success(res.data.message);
        dispatch(setAuthUser(res.data.user));
        dispatch(setUserName(res.data.user.fullname));
        navigate("/expenses");
      }
    } catch (error) {
      dispatch(setLoading(false));
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-black/80 text-gray-300 px-4">
      <form
        onSubmit={submitHandler}
        className="w-full sm:w-[90%] md:w-[70%] lg:w-[40%] xl:w-[30%] p-6 sm:p-8 shadow-lg rounded-lg flex flex-col items-center bg-black/30"
      >
        <h1 className="text-xl sm:text-2xl font-bold mb-1">Login</h1>
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Welcome back</h2>

        <div className="py-2">
          <Logo />
        </div>

        <div className="py-2 w-full">
          <Label className="py-1">Email</Label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={onChangeHandler}
          />
        </div>

        <div className="py-2 w-full">
          <Label className="py-1">Password</Label>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={onChangeHandler}
          />
        </div>

        {loading ? (
          <Loader />
        ) : (
          <Button className="bg-green-600 text-white cursor-pointer mt-4 w-full">
            Login
          </Button>
        )}

        <p className="text-sm mt-3 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 font-semibold">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
