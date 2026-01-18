"use client"

import React from "react"
import Link from "next/link"
import { Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sidebar } from "@/components/layout/Sidebar"
import { useSearchStore } from "@/lib/store"

export function Header() {
    const { onOpen } = useSearchStore()

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 mx-auto">

                {/* 모바일 메뉴 (Sheet) */}
                <div className="mr-4 md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[240px] pr-0">
                            <div className="sr-only">
                                <SheetTitle>메뉴</SheetTitle>
                                <SheetDescription>블로그 카테고리 이동</SheetDescription>
                            </div>
                            {/* 사이드바 컴포넌트 재사용 */}
                            <Sidebar className="pt-4" />
                        </SheetContent>
                    </Sheet>
                </div>

                {/* 로고 */}
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2 font-bold text-lg tracking-tight">
                        <span>Jihun.Dev</span>
                    </Link>
                </div>
                <div className="md:hidden font-bold flex-1 text-center md:text-left">
                    <Link href="/">Jihun.Dev</Link>
                </div>

                {/* 우측 아이콘들 */}
                <div className="flex items-center space-x-2">
                    {/* 검색 버튼 UI */}
                    <Button variant="outline" size="sm" className="h-9 w-full justify-start text-muted-foreground sm:w-64 sm:pr-12 lg:w-80 hidden md:inline-flex" onClick={onOpen}>
                        <span className="hidden lg:inline-flex">Search posts...</span>
                        {/*<kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">*/}
                        {/*    <span className="text-xs">⌘</span>K*/}
                        {/*</kbd>*/}
                    </Button>

                    <Button variant="ghost" size="icon" className="md:hidden" onClick={onOpen}>
                        <Search className="h-5 w-5" />
                    </Button>

                    <Avatar className="h-8 w-8 ml-2 cursor-pointer">
                        <AvatarImage src="/profile.png" alt="Profile" />
                        <AvatarFallback>JH</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    )
}