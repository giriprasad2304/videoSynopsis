const jwt = require('jsonwebtoken')

async function authVaildUSer(req, res, next) {
    // Try cookie first, then Authorization header
    const cookieToken = req.cookies && req.cookies.JWTToken
    const header = req.header('Authorization')
    const bearerToken = header && header.startsWith('Bearer ') ? header.slice(7) : null
    const token = cookieToken || bearerToken

    if (!token) return res.status(401).json({ message: 'Unauthorized !' })

    let decoded
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized !', error: err.message })
    }

    if (decoded.role !== 'user')
        return res.status(403).json({ message: 'Forbidden' })

    req.user = decoded
    next()
}

module.exports = { authVaildUSer }