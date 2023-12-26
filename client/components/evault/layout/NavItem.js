import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react';

const NavItem = ({ title, href, Icon, iconStyle }) => {
    const pathname = headers().get('x-pathname') || '';
    return (
        <Link
            href={href}
            className={`flex gap-5 justify-start items-center pl-5 py-2.5 ${
                href === pathname ? 'bg-[#37A0EA2E]' : ''
            } w-[232px] rounded-r-[45px] hover:border-[#37A0EAB5] focus:border-[#37A0EAB5] nout border-[1px] border-l-0 border-[#ffffff01]`}
        >
            <Icon
                className={`w-5 h-5 ${
                    href === pathname ? 'text-[#37A0EA]' : 'text-[#48484D]'
                } ${iconStyle}`}
            />
            <div
                className={`text-sm ${
                    href === pathname ? 'text-[#37A0EA]' : 'text-[#48484D]'
                }`}
            >
                {title}
            </div>
        </Link>
    );
};

export default NavItem;
