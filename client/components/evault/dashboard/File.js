import React from "react";
import { BiSolidUser } from "react-icons/bi";
import { BsFillImageFill } from "react-icons/bs";
import { PiDotsThreeVerticalBold } from "react-icons/pi";

const File = ({ fileName, isShared }) => {
	return (
		<div className="bg-white hover:bg-[#DFF1FE] relative group cursor-pointer select-none pt-4 pb-2 px-2 rounded-2xl w-full">
			<div className="flex justify-start items-center gap-3 px-2">
				<div className="relative w-fit">
					<BsFillImageFill className="text-[#37A0EA] mx-1 w-5 h-5" />
				</div>
				<div className="text-sm whitespace-nowrap text-ellipsis max-w-[70%] overflow-hidden">
					{fileName}
				</div>
				<button type="button" className="absolute right-0 px-2">
					<PiDotsThreeVerticalBold className="group-hover:text-black text-white w-5 h-5" />
				</button>
			</div>
			<div className="bg-[#D9D9D9] rounded-md flex justify-center items-center gap-.5 mt-2.5 h-40">
				<BsFillImageFill className="text-[#000] mx-1 w-4 h-4" />
				<div className="text-xs">Preview</div>
			</div>
		</div>
	);
};

export default File;
