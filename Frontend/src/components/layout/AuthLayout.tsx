import { Outlet } from "react-router-dom";
import commonImg from "../../assets/login-page-image.jpg";

const AuthLayout = () => {
  return (
    <div className=" h-screen bg-gray-200 flex items-center justify-center">
      <div className="w-full max-w-7xl min-h-[70%] shadow-lg  grid grid-cols-2 rounded-lg">
        <div className="">
          <img src={commonImg} alt="Common" className="h-full" />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
