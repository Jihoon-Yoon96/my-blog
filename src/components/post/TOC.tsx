// src/components/post/TOC.tsx
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// 1. Velite의 실제 목차 데이터 구조에 맞게 타입 재정의
interface TocEntry {
    title: string
    url: string
    items?: TocEntry[] // 하위 목차가 있을 경우 배열로 들어옴
}

interface TOCProps {
    toc: TocEntry[]
}

export function TOC({ toc }: TOCProps) {
    const [activeId, setActiveId] = useState<string>("")

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            { rootMargin: "-80px 0px -80% 0px" }
        )

        const headingElements = document.querySelectorAll("article h1, article h2, article h3, article h4")
        headingElements.forEach((element) => observer.observe(element))

        return () => observer.disconnect()
    }, [])

    if (!toc || toc.length === 0) return null

    // 2. 중첩된 목차(items)를 재귀적으로 그려주는 함수
    const renderTocItems = (items: TocEntry[], depth = 1) => {
        return items.map((item, index) => {
            const isActive = activeId === item.url.slice(1)

            return (
                <div key={`${item.url}-${index}`} className="flex flex-col">
                    <Link
                        href={item.url}
                        className={cn(
                            "hover:text-primary transition-colors py-1.5 pr-4 block",
                            // depth 값에 따라 들여쓰기와 폰트 크기를 다르게 적용
                            depth === 1 && "font-medium text-foreground",
                            depth === 2 && "pl-4 text-sm",
                            depth >= 3 && "pl-8 text-xs",
                            isActive && "text-primary font-medium border-l-2 border-primary -ml-[1px]"
                        )}
                    >
                        {item.title}
                    </Link>
                    {/* 하위 목차가 존재하면 depth를 1 증가시켜서 자기 자신을 다시 호출 */}
                    {item.items && item.items.length > 0 && (
                        <div className="flex flex-col">
                            {renderTocItems(item.items, depth + 1)}
                        </div>
                    )}
                </div>
            )
        })
    }

    return (
        <div className="sticky top-24">
            <h4 className="font-semibold mb-4 text-sm flex items-center gap-2">
                On this page
            </h4>
            <div className="flex flex-col text-sm text-muted-foreground border-l border-border">
                {/* 최상위 목차부터 렌더링 시작 */}
                {renderTocItems(toc)}
            </div>
        </div>
    )
}