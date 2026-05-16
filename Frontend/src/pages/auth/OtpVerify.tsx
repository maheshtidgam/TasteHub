import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import * as yup from "yup";
import { OtpVerifyUser, sendOtp } from "../../redux/auth/authSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";

export const OtpVerify = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    otp: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const otpSchema = yup.object().shape({
    otp: yup.string().min(6, "invalid otp length").required("Otp is required"),
  });

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await otpSchema.validate(formData, { abortEarly: false });
      setErrors({});
      const response = await dispatch(
        OtpVerifyUser({ ...formData, email: location.state?.email }),
      );

      if (response.payload.success) {
        navigate("auth/login");
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = error.inner.reduce(
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
        console.log("An error occured to very otp", error);
      }
    }
  };

  const handleReSendOtp = async () => {
    try {
      await dispatch(sendOtp(location.state?.email));
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  return (
    <div className="bg-white flex items-center justify-center shadow-md p-8 h-full">
      <div>
        <h1 className="text-sm font-semibold text-gray-500 py-1">
          OTP sent on mahesh@gmail.com
        </h1>
        <form
          className="w-full max-w-md flex flex-col gap-4"
          onSubmit={handleOtpSubmit}
        >
          <div>
            <label>Enter OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              name="otp"
              onChange={(e) =>
                setFormData({ ...formData, otp: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.otp && <p className="text-sm text-red-500">{errors.otp}</p>}
          </div>
          <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300">
            Verify OTP
          </button>
        </form>
        <p className="text-sm text-gray-500">
          Didn't receive OTP?{" "}
          <button
            className="text-green-500 hover:underline cursor-pointer"
            onClick={handleReSendOtp}
          >
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
};
