const { json } = require('body-parser');
const express = require('express')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.route')
const videoSynopsisRoutes = require('./routes/video.route')
const cors = require('cors');

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/video', videoSynopsisRoutes)

module.exports = app;