import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "./components/ui/tooltip";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import React from "react";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
