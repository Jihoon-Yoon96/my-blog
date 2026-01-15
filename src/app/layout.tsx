import type { Metadata } from "next";
import { Header } from "@/components/layout/Header"; // ✨ 추가
import "./globals.css";

// ... (폰트, 메타데이터 설정 유지)

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className="...">
        <Header />  {/* ✨ 여기에 배치하면 모든 페이지에 뜹니다 */}
        {children}
        </body>
        </html>
    );
}