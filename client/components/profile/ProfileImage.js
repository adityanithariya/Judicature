import React from 'react';
import { IoImageOutline } from 'react-icons/io5';

const ProfileImage = () => {
    return (
        <div className=" p-4 text-gray-400">
            <div className=" font-extralight mb-4">PROFILE IMAGE</div>
            <img
                src="https://imgs.search.brave.com/uKJWrPay-aXrHz80maPaGiiNLZ2kYAv79ZxJ-34RAT0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMtZ2xvYmFsLndl/YnNpdGUtZmlsZXMu/Y29tLzVlYzdkYWQy/ZTZmNjI5NWE5ZTJh/MjNkZC81ZWRmYTdj/NjYwNGM3N2IxYjRi/ZDY1OGFfcHJvZmls/ZXBob3RvNS5qcGVn"
                alt="Profile"
                className="w-100% h-100% mb-5 object-cover rounded-xl"
            />
            <a href="#" className="text-blue-600 hover:underline mt-2">
                <div className="flex justify-center items-center">
                    <IoImageOutline className="mr-3" />
                    Change Profile Image
                </div>
            </a>
        </div>
    );
};

export default ProfileImage;
