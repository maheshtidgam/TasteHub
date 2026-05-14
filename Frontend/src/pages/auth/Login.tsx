import React from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/auth/otp-verify");
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
              placeholder="Enter Email"
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className=" w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <p className="text-sm text-right text-green-500 hover:underline cursor-pointer">
            Forgot Password?
          </p>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
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
