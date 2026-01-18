// src/app/page.tsx
"use client"

import React from "react"
import { Sidebar } from "@/components/layout/Sidebar"
import { PostCard } from "@/components/post/PostCard"
import { ScrollArea } from "@/components/ui/scroll-area"
import { posts } from "#site/content"

export default function BlogHome() {
    // 날짜 최신순 정렬
    const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return (
        <div className="container mx-auto flex-1 items-start md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr] md:gap-6 lg:gap-10 max-w-screen-2xl px-4 py-6">
            <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block overflow-y-auto pr-4">
                <ScrollArea className="h-full py-6 pr-2">
                    <Sidebar />
                </ScrollArea>
            </aside>

            <main className="flex flex-col gap-6 w-full min-w-0">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">All Posts</h1>
                    <span className="text-sm text-muted-foreground">
                        Total {sortedPosts.length} posts
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {/* 정렬된 진짜 데이터 맵핑 */}
                    {sortedPosts.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))}
                </div>
            </main>
        </div>
    )
}