'use client';

import React from 'react';
import '@styles/globals.css';

const InputField = ({ icon: Icon, label, type, register }) => {
    return (
        <div className="flex items-center justify-center bg-white py-4 px-2 gap-2 rounded-lg shadow-md my-1.5 select-none">
            <Icon className="text-blue-500 text-[1.6rem] mx-2 p-1" />
            <input
                type={type}
                id={label}
                name={label}
                placeholder={label}
                className="outline-none bg-transparent text-lg text-slate-800 font-medium w-full"
                {...register(label.toLowerCase().replace(' ', '_'), {
                    required: `Please enter your ${label}`,
                })}
            />
        </div>
    );
};

export default InputField;

