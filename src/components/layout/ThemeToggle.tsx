"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    // SSR Hydration 에러를 방지하기 위한 mounted 상태
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <Button
            variant="outline"
            size="icon"
            // fixed, bottom, right 속성으로 우측 하단 고정 + 둥근 그림자 버튼
            className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg bg-background/80 backdrop-blur-sm border-border hover:scale-110 transition-transform duration-200"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
                <Moon className="h-5 w-5 text-slate-700" />
            )}
            <span className="sr-only">다크모드 토글</span>
        </Button>
    )
}