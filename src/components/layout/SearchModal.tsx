// src/components/layout/SearchModal.tsx
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useSearchStore } from "@/lib/store"
import { posts } from "#site/content" // Velite가 생성한 데이터 (tsconfig paths 설정 필요)
import Fuse from "fuse.js"
import { File, Calendar } from "lucide-react"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"

export function SearchModal() {
    const router = useRouter()
    const { isOpen, onClose, toggle } = useSearchStore()

    // 1. Fuse.js 설정 (제목, 설명, 태그로 검색)
    const fuse = React.useMemo(() => {
        return new Fuse(posts, {
            keys: ['title', 'description', 'tags'],
            threshold: 0.3, // 정확도 (0에 가까울수록 엄격함)
        })
    }, [])

    const [query, setQuery] = React.useState("")

    // 2. 검색 결과 필터링
    const results = React.useMemo(() => {
        if (!query) return posts.slice(0, 5) // 검색어 없으면 최신글 5개 노출
        return fuse.search(query).map(result => result.item)
    }, [query, fuse])

    // 3. 단축키 설정 (Cmd+K / Ctrl+K)
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                toggle()
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [toggle])

    // 4. 페이지 이동 함수
    const runCommand = React.useCallback((command: () => unknown) => {
        onClose()
        command()
    }, [onClose])

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput placeholder="검색어를 입력하세요... (제목, 내용, 태그)" value={query} onValueChange={setQuery} />
            <CommandList>
                <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                <CommandGroup heading={query ? "Search Results" : "Recent Posts"}>
                    {results.map((post) => (
                        <CommandItem
                            key={post.slug}
                            value={post.title}
                            onSelect={() => {
                                runCommand(() => router.push(post.permalink))
                            }}
                            className="cursor-pointer"
                        >
                            <File className="mr-2 h-4 w-4 text-muted-foreground" />
                            <div className="flex flex-col">
                                <span className="font-medium">{post.title}</span>
                                <span className="text-xs text-muted-foreground line-clamp-1">{post.description}</span>
                            </div>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}