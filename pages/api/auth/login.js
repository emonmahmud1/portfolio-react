import { verifyCredentials, generateToken } from '@/lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email, password } = req.body

    if (verifyCredentials(email, password)) {
      const token = generateToken({ email })
      
      res.setHeader('Set-Cookie', `auth-token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; ${process.env.NODE_ENV === 'production' ? 'SameSite=None; Secure;' : ''}`)
      
      return res.status(200).json({ success: true, message: 'Login successful! Welcome to the dashboard' })
    }

    return res.status(401).json({ error: 'Invalid email or password' })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ error: 'Internal server error: ' + error.message })
  }
}
