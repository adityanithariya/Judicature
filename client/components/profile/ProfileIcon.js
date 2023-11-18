import React from 'react';

const ProfileIcon = ({ Icon, className }) => {
    return (
        <Icon
            className={`absolute right-4 top-[50%] translate-y-[-50%] w-5 h-5 ${className}`}
        />
    );
};

export default ProfileIcon;
