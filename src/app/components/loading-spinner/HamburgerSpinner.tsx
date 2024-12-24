import React from "react";
import { HiMiniBars3, HiMiniBars3BottomRight, HiMiniBars3BottomLeft, HiMiniBars3CenterLeft } from "react-icons/hi2";
import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="spinner pr-6">
      <div className="icon">
        <HiMiniBars3 className="size-5 md:size-8" />
      </div>
      <div className="icon">
        <HiMiniBars3BottomRight className="size-5 md:size-8" />
      </div>
      <div className="icon">
        <HiMiniBars3BottomLeft className="size-5 md:size-8" />
      </div>
      <div className="icon">
        <HiMiniBars3CenterLeft className="size-5 md:size-8" />
      </div>
    </div>
  );
};

export default Spinner;
