import React from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/auth/authSlice";
import type { loginPayload } from "../../redux/auth/auth";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import type { AppDispatch } from "../../redux/store";
import { useState } from "react";

interface loginResponse {
  message: string;
  email: string;
  success: boolean;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<loginPayload>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginSchema.validate(formData, { abortEarly: false });
      setErrors({});
      const response = await dispatch(loginUser(formData));
      console.log("Login user", response);
      if (response.payload.success) {
        navigate("/otp-verify");
      }
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors = err.inner.reduce(
          (acc: Record<string, string>, error) => {
            if (error.path) {
              acc[error.path] = error.message;
            }
            return acc;
          },
          {},
        );
        setErrors(errors);
      } else {
        console.log("Login Failed", err);
      }
    }
  };
  return (
    <div className="bg-white h-full shadow-md p-8 flex items-center justify-center">
      <div className="w-[50%] h-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-semibold py-4">Sign In</h1>
        <form
          className="w-full max-w-md flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="text-lg">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className=" w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>
          <p className="text-sm text-right text-green-500 hover:underline cursor-pointer">
            Forgot Password?
          </p>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 cursor-pointer"
          >
            Sign In
          </button>
        </form>
        <div>
          <p className="text-sm mt-4">
            Don't have an account?
            <a
              href="/auth/register"
              className="text-green-500 hover:underline px-2"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
