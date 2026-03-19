import '../globals.css'
import { Toaster } from 'sonner'

export const metadata = {
  title: 'Dashboard - Portfolio Admin',
  description: 'Manage your portfolio content',
}

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
