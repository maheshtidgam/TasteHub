import mrBean from "../assets/mr-bean-forehead.gif";

export const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute w-72 h-72 bg-purple-500/20 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-pink-500/20 blur-3xl rounded-full bottom-10 right-10 animate-pulse"></div>

      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-8 md:p-12 max-w-lg w-full text-center">
        {/* GIF */}
        <div className="flex justify-center">
          <img
            src={mrBean}
            alt="Wrong Path"
            className="w-64 md:w-80 rounded-2xl shadow-lg border-4 border-white/10 hover:scale-105 transition duration-500"
          />
        </div>

        {/* Text */}
        <h1 className="mt-6 text-4xl md:text-5xl font-extrabold text-white tracking-wide">
          Oops 😅
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-300 font-medium">
          You have been redirected to the wrong path.
        </p>

        <p className="mt-2 text-sm text-gray-400">
          This page is either under development or doesn’t exist yet.
        </p>

        {/* Button */}
        <button
          onClick={() => window.history.back()}
          className="mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-pink-500/40 transition duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};
