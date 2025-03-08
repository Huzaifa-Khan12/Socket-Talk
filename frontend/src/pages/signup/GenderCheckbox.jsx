import React from "react";

const GenderCheckbox = () => {
  return (
    <div className="flex mt-2">
      <div className="form-control mt-2">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text  text-gray-200">Male</span>
          <input
            type="checkbox"
            className="checkbox border-gray-200  checked:bg-stone-200"
          />
        </label>
      </div>

      <div className="form-control m-2">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text  text-gray-200">Female</span>
          <input
            type="checkbox"
            className="checkbox border-gray-200 checked:bg-stone-200"
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
