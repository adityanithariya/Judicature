'use client';
import React, {useEffect, useState} from 'react';
import FileCard from '@components/evault/dashboard/FileCard';
import FileListItem from '@components/evault/dashboard/FileListItem';

import { FaUserCircle, FaPlus, FaListAlt } from 'react-icons/fa';
import { LuGrid } from "react-icons/lu";
import { FiMoreVertical } from 'react-icons/fi';


const Dashboard = () => {
    const files = ["filename1", "filename2", "filename3"]
    const [tileView, setTileView] = useState(true);
    const toggleTileView = ()=>{
        setTileView((prev)=>!prev)
        localStorage.setItem("tileView", !tileView)
    }
    useEffect(()=>{
        const tView = localStorage.getItem("tileView")
        if(tView) setTileView(tView === 'true')
    }, [])

    return (
        <>
            <div className="flex flex-col lg:flex-row w-full">
                <div className="hidden lg:block min-w-[300px] relative py-5 px-3">
                    <div className="flex flex-col items-center sticky top-5 rounded bg-white/50 h-[95vh] py-5 gap-5 shadow-xl">
                        <h3 className="text-3xl font-bold text-blue-600">
                            eVault
                        </h3>
                        <FaUserCircle className="text-7xl text-blue-600 mt-auto" />
                        <p className="text-blue-950">
                            Hey! <span className="font-bold">username</span>
                        </p>
                    </div>
                </div>
                <div className="lg:hidden sticky top-5 flex my-5 mx-3 rounded p-5 bg-white/50 backdrop-blur">
                    <h3 className="text-3xl font-bold text-blue-600">eVault</h3>
                    <div className="ml-auto flex justify-center items-center gap-2">
                        <p className="text-blue-900">
                            Hey! <span className="font-bold">username</span>
                        </p>
                        <FaUserCircle className="text-3xl text-blue-600" />
                    </div>
                </div>
                <div className="flex-1 p-5">
                    <div className='flex justify-between items-center gap-5 mt-5'>
                        <h3 className="text-3xl font-bold text-blue-900">
                            Your Files
                        </h3>
                        <button onClick={toggleTileView} className="p-2 rounded-full hover:bg-white/50 border" title={tileView ? "List View": "Grid View"}> 
                            {tileView? <FaListAlt className='text-blue-900 text-xl' />: <LuGrid className='text-blue-900 text-xl' />}
                        </button>
                    </div>
                    <div className={`flex flex-wrap items-center justify-center md:justify-normal mt-5 ${tileView?"gap-5": "rounded"}`}>
                        {!tileView && (
        <div className="w-full items-center gap-2 p-3 bg-white/50 transition border-b-2 relative hidden lg:flex">
            <div className="flex-1 flex flex-col lg:flex-row lg:gap-5 lg:mr-5">
                <p className="text-sm md:text-base font-bold text-blue-950 flex-1">
                    Name
                </p>
                <p className='font-bold text-sm md:text-base hidden sm:block text-blue-950'>
                    Owner
                </p>
                <p className='font-bold text-sm md:text-base text-blue-950 '>Last Modified</p>
            </div>
            <button
                className="ml-auto hover:text-blue-400 text-blue-300 rounded p-2"
            >
                <FiMoreVertical className="text-xl" />
            </button>
        </div>
    )}
                        {files.map((fname, index)=>{
                            return tileView? <FileCard key={index} filename={fname} />: <FileListItem key={index} filename={fname} owner={"owner"} date={"28 Oct 2023"} />
                        })}
                    </div>
                </div>
                <div className="fixed right-0 bottom-0 -translate-x-1/2 -translate-y-1/2">
                    <label
                        htmlFor="dashboard-add-file"
                        className="block w-20 h-20 md:w-24 md:h-24 rounded-full shadow-xl backdrop-blur bg-white/50 text-blue-600 p-6 hover:text-blue-900 hover:bg-white/80 focus:outline-none focus:ring focus:ring-[#467aebb2] cursor-pointer"
                    >
                        <FaPlus className="w-full h-full" />
                    </label>
                    <input
                        id="dashboard-add-file"
                        type="file"
                        className="hidden"
                    />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
