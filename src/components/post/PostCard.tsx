import Link from "next/link"
import { Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Post } from "#site/content" // Velite가 생성한 타입 가져오기

interface PostCardProps {
    post: Post // any 대신 진짜 타입 사용
}

export function PostCard({ post }: PostCardProps) {
    console.log(post)
    return (
        <Link href={post.permalink} className="block h-full">
            <Card className="group flex flex-col h-full overflow-hidden border border-border/50 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer">

                {/* 2. 썸네일 영역 (Velite 데이터에 색상이 없으므로 임시로 처리하거나 스키마에 추가 필요) */}
                <div className="h-40 w-full bg-gradient-to-br from-violet-500 to-purple-900 relative overflow-hidden">
                    {post.series && (
                        <Badge variant="secondary" className="absolute top-3 left-3 bg-black/50 text-white hover:bg-black/70 border-none backdrop-blur-sm">
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