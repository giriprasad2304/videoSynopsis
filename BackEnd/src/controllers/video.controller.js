const videoModel = require('../models/video.model')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

async function video(req , res) {
    //console.log(`[GET /history] Fetching all video history records`);
    const video = await videoModel.find()
    //console.log(`[GET /history] Found ${video.length} history records`);

    res.status(201).json({
        message : "Videos Fetched Successfully !!",
        video
    })
}


module.exports = {video}