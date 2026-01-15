"use client" // 클라이언트 컴포넌트 여부 확인 필요 (데이터 fetch 방식에 따라 제거 가능)

import React from "react"
import { Sidebar } from "@/components/layout/Sidebar" // ✨
import { PostCard } from "@/components/post/PostCard" // ✨
import { ScrollArea } from "@/components/ui/scroll-area"

// 더미 데이터 (나중에 Velite로 교체)
const POSTS = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    title: `Next.js 16과 React Server Component의 미래 ${i + 1}`,
    description: "Next.js 16에서 새롭게 도입된 기능들과...",
    date: "2024.05.20",
    tags: ["Next.js", "React"],
    series: i % 3 === 0 ? "Next.js 딥다이브" : null,
    thumbnailColor: i % 2 === 0 ? "bg-gradient-to-br from-violet-500 to-purple-900" : "bg-gradient-to-br from-blue-500 to-cyan-900", // 임시 컬러
}))

export default function BlogHome() {
    return (
        <div className="container mx-auto flex-1 items-start md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr] md:gap-6 lg:gap-10 max-w-screen-2xl px-4 py-6">

            {/* PC용 LNB (모바일은 Header의 Sheet에 있음) */}
            <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block overflow-y-auto pr-4">
                <ScrollArea className="h-full py-6 pr-2">
                    <Sidebar />
                </ScrollArea>
            </aside>

            {/* 메인 컨텐츠 영역 */}
            <main className="flex flex-col gap-6 w-full min-w-0">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">All Posts</h1>
                    <span className="text-sm text-muted-foreground">
              Total {POSTS.length} posts
          </span>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {POSTS.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </main>
        </div>
    )
}