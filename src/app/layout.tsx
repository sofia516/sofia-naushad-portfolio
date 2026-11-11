import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title: 'Sofia Naushad — Python Developer',
 description: 'Portfolio of Sofia Naushad: Python developer working across backend engineering, full-stack applications and generative AI.',
 openGraph: {title:'Sofia Naushad — Python Developer',description:'Backend · Full-Stack · Generative AI',images:['/og.jpg'],type:'website'},
 icons:{icon:'/favicon.svg'}
};
export const viewport: Viewport = {themeColor:'#f4f2ee',width:'device-width',initialScale:1};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
