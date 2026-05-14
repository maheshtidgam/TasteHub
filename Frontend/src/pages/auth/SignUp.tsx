const SignUp = () => {
  return (
    <div className="bg-white shadow-md p-8 flex justify-center items-center h-full ">
      <div>
        <h1 className="text-3xl font-semibold py-4">Sign Up</h1>
        <form className="w-full max-w-md flex flex-col gap-4">
          <div>
            <label className="">First Name</label>
            <input
              type="text"
              placeholder="Enter First Name"
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="">Last Name</label>
            <input
              type="text"
              placeholder="Enter Last Name"
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="">Mobile No.</label>
            <input
              type="number"
              placeholder="Enter Mobile No."
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button className="w-full  bg-green-500 hover:bg-green-600 rounded-md py-2">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
