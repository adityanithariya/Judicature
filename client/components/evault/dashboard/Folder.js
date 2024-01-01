import React from 'react';
import { BiSolidUser } from 'react-icons/bi';
import { HiFolder } from 'react-icons/hi';
import { PiDotsThreeVerticalBold } from 'react-icons/pi';

const Folder = ({ folderName, isShared }) => {
    return (
        <div className="bg-white hover:bg-[#DFF1FE] relative group cursor-pointer select-none py-3 px-4 rounded-2xl flex justify-start items-center gap-3 w-full">
            <div className="relative w-fit">
                {isShared ? (
                    <BiSolidUser className="absolute right-1 bottom-[0.4rem] text-white w-[0.65rem] h-[0.65rem]" />
                ) : null}
                <HiFolder className="text-[#000000B3] w-7 h-7" />
            </div>
            <div className="text-sm whitespace-nowrap text-ellipsis max-w-[70%] overflow-hidden">
                {folderName}
            </div>
            <button className="absolute right-0 mx-2">
                <PiDotsThreeVerticalBold className="group-hover:text-black text-white w-5 h-5" />
            </button>
        </div>
    );
};

export default Folder;
