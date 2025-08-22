import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  useFormValidation,
  authValidationRules,
} from "../hooks/useFormValidation";
import { toast } from "sonner";
import { AuthCard } from "../components/AuthCard";
import { FormInput } from "../components/FormInput";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const loginRules = {
    username: authValidationRules.username,
    password: { ...authValidationRules.password, custom: undefined },
  };

  const { errors, validateForm, validateField } = useFormValidation(loginRules);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm(formData)) {
      toast.success("Login Successful!", {
        description: "Welcome back!",
      });

      console.log("Login attempt:", formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AuthCard title="Login" subtitle="Sign in to continue">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            name="username"
            label="USERNAME"
            value={formData.username}
            onChange={handleInputChange}
            error={errors.username}
          />

          <FormInput
            name="password"
            label="NEW PASSWORD"
            type="password"
            showPasswordToggle
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
          />

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-semibold py-3 rounded-lg transition-colors"
          >
            LOGIN
          </Button>

          <div className="text-center">
            <span className="text-muted-foreground">Don't have Account? </span>
            <Link
              to="/signup"
              className="text-primary hover:text-primary-hover font-medium underline transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </AuthCard>
    </div>
  );
};

export default Login;
