import React from "react";

export const OtpVerify = () => {
  return (
    <div className="bg-white flex items-center justify-center shadow-md p-8 h-full">
      <div>
        <h1 className="text-sm font-semibold text-gray-500 py-1">
          OTP sent on mahesh@gmail.com
        </h1>
        <form className="w-full max-w-md flex flex-col gap-4">
          <div>
            <label>Enter OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};
