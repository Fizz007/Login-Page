import { useState, useCallback } from 'react';

export const useFormValidation = (rules) => {
  const [errors, setErrors] = useState({});

  const validateField = useCallback((name, value, formData) => {
    const rule = rules[name];
    if (!rule) return null;

    // Required validation
    if (rule.required && !value.trim()) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }

    if (!value.trim() && !rule.required) {
      return null;
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      switch (name) {
        case 'name':
          return 'Name should contain only letters';
        case 'username':
          return 'Username can contain letters, numbers, and special characters';
        case 'email':
          return 'Please enter a valid email address';
        case 'phone':
          return 'Phone number must include country code (e.g., +1234567890)';
        case 'password':
          return 'Password can contain letters, numbers, and special characters';
        default:
          return 'Invalid format';
      }
    }

    if (rule.minLength && value.length < rule.minLength) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least ${rule.minLength} characters`;
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must be at most ${rule.maxLength} characters`;
    }

    if (rule.custom) {
      const customError = rule.custom(value, formData);
      if (customError) return customError;
    }

    return null;
  }, [rules]);

  const validateForm = useCallback((formData) => {
    const newErrors = {};
    let isValid = true;

    Object.keys(rules).forEach((fieldName) => {
      const error = validateField(fieldName, formData[fieldName] || '', formData);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [rules, validateField]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const setFieldError = useCallback((fieldName, error) => {
    setErrors(prev => ({ ...prev, [fieldName]: error }));
  }, []);

  return {
    errors,
    validateForm,
    validateField,
    clearErrors,
    setFieldError
  };
};

export const authValidationRules = {
  name: {
    required: true,
    pattern: /^[a-zA-Z\s]+$/,
    minLength: 2,
    maxLength: 50
  },
  username: {
    required: true,
    pattern: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/,
    minLength: 3,
    maxLength: 20
  },
  email: {
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/
  },
  phone: {
    required: true,
    pattern: /^\+[1-9]\d{1,14}$/
  },
  password: {
    required: true,
    pattern: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/,
    minLength: 6,
    custom: (value, formData) => {
      if (formData?.username && value === formData.username) {
        return 'Password cannot be the same as username';
      }
      return null;
    }
  },
  confirmPassword: {
    required: true,
    custom: (value, formData) => {
      if (formData?.password && value !== formData.password) {
        return 'Passwords do not match';
      }
      return null;
    }
  }
};