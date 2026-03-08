import { verifyCredentials, generateToken } from '@/lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email, password } = req.body

    if (verifyCredentials(email, password)) {
      const token = generateToken({ email })
      
      res.setHeader('Set-Cookie', `auth-token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''}`)
      
      return res.status(200).json({ success: true })
    }

    return res.status(401).json({ error: 'Invalid credentials' })
  } catch (error) {
    return res.status(500).json({ error: 'Login failed' })
  }
}
