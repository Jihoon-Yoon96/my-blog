"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, ChevronRight, Hash, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// --- 1. 더미 데이터 (나중에 MDX로 대체) ---
const POST_DATA = {
    title: "Next.js 16과 React Server Component의 미래",
    date: "2024.05.20",
    readingTime: "5 min read",
    author: {
        name: "Yun Ji-hun",
        image: "https://github.com/shadcn.png"
    },
    tags: ["Next.js", "React", "Frontend", "Server Component"],
    series: {
        name: "Next.js 딥다이브",
        order: 1,
        total: 5
    },
    // 실제로는 MDX 내용이 렌더링될 곳
    content: `
    <p>Next.js 16이 발표되면서 프론트엔드 생태계에 또 한 번 큰 파동이 일고 있습니다. 특히 <strong>Server Actions</strong>가 안정화(Stable) 단계에 접어들면서...</p>
    <h2>1. 무엇이 바뀌었나?</h2>
    <p>가장 큰 변화는 역시 터보팩(Turbopack)의 기본 적용입니다. 빌드 속도가 기존 대비 50% 이상 향상되었습니다.</p>
    <blockquote>
      "속도는 기능이다." - Vercel CEO
    </blockquote>
    <h2>2. React Server Component (RSC)</h2>
    <p>RSC는 이제 선택이 아닌 필수입니다. 클라이언트 번들 사이즈를 획기적으로 줄일 수 있는 이 기술은...</p>
    <h3>2-1. 데이터 페칭의 변화</h3>
    <p>기존의 useEffect를 이용한 페칭 패턴은 이제 과거의 유물이 되어가고 있습니다. 컴포넌트 내부에서 직접 await를 사용하는 방식은 직관적이지만...</p>
    <h2>3. 결론</h2>
    <p>변화는 두렵지만, 그만큼 새로운 기회이기도 합니다. 우리는 계속해서 학습하고 적용해야 합니다.</p>
  `,
    toc: [
        { id: "section-1", text: "1. 무엇이 바뀌었나?", level: 1 },
        { id: "section-2", text: "2. React Server Component (RSC)", level: 1 },
        { id: "section-2-1", text: "2-1. 데이터 페칭의 변화", level: 2 },
        { id: "section-3", text: "3. 결론", level: 1 },
    ]
}

// --- 2. 컴포넌트 ---

// 헤더 (임시 - 나중에 layout.tsx로 이동 권장)
const Header = () => (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 mx-auto">
            <Link href="/" className="font-bold">Jihun.Dev</Link>
            <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8"><AvatarImage src="https://github.com/shadcn.png"/></Avatar>
            </div>
        </div>
    </header>
)

export default function PostDetail() {
    return (
        <div className="min-h-screen bg-background font-sans">
            <Header />

            <div className="container max-w-screen-xl mx-auto px-4 py-8">

                {/* 상단 네비게이션 */}
                <div className="mb-8">
                    <Link href="/">
                        <Button variant="ghost" className="pl-0 hover:pl-2 transition-all text-muted-foreground">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12">

                    {/* 메인 컨텐츠 영역 */}
                    <article className="prose dark:prose-invert prose-stone max-w-none w-full">
                        {/* 게시글 헤더 정보 */}
                        <div className="mb-8 not-prose">
                            {/* 시리즈 카드 (시리즈 글일 경우에만 노출) */}
                            {POST_DATA.series && (
                                <Card className="mb-6 p-4 bg-muted/30 border-primary/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div className="space-y-1">
                                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Series</span>
                                        <div className="font-medium flex items-center gap-2">
                                            <FolderIcon className="w-4 h-4 text-muted-foreground" />
                                            {POST_DATA.series.name}
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full sm:w-auto text-xs h-8">
                                        목록 보기 ({POST_DATA.series.order}/{POST_DATA.series.total})
                                    </Button>
                                </Card>
                            )}

                            <div className="flex gap-2 mb-4">
                                {POST_DATA.tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="hover:bg-secondary/80">
                                        # {tag}
                                    </Badge>
                                ))}
                            </div>

                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-foreground">
                                {POST_DATA.title}
                            </h1>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground border-b border-border pb-8">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" /> {POST_DATA.date}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" /> {POST_DATA.readingTime}
                                </div>
                            </div>
                        </div>

                        {/* 본문 (Markdown Content) */}
                        {/* dangerouslySetInnerHTML은 테스트용입니다. 실제로는 MDXComponent를 씁니다. */}
                        <div dangerouslySetInnerHTML={{ __html: POST_DATA.content }} />

                        {/* 하단: 댓글 (Giscus Placeholder) */}
                        <div className="mt-16 pt-8 border-t border-border not-prose">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <MessageSquare className="w-6 h-6" /> Comments
                            </h3>
                            <div className="w-full h-40 rounded-xl border border-dashed border-border flex items-center justify-center bg-muted/20 text-muted-foreground">
                                Giscus Comments Widget Area
                            </div>
                        </div>
                    </article>

                    {/* 우측 사이드바 (TOC) - PC에서만 보임 */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-24">
                            <h4 className="font-semibold mb-4 text-sm flex items-center gap-2">
                                On this page
                            </h4>
                            <ul className="space-y-3 text-sm border-l border-border pl-4">
                                {POST_DATA.toc.map((item) => (
                                    <li key={item.id} className={`${item.level === 2 ? 'pl-4' : ''}`}>
                                        <a
                                            href={`#${item.id}`}
                                            className="text-muted-foreground hover:text-foreground transition-colors block py-1"
                                        >
                                            {item.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    )
}

function FolderIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 2H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
        </svg>
    )
}