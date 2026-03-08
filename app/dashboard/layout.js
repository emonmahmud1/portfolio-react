import '../globals.css'

export const metadata = {
  title: 'Dashboard - Portfolio Admin',
  description: 'Manage your portfolio content',
}

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
