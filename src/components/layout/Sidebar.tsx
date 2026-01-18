"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Folder } from "lucide-react"
import { cn } from "@/lib/utils" // 스타일 병합용 유틸

// 임시 데이터 (나중에 Props로 받거나 Store에서 가져옴)
const CATEGORIES = [
    { id: "all", name: "전체 보기", count: 12 },
    { id: "dev", name: "아직", count: 5 },
    { id: "nextjs", name: "사이드바는", count: 3 },
    { id: "react", name: "개발안됨", count: 4 },
]

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
    return (
        <div className={cn("pb-12", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Category
                    </h2>
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
                </div>
            </div>
        </div>
    )
}