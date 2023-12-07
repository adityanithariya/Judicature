// 'use client';

import React from 'react';
import { PiVaultFill } from 'react-icons/pi';
import { BiSolidNotification, BiSolidUserCircle } from 'react-icons/bi';
import { IoMdSettings } from 'react-icons/io';
import { HiMiniDocumentDuplicate } from 'react-icons/hi2';
import { FaChevronLeft } from 'react-icons/fa';
import styles from '@styles/layout.module.css';
import NavIcon from '@components/evault/layout/NavIcon';
import Link from 'next/link';

const StorageLayout = ({ children }) => {
    return (
        <div className="flex bg-navbar h-[100vh]">
            <div className="px-4 flex flex-col justify-between items-center py-10">
                <div className="flex flex-col gap-5 pt-20">
                    <NavIcon
                        href="/my-files"
                        title="Storage"
                        Icon={PiVaultFill}
                    />
                    <NavIcon
                        href="/notifications"
                        Icon={BiSolidNotification}
                        iconStyle={styles.hasNotif}
                    />
                    <NavIcon href="/settings" Icon={IoMdSettings} />
                </div>
                <NavIcon
                    href="/profile"
                    title="My Profile"
                    Icon={BiSolidUserCircle}
                    iconStyle={'!w-8 !h-8'}
                    linkStyle={
                        '!rounded-[50%] !p-0 !w-fit !border-[3px] hover:!border-[#FFFFFF40]'
                    }
                />
            </div>
            <div className="flex bg-white rounded-s-[60px] w-[100%]">
                <div>
                    <div className="pt-10 pl-5">
                        <div className="bg-[#E3E3FF] grid place-items-center w-fit p-1 my-2 rounded-md">
                            <FaChevronLeft className="text-[#00000060] w-3 h-3" />
                        </div>
                        <h2 className="py-5 text-xl font-semibold">Storage</h2>
                    </div>
                    <div>
                        <Link
                            href="/my-files"
                            className="flex gap-5 justify-start items-center pl-5 py-2.5 bg-[#37A0EA2E] w-[232px] rounded-r-[45px] hover:border-[#37A0EAB5] border-[1px] border-l-0 border-[#ffffff01]"
                        >
                            <HiMiniDocumentDuplicate className="w-5 h-5 text-[#37A0EA]" />
                            <div className="text-sm text-[#37A0EA]">
                                My Files
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="w-[100%]">{children}</div>
            </div>
        </div>
    );
};

export default StorageLayout;
