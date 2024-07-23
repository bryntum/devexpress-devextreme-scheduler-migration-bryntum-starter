import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets : ['latin'] });

export const metadata = {
    title       : 'Migrate from DevExpress DevExtreme to Bryntum Scheduler',
    description : 'Guide starter code'
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className} dx-viewport`}>{children}</body>
        </html>
    );
}
