import { Header } from '@/components/shared/header/Header';
import { Lora, Work_Sans } from 'next/font/google'
import { Toaster } from 'sonner';
import './globals.css'
import '../css/style.css'
import { getTopics } from '@/actions/topics';
import TopLoader from '@/components/shared/other/Toploader';
import { Footer } from '@/components/shared/footer/footer';
import { getInfo } from '@/actions/info';
 
const font = Lora({
  subsets: ['latin'],
})

const work = Work_Sans({
  subsets: ['latin'],
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const topics = await getTopics(1)
  const info = await getInfo()

  return (
    <html lang="ru" className={font.className}>
      <body>
          <Toaster />
          <TopLoader />
          <Header info={info} topics={topics} className={work.className} />
          <main>
            {children}
          </main>
          <Footer info={info} topics={topics}/>
      </body>
    </html>
  );
}
