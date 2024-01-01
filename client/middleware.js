import { NextResponse } from 'next/server';

export function middleware(request) {
    const requestHeaders = new Headers(request.headers);
    const url = new URL(request.url);
    requestHeaders.set('x-pathname', url.pathname);

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}

export const config = {
    matcher: '/my-files',
};
