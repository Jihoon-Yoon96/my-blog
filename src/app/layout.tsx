import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { SearchModal } from "@/components/layout/SearchModal";
// import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        template: '%s | Jihun.Dev',
        default: 'Jihun.Dev - Tech Blog',
    },
    description: '프론트엔드 개발자 윤지훈의 기술 블로그입니다.',
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Header />
            {children}

            {/* 여기에 나중에 <SearchModal /> 을 추가할 예정입니다 */}
            <SearchModal />

            <ThemeToggle />
        </NextThemesProvider>
        </body>
        </html>
    );
}