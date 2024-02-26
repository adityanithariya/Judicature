import File from "@components/evault/dashboard/File";
import Folder from "@components/evault/dashboard/Folder";
import SearchBar from "@components/evault/dashboard/SearchBar";
import SortDialog from "@components/evault/dialog/SortDialog";
import TableList from "@components/icons/TableList";
import { BsFillCaretDownFill } from "react-icons/bs";
import { FiArrowDown } from "react-icons/fi";
import { MdInfoOutline } from "react-icons/md";
import { PiDotsThreeVerticalBold } from "react-icons/pi";

const MyFiles = () => {
	return (
		<div className="my-8 mx-5">
			<SearchBar />
			<div className="mt-8 mx-6 relative">
				<div className="flex justify-between">
					<h2 className="text-lg">My Files</h2>
					<div className="flex gap-7">
						<button
							type="button"
							className="w-10 h-10 rounded-3xl hover:bg-hover flex justify-center items-center"
						>
							<TableList className="w-6 h-6" />
						</button>
						<button
							type="button"
							className="w-10 h-10 rounded-3xl hover:bg-hover flex justify-center items-center"
						>
							<MdInfoOutline className="w-[1.3rem] h-6" />
						</button>
					</div>
				</div>
				<div className="absolute right-1 -bottom-10 gap-3 flex items-center justify-center text-[#3E3E3E]">
					<button
						type="button"
						className="w-8 h-8 rounded-3xl hover:bg-hover flex justify-center items-center"
					>
						<FiArrowDown className="w-5 h-5" />
					</button>
					<div className="relative">
						<button
							type="button"
							className="flex justify-center items-center px-4 py-1.5 gap-2 rounded-2xl hover:bg-hover"
						>
							<div className="text-sm">Name</div>
							<BsFillCaretDownFill className="w-3 h-3" />
						</button>
						<SortDialog />
					</div>
					<button
						type="button"
						className="w-8 h-8 rounded-3xl hover:bg-hover flex justify-center items-center"
					>
						<PiDotsThreeVerticalBold className="w-5 h-5" />
					</button>
				</div>
			</div>
			<div className="mx-6 mt-6">
				<div className="text-xs mb-3">Folders</div>
				<div className="grid gap-2 grid-cols-4">
					<Folder folderName="Folder 1" isShared />
					<Folder folderName="Folder 2" />
					<Folder folderName="Folder 3" isShared />
					<Folder folderName="Folder 4" />
				</div>
			</div>
			<div className="mx-6 mt-6">
				<div className="text-xs mb-3">Files</div>
				<div className="grid gap-2 grid-cols-4">
					<File fileName="Folder 1" isShared />
					<File fileName="Folder 2" />
					<File fileName="Folder 3" isShared />
					<File fileName="Folder 4" />
				</div>
			</div>
		</div>
	);
};

export default MyFiles;
