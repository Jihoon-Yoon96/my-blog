import Link from "next/link"
import { Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

// Velite 타입 정의가 있다면 여기서 import Post 해서 props 타입을 지정하면 베스트
interface PostCardProps {
    post: any // 일단 any로 두고 나중에 Velite 타입으로 교체
}

export function PostCard({ post }: PostCardProps) {
    return (
        <Link href={`/posts/${post.id}`} className="block h-full">
            <Card className="group flex flex-col h-full overflow-hidden border border-border/50 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                <div className={`h-40 w-full ${post.thumbnailColor} relative overflow-hidden`}>
                    {post.series && (
                        <Badge variant="secondary" className="absolute top-3 left-3 bg-black/50 text-white hover:bg-black/70 border-none backdrop-blur-sm">
                            SERIES : {post.series}
                        </Badge>
                    )}
                </div>

                <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground flex items-center">
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