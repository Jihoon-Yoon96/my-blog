import { defineCollection, defineConfig, s } from 'velite'

// 블로그 글 스키마 정의
const posts = defineCollection({
    name: 'Post',
    pattern: 'posts/**/*.mdx', // content/posts 폴더 안의 mdx 파일을 찾음
    schema: s.object({
        slug: s.path(), // 파일 경로가 URL이 됨
        title: s.string().max(99),
        date: s.string(),
        description: s.string(),
        tags: s.array(s.string()),
        series: s.string().optional(), // 시리즈는 없을 수도 있음
        content: s.mdx(), // 본문 MDX
    }).transform(data => ({
        ...data,
        permalink: `/${data.slug}`,
    }))
})

// 설정 내보내기
export default defineConfig({
    root: 'content', // 이 폴더 안에 있는 파일들을 읽음
    output: {
        data: '.velite',
        assets: 'public/static',
        base: '/static/',
        name: '[name]-[hash:6].[ext]',
        clean: true,
    },
    collections: { posts },
    mdx: {
        rehypePlugins: [], // 나중에 코드 하이라이팅 플러그인 추가 예정
        remarkPlugins: [],
    },
})