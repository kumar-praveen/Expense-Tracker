import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/login/Login.jsx";
import Signup from "./components/signup/Signup.jsx";
import { Toaster } from "./components/ui/sonner";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import HomePage from "./components/home page/HomePage.jsx";
import Expenses from "./components/expenses page/Expenses.jsx";
import { PersistGate } from "redux-persist/lib/integration/react.js";
import {persistor} from "./redux/store.js";
import OtpVerification from "./components/otp verification/OtpVerification.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/expenses",
    element: <Expenses />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/verify-otp",
    element: <OtpVerification/>
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={appRouter} />
        <Toaster />
      </PersistGate>
    </Provider>
  </StrictMode>
);
