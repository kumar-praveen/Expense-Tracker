import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="relative h-screen w-screen">
      <img
        src="/images/homepage.png"
        alt="Finance background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-white text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-md mb-4 animate-fade-in text-gray-300">
          Manage Your Expenses Smartly
        </h1>
        <p className="text-xl md:text-xl mb-8 max-w-xl animate-fade-in delay-200 font-bold">
          Keep track of your spending, save money, and reach your financial
          goals with ease.
        </p>

        <div className="">
          <div className="flex flex-col md:flex-row gap-4">
            <Link to={"/login"}>
              <button className="bg-green-500 hover:bg-green-600 cursor-pointer px-6 py-2 rounded-full font-semibold shadow transition-transform transform hover:scale-105">
                Login
              </button>
            </Link>
            <Link to={"/signup"}>
              <button className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-full font-semibold shadow transition-transform transform hover:scale-105">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
       
      </div>
    </div>
  );
}
