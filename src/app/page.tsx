"use client"

import React from "react"
import Link from "next/link"
import { Menu, Folder, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet" // SheetTitle, SheetDescription 추가
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

// --- 1. 더미 데이터 (나중에 Velite 데이터로 교체됨) ---
const CATEGORIES = [
  { id: "all", name: "전체 보기", count: 12 },
  { id: "dev", name: "개발 일지", count: 5 },
  { id: "nextjs", name: "Next.js 딥다이브", count: 3 },
  { id: "react", name: "React 까보기", count: 4 },
]

const POSTS = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  title: `Next.js 16과 React Server Component의 미래 ${i + 1}`,
  description: "Next.js 16에서 새롭게 도입된 기능들과 그것이 FE 생태계에 미칠 영향에 대해 깊이 있게 다뤄봅니다. SSG와 SSR의 경계가 허물어지고 있습니다.",
  date: "2024.05.20",
  tags: ["Next.js", "React", "Frontend"],
  series: i % 3 === 0 ? "Next.js 딥다이브" : null,
  thumbnailColor: i % 2 === 0 ? "bg-gradient-to-br from-violet-500 to-purple-900" : "bg-gradient-to-br from-blue-500 to-cyan-900",
}))

// --- 2. 컴포넌트 조각들 (나중에 파일 분리 예정) ---

// GNB (헤더)
const Header = () => (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 mx-auto">
        {/* 모바일용 햄버거 메뉴 */}
        <div className="mr-4 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px]">
              {/* 접근성 준수를 위해 Title/Description 추가 */}
              <div className="sr-only">
                <SheetTitle>카테고리 메뉴</SheetTitle>
                <SheetDescription>블로그 카테고리 목록입니다.</SheetDescription>
              </div>
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </div>

        {/* 로고 */}
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2 font-bold text-lg tracking-tight" href="/">
            <span>Jihun.Dev</span>
          </a>
        </div>
        <div className="md:hidden font-bold flex-1 text-center md:text-left">Jihun.Dev</div>

        {/* 우측 아이콘들 */}
        <div className="flex items-center space-x-2">
          {/* 검색 버튼 (일단 껍데기) */}
          <Button variant="outline" size="sm" className="h-9 w-full justify-start text-muted-foreground sm:w-64 sm:pr-12 lg:w-80 hidden md:inline-flex">
            <span className="hidden lg:inline-flex">Search posts...</span>
            <span className="inline-flex lg:hidden">Search...</span>
            <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
          {/* 모바일용 검색 아이콘 (작게) */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <span className="sr-only">Search</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-search h-5 w-5"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </Button>

          <Avatar className="h-8 w-8 ml-2 cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JH</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
)

// LNB (사이드바 내용)
const SidebarContent = () => (
    <div className="flex flex-col h-full py-4">
      <h4 className="mb-4 px-2 text-lg font-semibold tracking-tight">
        Category
      </h4>
      <div className="space-y-1">
        {CATEGORIES.map((cat) => (
            <Button key={cat.id} variant={cat.id === 'all' ? "secondary" : "ghost"} className="w-full justify-between font-normal">
              <div className="flex items-center">
                {cat.id !== 'all' && <Folder className="mr-2 h-4 w-4 text-muted-foreground" />}
                {cat.name}
              </div>
              <span className="text-xs text-muted-foreground">{cat.count}</span>
            </Button>
        ))}
      </div>
      <Separator className="my-4" />
      <div className="px-2 text-xs text-muted-foreground">
        © 2026 Yoon Ji-Hun. <br /> All rights reserved.
      </div>
    </div>
)

// 메인 카드 (게시글)
const PostCard = ({ post }: { post: any }) => (
    <Link href={`/posts/${post.id}`} className="block h-full">

        <Card className="group flex flex-col h-full overflow-hidden border border-border/50 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer">
            {/* 썸네일 영역 */}
            <div className={`h-40 w-full ${post.thumbnailColor} relative overflow-hidden`}>
                {post.series && (
                    <Badge variant="secondary" className="absolute top-3 left-3 bg-black/50 text-white hover:bg-black/70 border-none backdrop-blur-sm">
                        SERIES : {post.series}
                    </Badge>
                )}
            </div>

            <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground flex items-center">
            <Calendar className="w-3 h-3 mr-1" /> {post.date}
          </span>
                </div>
                <h3 className="line-clamp-2 text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                </h3>
            </CardHeader>

            <CardContent className="p-4 pt-0 flex-1">
                <p className="line-clamp-2 text-sm text-muted-foreground">
                    {post.description}
                </p>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex flex-wrap gap-2 pb-4">
                {post.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs font-normal">
                        #{tag}
                    </Badge>
                ))}
            </CardFooter>
        </Card>
    </Link>
)


// --- 3. 페이지 조합 ---
export default function BlogHome() {
  return (
      <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        <Header />

        <div className="container mx-auto flex-1 items-start md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr] md:gap-6 lg:gap-10 max-w-screen-2xl px-4 py-6">

          {/* PC용 LNB (사이드바) - 모바일에선 숨김 */}
          <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block overflow-y-auto pr-4">
            <ScrollArea className="h-full py-6 pr-2">
              <SidebarContent />
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

            {/* 게시글 그리드 (반응형: 1열 -> 2열 -> 3열) */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {POSTS.map((post) => (
                  <PostCard key={post.id} post={post} />
              ))}
            </div>

          </main>
        </div>
      </div>
  )
}