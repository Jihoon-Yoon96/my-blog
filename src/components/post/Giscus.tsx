// src/components/post/Giscus.tsx
// <script src="https://giscus.app/client.js"
//         data-repo="jihoon-yoon96/my-blog"
//         data-repo-id="R_kgDOQ2nEvQ"
//         data-category="Blog-Comments"
//         data-category-id="DIC_kwDOQ2nEvc4C76Hc"
//         data-mapping="pathname"
//         data-strict="0"
//         data-reactions-enabled="1"
//         data-emit-metadata="0"
//         data-input-position="top"
//         data-theme="preferred_color_scheme"
//         data-lang="ko"
//         crossorigin="anonymous"
//         async>
// </script>
"use client"

import {useEffect, useState} from "react"
import {useTheme} from "next-themes"
import GiscusComponent from "@giscus/react"

export function Giscus() {
    const {resolvedTheme} = useTheme()
    const [mounted, setMounted] = useState(false)

    // SSR Hydration 에러 방지
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    // next-themes의 resolvedTheme을 사용하여 시스템 테마 설정까지 완벽히 감지합니다.
    const giscusTheme = resolvedTheme === "dark" ? "noborder_dark" : "light"

    return (
        <div className="mt-10">
            <GiscusComponent
                id="comments"
                repo="jihoon-yoon96/my-blog" // 👈 본인의 GitHub 저장소 이름으로 변경하세요
                repoId="R_kgDOQ2nEvQ"        // 👈 Giscus 사이트에서 얻은 repo-id 입력
                category="Blog-Comments"          // 👈 생성한 Discussions 카테고리 이름 (예: General)
                categoryId="DIC_kwDOQ2nEvc4C76Hc"// 👈 Giscus 사이트에서 얻은 category-id 입력
                mapping="pathname"           // 글의 URL을 기준으로 토론 스레드 생성
                strict="0"
                reactionsEnabled="1"         // 반응(좋아요 등) 활성화
                emitMetadata="0"
                inputPosition="top"       // 입력창 위치 (top 또는 bottom)
                theme={giscusTheme}          // 다크모드/라이트모드 자동 연동
                lang="ko"                    // 한국어 설정
                // loading="lazy"
            />
        </div>
    )
}