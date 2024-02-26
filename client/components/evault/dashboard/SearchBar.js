"use client";

import IoFilter from "@components/icons/IoFilter";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = () => {
	const [query, setQuery] = useState("");
	return (
		<div className="relative w-[40dvw] flex h-12 ml-20 rounded-md bg-white">
			<label htmlFor="search" className="w-6 h-6 my-auto ml-4">
				<AiOutlineSearch className="text-[#00000080] w-full h-full" />
			</label>
			<div className="w-full relative ml-5 mr-2">
				<input
					type="text"
					id="search"
					className="w-full h-full absolute text-[.9rem]"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<label
					htmlFor="search"
					className={`absolute translate-y-[-50%] top-[50%] ${
						query.trim() ? "z-[-1]" : "text-[#00000066]"
					} cursor-text text-[.9rem]`}
				>
					Search
				</label>
			</div>
			<button type="button" className="w-[3.25rem] my-auto relative group">
				<abbr title="Apply Filters">
					<IoFilter className="fill-[#000000B2] top-[50%] translate-y-[-50%] absolute w-9 h-9 p-2 rounded-3xl group-hover:fill-[#000] group-focus:fill-[#000] group-hover:bg-[#DFF1FE] group-focus:bg-[#DFF1FE]" />
				</abbr>
			</button>
		</div>
	);
};

export default SearchBar;
