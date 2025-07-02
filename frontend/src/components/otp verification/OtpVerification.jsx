import React, { useState } from "react";
import Logo from "../shared/Logo";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";
import Loader from "../loader/Loader";

function OtpVerification() {
  const [input, setInput] = useState({
    email: "",
    otp: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.auth.loading);

  const onChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/verify-otp",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setLoading(false));
        toast(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      dispatch(setLoading(false));
      toast.error(error.response.data.message);
    }
    finally{
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-black/80 text-gray-300 px-4">
      <form
        onSubmit={submitHandler}
        className="w-full sm:w-[90%] md:w-[70%] lg:w-[40%] xl:w-[30%] p-6 sm:p-8 shadow-lg rounded-lg flex flex-col items-center bg-black/30 border border-white/10"
      >
        <h1 className="text-xl sm:text-2xl font-bold mb-3">
          Email Verification
        </h1>

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
          <Label className="py-1">One Time Password</Label>
          <Input
            type="number"
            name="otp"
            value={input.otp}
            onChange={onChangeHandler}
            className="appearance-none"
          />
          <p className="text-xs text-gray-400 mt-1">
            OTP is valid for 10 minutes only
          </p>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <Button className="bg-green-600 text-white cursor-pointer mt-4 w-full">
            Verify
          </Button>
        )}
      </form>
    </div>
  );
}

export default OtpVerification;
