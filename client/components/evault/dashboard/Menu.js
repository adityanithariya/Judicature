import { MdDriveFileRenameOutline, MdDelete } from 'react-icons/md';
import { FiDownload, FiShare2 } from 'react-icons/fi';

const Menu = () => {
    return (
        <div className="flex flex-col bg-white/50 backdrop-blur-3xl z-50 min-w-max absolute top-1/2 right-0 translate-x-3 md:-translate-x-3 translate-y-5 shadow-xl">
            <button className="text-sm md:text-base flex items-center gap-5 hover:bg-white/60 px-5 py-2 rounded border-b">
                <FiDownload className="md:text-xl" /> Download File
            </button>
            <button className="text-sm md:text-base flex items-center gap-5 hover:bg-white/60 px-5 py-2 rounded border-b">
                <MdDriveFileRenameOutline className="md:text-xl" />
                Rename File
            </button>
            <button className="text-sm md:text-base flex items-center gap-5 hover:bg-white/60 px-5 py-2 rounded border-b">
                <FiShare2 className="md:text-xl" /> Share File
            </button>
            <button className="text-sm md:text-base flex items-center gap-5 hover:bg-white/60 px-5 py-2 rounded border-b">
                <MdDelete className="md:text-xl" /> Delete File
            </button>
        </div>
    );
};

export default Menu;
