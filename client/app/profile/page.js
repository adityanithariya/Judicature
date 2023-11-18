import React from 'react';
import ProfileImage from '@components/profile/ProfileImage';
import PersonalDetails from '@components/profile/PersonalDetails';
import DocumentDetails from '@components/profile/DocumentDetails';

const ProfilePage = () => {
    return (
        <div className="flex flex-col p-3">
            <div className="flex">
                <div className="w-1/3 p-4 flex justify-center">
                    <ProfileImage />
                </div>
                <div className="p-4 w-auto">
                    <PersonalDetails />
                    <DocumentDetails />
                </div>
            </div>
            <div className="flex justify-center w-full">
                <button className="bg-black text-white px-16 py-3 rounded-2xl mr-2 w-60">
                    Save Changes
                </button>
                <button className="bg-gray-100 px-16 py-3  rounded-2xl ml-2 w-60 ">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
