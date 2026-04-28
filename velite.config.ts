import { defineCollection, defineConfig, s } from 'velite'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'

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
        thumbnail: s.string().optional(), // 썸네일은 없을 수도 있음
        toc: s.toc(), // 목차
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
        rehypePlugins: [
            rehypeSlug,
            [
                rehypePrettyCode,
                {
                    // 원하는 VS Code 테마를 지정 ('github-dark', 'one-dark-pro', 'dracula', 'material-theme' 등)
                    theme: {
                        light: 'material-theme',
                        dark: 'github-dark',
                    },
                }
            ]
        ],
        remarkPlugins: [],
    },
})