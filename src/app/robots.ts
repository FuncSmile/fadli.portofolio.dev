import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/', // Opsional: jika ada folder rahasia
        },
        // Pastikan URL ini sesuai dengan domain portofolio kamu
        sitemap: 'https://fadli-portofolio-dev.vercel.app/sitemap.xml',
    }
}