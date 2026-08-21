import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? 'http://localhost:3000'),
  title: '答卷之外｜申论与面试内容站',
  description: '一位申论与面试老师的长期内容站：素材积累、真题拆解、课堂切片与表达训练。',
  openGraph: {
    title: '答卷之外｜申论与面试内容站',
    description: '公考不是背标准答案。这里有素材积累、真题拆解、课堂切片与表达训练。',
    type: 'website',
    locale: 'zh_CN',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: '答卷之外：公考不是背标准答案' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '答卷之外｜申论与面试内容站',
    description: '公考不是背标准答案。这里有素材积累、真题拆解、课堂切片与表达训练。',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
