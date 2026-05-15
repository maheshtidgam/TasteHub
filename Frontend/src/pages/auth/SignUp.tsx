import { registerUser } from "../../redux/auth/authSlice";
import type { registerPayload } from "../../redux/auth/auth";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import type { AppDispatch } from "../../redux/store";
import { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState<registerPayload>({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: 0,
    password: "",
    role: "user",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useDispatch<AppDispatch>();

  const registerSchema = yup.object().shape({
    firstName: yup
      .string()
      .required("First Name is required")
      .max(99, "First Name must be at most 99 characters"),
    lastName: yup
      .string()
      .required("Last Name is required")
      .max(99, "Last Name must be at most 99 characters"),
    email: yup.string().email("Invalid email").required("Email is required"),
    mobileNumber: yup
      .string()
      .matches(/^\d{10}$/, "Mobile No. must be at most 10 digits")
      .required("Mobile No. is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      await registerSchema.validate(formData, { abortEarly: false });
      console.log("✅ Validation passed");
      setErrors({});
      const result = await dispatch(registerUser(formData));
      console.log("API Response:", result);
      // Handle success - redirect user or show success message
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
        // Handle async dispatch errors (network, server validation, etc)
        console.error("Registration failed:", err);
      }
    }
  };

  return (
    <div className="bg-white shadow-md p-8 flex justify-center items-center h-full ">
      <div>
        <h1 className="text-3xl font-semibold py-4">Sign Up</h1>
        <form className="w-full max-w-md flex flex-col gap-4">
          <div>
            <label className="">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className="">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>
          <div>
            <label className="">Email</label>
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
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="">Mobile No.</label>
            <input
              type="text"
              name="mobileNumber"
              placeholder="Enter Mobile No."
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                e.target.value = value;
                setFormData({
                  ...formData,
                  mobileNumber: Number(value),
                });
              }}
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-sm">{errors.mobileNumber}</p>
            )}
          </div>
          <div>
            <label className="">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <button
            className="w-full  bg-green-500 hover:bg-green-600 rounded-md py-2"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
