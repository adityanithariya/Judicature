import React from 'react';
import { FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';
import { HiCheckCircle } from 'react-icons/hi';
import { FiUpload } from 'react-icons/fi';
import ProfileIcon from './ProfileIcon';

const DocumentDetails = () => {
    const inputComboClass = 'flex gap-40';
    return (
        <div className="mb-4 mt-5 text-gray-400">
            <div className="font-extralight mb-4 text-[#716a6acc]">
                PERSONAL DOCS
            </div>
            <div className="flex flex-col h-[40vh] flex-wrap gap-y-3">
                <div className={inputComboClass}>
                    <div className="relative mb-2 w-72">
                        <input
                            type="text"
                            placeholder=" "
                            name="Aadhar Card"
                            className=" input-field w-full h-13 p-4 pt-6 pb-2 focus:shadow-lg focus:outline-none rounded-2xl bg-gray-100 text-black"
                        />
                        <label className="input-label absolute text-base transition-all text-[#808080] left-4 top-[50%] translate-y-[-50%] cursor-text">
                            Aadhar Card
                        </label>
                    </div>
                    <div className="relative mb-2 w-72">
                        <input
                            type="text"
                            placeholder=" "
                            name="Pan Card"
                            className="input-field w-full h-13 p-4 pt-6 pb-2 focus:shadow-lg focus:outline-none rounded-2xl bg-gray-100 text-black"
                        />
                        <label className="input-label absolute text-base transition-all text-[#808080] left-4 top-[50%] translate-y-[-50%] cursor-text">
                            Pan Card
                        </label>
                    </div>
                </div>

                <div className={inputComboClass}>
                    <div className="relative mb-2 w-72">
                        <input
                            type="text"
                            placeholder=" "
                            name="Driving License"
                            className="input-field w-full h-13 p-4 pt-6 pb-2 focus:shadow-lg focus:outline-none rounded-2xl bg-gray-100 text-black"
                        />
                        <label className="input-label absolute text-base transition-all text-[#808080] left-4 top-[50%] translate-y-[-50%] cursor-text">
                            Driving License
                        </label>
                    </div>
                    <div className="relative mb-2 w-72">
                        <input
                            type="text"
                            placeholder=" "
                            name="Domicile Certificate"
                            className="input-field w-full h-13 p-4 pt-6 pb-2 focus:shadow-lg focus:outline-none rounded-2xl bg-gray-100 text-black"
                        />
                        <label className="input-label absolute text-base transition-all text-[#808080] left-4 top-[50%] translate-y-[-50%] cursor-text">
                            Domicile Certificate
                        </label>
                    </div>
                </div>

                <div className={inputComboClass}>
                    <div className="relative mb-2 w-72">
                        <input
                            type="text"
                            placeholder=" "
                            name="Voter Id"
                            className="input-field w-full h-13 p-4 pt-6 pb-2 focus:shadow-lg focus:outline-none rounded-2xl bg-gray-100 text-black"
                        />
                        <label className="input-label absolute text-base transition-all text-[#808080] left-4 top-[50%] translate-y-[-50%] cursor-text">
                            Voter Id
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentDetails;
