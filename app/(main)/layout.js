import { Inter } from 'next/font/google'
import '../globals.css'
import Navigation from './_components/Navigation'
import Footer from './_components/Footer'
import ScrollToTop from './_components/ScrollToTop'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Emon Mahmud - Full-Stack Developer & SQA Engineer',
  description: 'Building modern web applications with clean code and ensuring quality through comprehensive testing.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  )
}
