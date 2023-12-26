import Link from 'next/link';
import React from 'react';
import { headers } from 'next/headers';

const NavIcon = ({ href, title, Icon, iconStyle, linkStyle }) => {
    const pathname = headers().get('x-pathname') || '';
    return (
        <abbr title={title || href.charAt(1).toUpperCase() + href.slice(2)}>
            <Link
                href={href}
                className={`grid place-items-center p-2 rounded-xl border-[#FFFFFF01] hover:border-[#FFFFFF80] focus:border-[#FFFFFF80] nout border-[1px] ${
                    pathname === href
                        ? 'bg-[#FFFFFF35] hover:border-[#FFFFFF30]'
                        : ''
                } ${linkStyle || ''}`}
            >
                <Icon className={'text-white w-7 h-7 ' + (iconStyle || '')} />
            </Link>
        </abbr>
    );
};

export default NavIcon;
