'use client';

import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@graphql/index';
import '@styles/globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//     title: 'Judicature',
//     description: 'Administrative of Justice!',
// };

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ApolloProvider client={apolloClient}>
                    {children}
                </ApolloProvider>
            </body>
        </html>
    );
}
