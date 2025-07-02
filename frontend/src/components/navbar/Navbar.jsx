import Logo from "../shared/Logo";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { persistor } from "../../redux/store.js";
import { resetExpenseState } from "../../redux/expenseSlice.js";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Navbar() {
  const { user, userName } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/v1/user/logout`);
      if (res.data.success) {
        toast(res.data.message);
        dispatch(resetExpenseState());
        await persistor.purge();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full flex justify-between items-center p-5 shadow-2xl">
      <div className="w-15">
        <Logo />
      </div>
      {user ? (
        <div className="flex items-center gap-4">
          <p className="font-bold">Hi, {userName.split(" ")[0]}</p>
          <Popover>
            <PopoverTrigger>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOtu74pEiq7ofeQeTsco0migV16zZoBwSlGg&s"
                  alt="@shadcn"
                />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col items-start gap-2 mr-3 bg-[#1f2937] text-white rounded-lg shadow-lg p-4 min-w-[200px]">
              <div className="text-sm">
                <p className="font-semibold">{user.name}</p>
                <p className="text-gray-400 text-xs">{user.email}</p>
              </div>
              <Button
                className="text-red-500 p-0 hover:text-red-600"
                variant="link"
                onClick={logoutHandler}
              >
                Logout
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <div className="flex gap-3">
          <Link to={"/login"}>
            <Button>Login</Button>
          </Link>
          <Link to={"/signup"}>
            <Button>Signup</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
