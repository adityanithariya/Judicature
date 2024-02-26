import React from "react";
import { FiArrowDown } from "react-icons/fi";

const SortItem = ({ title, selected, order, reverse }) => {
	return (
		<button
			type="button"
			tabIndex={selected ? -1 : 0}
			className={`${
				selected ? "bg-[#37A0EA6E]" : "hover:bg-[#DFF1FE] focus:bg-[#DFF1FE]"
			} flex justify-start items-center h-7 w-full`}
		>
			{order ? (
				<FiArrowDown
					className={`w-4 h-4 mx-2 text-[#37A0EA] ${
						reverse ? "rotate-180" : ""
					}`}
				/>
			) : (
				<div className="w-8" />
			)}
			<div className="text-sm">{title}</div>
		</button>
	);
};

const SortDialog = ({ isOpen }) => {
	return (
		<div className="absolute top-[120%] left-0 z-30 rounded-md shadow-sortDialog1 bg-white h-32 w-36">
			<div className="text-xs mt-3 ml-2 mb-2 w-fit">Sort By</div>
			<div>
				<SortItem title="Name" selected order />
				<SortItem title="Last Modified" />
				<SortItem title="Owner" />
			</div>
		</div>
	);
};

export default SortDialog;
