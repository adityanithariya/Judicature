import { useState } from 'react';
import Menu from './Menu';
import { FiMoreVertical } from 'react-icons/fi';
import { FaFile } from 'react-icons/fa';

const FileListItem = ({ filename, owner, date }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const hideMenu = () => setMenuOpen(false);
    const toggleMenu = () => setMenuOpen((prev) => !prev);

    return (
        <div
            onMouseLeave={hideMenu}
            className="w-full flex items-center gap-2 p-3 bg-white/50 transition border-b-2 relative"
        >
            <div className="p-2">
                <FaFile className="h-full w-full text-blue-950" />
            </div>
            <div className="flex-1 flex flex-col lg:flex-row lg:gap-5 lg:mr-5">
                <p className="text-sm md:text-base font-bold text-blue-950 flex-1">
                    {filename}
                </p>
                <p className='text-sm md:text-base hidden sm:block'>
                    {owner}
                </p>
                <p className='text-sm md:text-base'><span className='lg:hidden'>Modified</span> {date}</p>
            </div>
            <button
                onClick={toggleMenu}
                className="ml-auto hover:text-blue-400 hover:bg-white/60 text-blue-300 rounded p-2"
            >
                <FiMoreVertical className="text-xl" />
            </button>
            {menuOpen && <Menu />}
        </div>
    );
};

export default FileListItem;
