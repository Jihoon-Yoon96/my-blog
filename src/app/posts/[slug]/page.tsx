import { notFound } from "next/navigation"
import Link from "next/link"
import { posts } from "#site/content" // Velite 데이터
import { ArrowLeft, Calendar, Clock, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import * as runtime from "react/jsx-runtime" // MDX 실행용
import { TOC } from "@/components/post/TOC"
import { Giscus } from "@/components/post/Giscus"

// --- 1. MDX 렌더링 헬퍼 ---
const useMDXComponent = (code: string) => {
    const fn = new Function(code)
    return fn({ ...runtime }).default
}

// --- 2. 타입 정의 ---
interface PostPageProps {
    params: Promise<{ slug: string }>
}

// --- 3. 정적 경로 생성 (SSG) ---
export async function generateStaticParams() {
    return posts.map((post) => ({
        slug: post.slug.split("/")[1], // "posts/hello-world" -> "hello-world"
    }))
}

// --- 4. 동적 메타데이터 (SEO) ---
export async function generateMetadata(props: PostPageProps) {
    const params = await props.params;
    const post = posts.find((p) => p.slug === `posts/${params.slug}`)
    if (!post) return {}

    return {
        title: post.title,
        description: post.description,
    }
}

// --- 5. 컴포넌트 본문 ---
export default async function PostDetail(props: PostPageProps) {
    const params = await props.params;
    // slug로 해당 글 찾기 (예: "hello-world" -> "posts/hello-world")
    const post = posts.find((p) => p.slug === `posts/${params.slug}`)

    // 글이 없으면 404 페이지로
    if (!post) {
        notFound()
    }

    // 시리즈 글 찾기 로직
    // 현재 글과 같은 시리즈를 가진 글들을 찾아 날짜 오름차순(과거->최신 1편,2편...)으로 정렬
    const seriesPosts = post.series
        ? posts
            .filter((p) => p.series === post.series)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        : []

    // MDX 컴포넌트 변환
    const MDXContent = useMDXComponent(post.content)

    return (
        <div className="min-h-screen bg-background font-sans">
            {/* 헤더는 layout.tsx에 있으므로 제거 */}

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
                            {/* 시리즈 카드 (시리즈 데이터가 있을 경우) */}
                            {post.series && seriesPosts.length > 0 && (
                                <details className="group mb-6 rounded-xl border border-primary/20 bg-muted/30 overflow-hidden open:bg-muted/30">
                                    <summary className="p-4 flex cursor-pointer list-none flex-col sm:flex-row justify-between items-start sm:items-center gap-4 outline-none hover:bg-muted/50 transition-colors [&::-webkit-details-marker]:hidden">
                                        <div className="space-y-1">
                                            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Series</span>
                                            <div className="font-medium flex items-center gap-2">
                                                <FolderIcon className="w-4 h-4 text-muted-foreground" />
                                                {post.series}
                                            </div>
                                        </div>
                                        {/* 목록 보기 버튼 UI (상태에 따라 텍스트 변경) */}
                                        <div className="w-full sm:w-auto text-xs h-8 inline-flex items-center justify-center rounded-md border border-input bg-background px-3 font-medium shadow-sm transition-colors group-open:bg-accent group-open:text-accent-foreground">
                                            <span className="group-open:hidden">목록 보기</span>
                                            <span className="hidden group-open:inline">목록 닫기</span>
                                        </div>
                                    </summary>

                                    {/* 접혀있던 목록 내용 */}
                                    <div className="border-t border-border/50 px-4 py-4 bg-background/50">
                                        <p className="text-xs font-medium text-muted-foreground mb-3">
                                            이 시리즈의 전체 글 ({seriesPosts.length}개)
                                        </p>
                                        <ul className="flex flex-col gap-2.5">
                                            {seriesPosts.map((sp, index) => {
                                                // 현재 보고 있는 글인지 확인
                                                const isActive = sp.slug === post.slug
                                                return (
                                                    <li key={sp.slug} className="text-sm flex items-start gap-2">
                                                        <span className="text-muted-foreground min-w-[20px] text-right mt-0.5">{index + 1}.</span>
                                                        {isActive ? (
                                                            // 현재 읽고 있는 글은 하이라이트 + 클릭 불가
                                                            <span className="text-primary font-medium">{sp.title}</span>
                                                        ) : (
                                                            // 다른 시리즈 글은 링크 연결
                                                            <Link href={sp.permalink} className="text-muted-foreground hover:text-foreground transition-colors hover:underline">
                                                                {sp.title}
                                                            </Link>
                                                        )}
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </details>
                            )}

                            <div className="flex gap-2 mb-4">
                                {post.tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="hover:bg-secondary/80">
                                        # {tag}
                                    </Badge>
                                ))}
                            </div>

                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-foreground">
                                {post.title}
                            </h1>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground border-b border-border pb-8">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" /> {post.date}
                                </div>
                                {/*<div className="flex items-center gap-1">*/}
                                {/*    /!* readingTime은 현재 스키마에 없으므로 임시 값 *!/*/}
                                {/*    <Clock className="w-4 h-4" /> 5 min read*/}
                                {/*</div>*/}
                            </div>
                        </div>

                        {/* ✨ 실제 MDX 본문 렌더링 ✨ */}
                        <MDXContent />

                        {/* 하단: 댓글 (Giscus Placeholder) */}
                        <div className="mt-16 pt-8 border-t border-border not-prose">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <MessageSquare className="w-6 h-6" /> Comments
                            </h3>
                            {/* 여기에 Giscus 부착! */}
                            <Giscus />
                        </div>
                    </article>

                    {/* 우측 사이드바 (TOC) - PC에서만 보임 */}
                    <aside className="hidden lg:block w-[240px] shrink-0">
                        <TOC toc={post.toc} />
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