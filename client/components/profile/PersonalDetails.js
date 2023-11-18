'use client';
import InputField from '@components/profile/InputField';
import React from 'react';
import Select from 'react-select';
const PersonalDetails = () => {
    const options = [
        { value: 'blues', label: 'Blues' },
        { value: 'rock', label: 'Rock' },
        { value: 'jazz', label: 'Jazz' },
        { value: 'orchestra', label: 'Orchestra' },
    ];
    const colourStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: ' rgb(243 244 246 )',
            borderRadius: '1rem',
            border: 'transparent',
            outline: 'none',
            padding: '0.5rem',
            color: '#808080',
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isFocused || isSelected ? 'blue' : 'slate',
                color: isSelected || isFocused ? 'white' : '#808080',
                cursor: isDisabled ? 'not-allowed' : 'default',
            };
        },
    };
    const inputComboClass = 'flex gap-40';
    return (
        <div className="mb-4 mt-5 text-gray-400">
            <div className=" font-extralight mb-4 text-[#716a6acc]">
                PERSONAL DETAILS
            </div>
            <div className="flex flex-col h-[40vh] flex-wrap gap-y-3">
                <div className={inputComboClass}>
                    <InputField label="First Name" />
                    <InputField label="Last Name" />
                </div>
                <div className={inputComboClass}>
                    <InputField label="Email Address" type="email" />
                    <div className="relative mb-2 w-72">
                        <Select
                            styles={colourStyles}
                            name="state"
                            options={options}
                        />
                    </div>
                </div>
                <div className={inputComboClass}>
                    <InputField label="Phone number" type="text" />
                    <div className="relative mb-2 w-72">
                        <Select
                            styles={colourStyles}
                            name="city"
                            options={options}
                        />
                    </div>
                </div>
                <div className={inputComboClass}>
                    <div className="relative mb-2 w-72">
                        <input
                            type="date"
                            placeholder="Date of Birth"
                            className="w-full h-13 p-4 focus:shadow-lg focus:outline-none rounded-xl bg-gray-100"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalDetails;
