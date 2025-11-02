"use client";

import * as React from "react";

interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = ({ checked = false, onCheckedChange }: SwitchProps) => {
  const [isChecked, setIsChecked] = React.useState(checked);

  const toggle = () => {
    setIsChecked(!isChecked);
    onCheckedChange?.(!isChecked);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      onClick={toggle}
      className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors ${
        isChecked ? "bg-blue-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
          isChecked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
};
