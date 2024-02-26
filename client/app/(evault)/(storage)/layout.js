// 'use client';

import NavIcon from "@components/evault/layout/NavIcon";
import NavItem from "@components/evault/layout/NavItem";
import styles from "@styles/layout.module.css";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { BiSolidNotification, BiSolidUserCircle } from "react-icons/bi";
import { FaChevronLeft, FaShare } from "react-icons/fa";
import { FaCloud } from "react-icons/fa6";
import { HiMiniDocumentDuplicate, HiMiniTrash } from "react-icons/hi2";
import { IoMdSettings } from "react-icons/io";
import { PiVaultFill } from "react-icons/pi";

const StorageLayout = ({ children }) => {
	return (
		<div className="flex bg-navbar h-[100vh]">
			<div className="px-4 flex flex-col justify-between items-center py-10">
				<div className="flex flex-col gap-5 pt-20">
					<NavIcon href="/my-files" title="Storage" Icon={PiVaultFill} />
					<NavIcon
						href="/notifications"
						Icon={BiSolidNotification}
						iconStyle={styles.hasNotif}
					/>
					<NavIcon href="/settings" Icon={IoMdSettings} />
				</div>
				<NavIcon
					href="/profile"
					title="My Profile"
					Icon={BiSolidUserCircle}
					iconStyle={"!w-8 !h-8"}
					linkStyle={
						"!rounded-[50%] !p-0 !w-fit !border-[3px] hover:!border-[#FFFFFF40]"
					}
				/>
			</div>
			<div className="flex bg-white rounded-s-[60px] w-full">
				<div>
					<div className="pt-10 pl-5">
						<button
							type="button"
							className="absolute bg-[#E3E3FF] grid place-items-center w-fit p-1 my-2 rounded-md"
						>
							<FaChevronLeft className="text-[#00000060] w-3 h-3" />
						</button>
						<h2 className="py-5 text-xl font-semibold pt-[3.5rem]">Storage</h2>
					</div>
					<div>
						<NavItem
							title="My Files"
							href="/my-files"
							Icon={HiMiniDocumentDuplicate}
						/>
						<NavItem
							title="Shared with me"
							href="shared"
							Icon={FaShare}
							iconStyle="h-4"
						/>
						<NavItem title="Starred" href="starred" Icon={AiFillStar} />
						<NavItem
							title="Trash"
							href="trash"
							Icon={HiMiniTrash}
							iconStyle="h-[1.15rem]"
						/>
					</div>
					<div className="ml-4 mt-5 mr-3">
						<div className="h-[5px] rounded-lg bg-[#E1E1E1] overflow-hidden">
							<div className="bg-[#37A0EABF] h-full w-[70%] rounded-lg" />
						</div>
						<div className="text-[#48484D] flex justify-start items-center gap-3 mt-3 ml-2">
							<FaCloud className="w-4 h-4" />
							<div className="text-xs">9GB of 15GB used</div>
						</div>
					</div>
				</div>
				<div className="ml-2 w-full bg-[#F3F6F9] rounded-s-[60px]">
					{children}
				</div>
			</div>
		</div>
	);
};

export default StorageLayout;
