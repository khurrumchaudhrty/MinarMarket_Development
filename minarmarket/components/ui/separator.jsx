// components/ui/separator.jsx
import React from "react";

export const Separator = ({ className, ...props }) => {
  return (
    <div
      className={`w-full border-t border-gray-300 my-4 ${className}`}
      {...props}
    />
  );
};

export default Separator;
