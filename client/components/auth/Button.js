"use client";

import "@styles/globals.css";
import React from "react";

const Button = ({ children, disabled, onClick }) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className="bg-[#4a7ceb] hover:bg-[#467aed] active:bg-[#3a61b7] text-blue-50  w-full
                 px-3 py-2  ease-linear  text-xl rounded-sm hover:text-slate-200 disabled:cursor-not-allowed focus:outline-none focus:ring focus:ring-[#467aebb2] my-3 "
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
