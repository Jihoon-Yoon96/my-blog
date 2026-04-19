import Link from "next/link"
import Image from "next/image"
import { Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Post } from "#site/content" // Velite가 생성한 타입 가져오기

interface PostCardProps {
    post: Post // any 대신 진짜 타입 사용
}

export function PostCard({ post }: PostCardProps) {
    // console.log(post)
    return (
        <Link href={post.permalink} className="block h-full">
            <Card className="group flex flex-col h-full overflow-hidden border border-border/50 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer">

                {/* 썸네일 영역 */}
                <div className="relative h-40 w-full overflow-hidden bg-muted">
                    {post.thumbnail ? (
                        // 썸네일이 있을 때: Next.js Image 사용
                        <Image
                            src={post.thumbnail}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        // 썸네일이 없을 때: 기본 그라데이션 배경
                        <div className="h-full w-full bg-gradient-to-br from-violet-500 to-purple-900" />
                    )}

                    {/* 시리즈 뱃지 (이미지 위에 겹쳐서 표시) */}
                    {post.series && (
                        <Badge variant="secondary" className="absolute top-3 left-3 bg-black/50 text-white hover:bg-black/70 border-none backdrop-blur-sm z-10">
                            SERIES : {post.series}
                        </Badge>
                    )}
                </div>

                <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground flex items-center">
                          {/* 3. 날짜 데이터 연결 */}
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
}