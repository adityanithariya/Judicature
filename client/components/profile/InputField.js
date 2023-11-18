import React from 'react';

const InputField = ({ label, type }) => {
    return (
        <div className="relative mb-2 w-72">
            <input
                placeholder=" "
                type={type || 'text'}
                className="input-field w-full h-13 p-4 pt-6 pb-2 focus:shadow-lg focus:outline-none rounded-2xl bg-gray-100 text-black"
            />
            <label className="input-label absolute text-base transition-all text-[#808080] left-4 top-[50%] translate-y-[-50%] cursor-text">
                {label}
            </label>
        </div>
    );
};

export default InputField;
