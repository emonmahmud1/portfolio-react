import jwt from 'jsonwebtoken'

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    return null
  }
}

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })
}

export const verifyCredentials = (email, password) => {
  return email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD
}
