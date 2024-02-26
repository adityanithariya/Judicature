"use client";
import { useState } from "react";
import { FaFile } from "react-icons/fa";
import { FiDownload, FiMoreVertical } from "react-icons/fi";
import Menu from "./Menu";

const FileCard = ({ filename }) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const hideMenu = () => setMenuOpen(false);
	const toggleMenu = () => {
		setMenuOpen((prev) => !prev);
	};

	return (
		<div
			onMouseLeave={hideMenu}
			className="flex flex-col justify-center items-center p-3 w-5/12 md:w-80 lg:w-64 h-64 rounded bg-white/50 transition shadow hover:shadow-lg"
		>
			<div className="flex-1 p-5 ">
				<FaFile className="h-full w-full text-blue-950" />
			</div>
			<div className="flex w-full justify-center items-center gap-4 relative">
				<p className="text-sm md:text-base font-bold text-blue-950">
					{filename}
				</p>
				<button
					type="button"
					onClick={toggleMenu}
					className="ml-auto hover:text-blue-400 hover:bg-white/60 text-blue-300 rounded p-2"
				>
					<FiMoreVertical className="text-xl" />
				</button>
				{menuOpen && <Menu />}
			</div>
		</div>
	);
};

export default FileCard;
