"use client";
import { useState } from "react";
import { CommonLayout } from "../layouts/CommonLayout";

export const PhoneInputLayout = () => {
  const [phone, setPhone] = useState("");

  return (
    <CommonLayout>
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6">
        {/* Image Placeholder */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-gray-200 rounded-lg" />
        </div>

        {/* Label */}
        <label className="block text-gray-700 font-medium mb-2">
          ဖုန်းနံပါတ်
        </label>

        {/* Phone Input */}
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          {/* Country Code Dropdown */}
          <div className="flex items-center bg-gray-100 px-3 border-r border-gray-300">
            <img
              src="https://flagcdn.com/w40/mm.png"
              alt="Myanmar Flag"
              className="w-5 h-5 mr-1"
            />
            <select className="bg-transparent text-gray-700 focus:outline-none">
              <option value="+95">+95</option>
              <option value="+66">+66</option>
              <option value="+1">+1</option>
            </select>
          </div>

          {/* Phone Number Input */}
          <input
            type="tel"
            className="w-full p-3 outline-none text-gray-700"
            placeholder="9 xxx xxx xxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Description */}
        <p className="text-xs text-gray-500 mt-2">
          ၁၀ မှ ၁၁ လုံး နံပါတ်က ဖုန်းနံပါတ်ကို ထည့်ပေးပါ။
        </p>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button className="bg-purple-500 text-white text-sm font-medium py-3 px-6 rounded-lg shadow-md hover:bg-purple-600 transition duration-200 w-full">
            အတည်ပြုမယ်
          </button>
        </div>
      </div>
    </CommonLayout>
  );
};
