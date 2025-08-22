import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  useFormValidation,
  authValidationRules,
} from "../hooks/useFormValidation";
import { toast } from "sonner";
import { AuthCard } from "../components/AuthCard";
import { FormInput } from "../components/FormInput";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const { errors, validateForm } = useFormValidation(authValidationRules);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm(formData)) {
      toast.success("Account Created  Successful!", {
        description: "Redirecting to login page...",
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AuthCard title="Create new Account" className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              name="name"
              label="NAME"
              value={formData.name}
              onChange={handleInputChange}
              error={errors.name}
            />

            <FormInput
              name="username"
              label="USERNAME"
              value={formData.username}
              onChange={handleInputChange}
              error={errors.username}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              name="email"
              label="EMAIL"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
            />

            <FormInput
              name="phone"
              label="PHONE NO."
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              error={errors.phone}
              placeholder="+1234567890"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              name="password"
              label="NEW PASSWORD"
              type="password"
              showPasswordToggle
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
            />

            <FormInput
              name="confirmPassword"
              label="CONFIRM NEW PASSWORD"
              type="password"
              showPasswordToggle
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={errors.confirmPassword}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-semibold py-3 rounded-lg transition-colors"
          >
            SIGN UP
          </Button>
        </form>
      </AuthCard>
    </div>
  );
};

export default SignUp;
