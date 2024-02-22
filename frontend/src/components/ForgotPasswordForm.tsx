import React from "react";
import { UnauthenticatedFormType } from "../common/types";

export const ForgotPasswordForm = ({ setFormType }: { setFormType: (formType: UnauthenticatedFormType) => void }) => {
  return (
    <div>
      <h2 className="text-3xl font-extrabold text-gray-900 text-center">Forgot Password</h2>
      <form className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send Reset Link
          </button>
        </div>
        <div>
          <button
            type="button"
            className="text-indigo-600 hover:underline"
            onClick={() => setFormType('login')}
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
};
