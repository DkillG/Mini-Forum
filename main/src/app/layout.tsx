import '@/styles/globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Poppins } from 'next/font/google';
import { cn } from '@/shared/utils/ClassName';
import { Toaster } from '@/components/utils/toasts/toaster';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900'
});

export const metadata: Metadata = {
	title: 'Mini Forum',
	description:
		'Mini Forum is a tiny forum web where you can post anything, comment another posts and vote if you like them or not.'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(geistSans.variable, poppins.className, 'antialiased')}
			>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
