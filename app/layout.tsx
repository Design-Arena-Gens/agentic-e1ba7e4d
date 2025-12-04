import type { Metadata } from 'next';
import { Assistant } from 'next/font/google';
import './globals.css';

const assistant = Assistant({
  subsets: ['latin', 'hebrew'],
  weight: ['300', '400', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'אחוזים בחיי היום יום | Percentages in Daily Life',
  description:
    'למדו להבין ולחשב אחוזים בקלות דרך דוגמאות יומיומיות, מחשבונים אינטראקטיביים ותרשימים ויזואליים.',
  openGraph: {
    title: 'אחוזים בחיי היום יום | Percentages in Daily Life',
    description:
      'למדו להבין ולחשב אחוזים בקלות דרך דוגמאות יומיומיות, מחשבונים אינטראקטיביים ותרשימים ויזואליים.',
    url: 'https://agentic-e1ba7e4d.vercel.app',
    type: 'website',
  },
  alternates: {
    canonical: 'https://agentic-e1ba7e4d.vercel.app',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${assistant.className} layout-container`}>
        {children}
      </body>
    </html>
  );
}

