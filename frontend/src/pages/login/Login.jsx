import React from "react";
import { Link } from "react-router";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-lg bg-white/10 backdrop-blur-lg backdrop-opacity-80">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500"> Socket Talk</span>
        </h1>

        <form>
          <div>
            <label className="label p-2">
              <span className="text-base text-gray-200">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full input h-10"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base  text-gray-200">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input h-10"
            />
          </div>

          <Link
            to="/signup"
            className="text-sm  text-gray-200 hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Don't have an account?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
