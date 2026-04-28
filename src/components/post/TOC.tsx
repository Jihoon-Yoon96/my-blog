// src/components/post/TOC.tsx
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface TOCProps {
    toc: { title: string; url: string; depth: number }[]
}

export function TOC({ toc }: TOCProps) {
    const [activeId, setActiveId] = useState<string>("")

    // 화면 스크롤 시 현재 읽고 있는 제목 위치를 감지하는 로직
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            // 화면 상단에서 약간 내려온 위치를 기준으로 감지
            { rootMargin: "-80px 0px -80% 0px" }
        )

        // 본문 내의 모든 제목 요소 관찰 시작
        const headingElements = document.querySelectorAll("article h1, article h2, article h3, article h4")
        headingElements.forEach((element) => observer.observe(element))

        return () => observer.disconnect()
    }, [])

    if (!toc || toc.length === 0) return null

    return (
        <div className="sticky top-24">
            <h4 className="font-semibold mb-4 text-sm flex items-center gap-2">
                On this page
            </h4>
            <div className="flex flex-col text-sm text-muted-foreground border-l border-border">
                {toc.map((item, index) => {
                    // url은 '#heading-id' 형태이므로 앞의 '#'을 제거하고 비교합니다.
                    const isActive = activeId === item.url.slice(1)

                    return (
                        <Link
                            key={index}
                            href={item.url}
                            className={cn(
                                "hover:text-primary transition-colors py-1.5 pr-4",
                                // Heading 깊이(depth)에 따른 들여쓰기 설정 (h1, h2, h3)
                                item.depth === 1 && "pl-4 font-medium text-foreground",
                                item.depth === 2 && "pl-4",
                                item.depth === 3 && "pl-8 text-xs",
                                // 현재 읽고 있는 위치일 때 하이라이트 및 왼쪽 굵은 선 표시
                                isActive && "text-primary font-medium border-l-2 border-primary -ml-[1px]"
                            )}
                        >
                            {item.title}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}