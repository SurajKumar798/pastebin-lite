const express = require('express');
const { nanoid } = require("nanoid");
const Paste = require("../models/Paste");

const router = express.Router();

router.post('/', async(req, res)=>{
    try{
        const { content, ttl_seconds, max_views } = req.body;
        if(!content || content.trim() === ""){
            return res.status(400).json({error: 'content required'});
        }
        let expiresAt = null;
        if(ttl_seconds){
            expiresAt = new Date(Date.now() + ttl_seconds * 1000);
        }
        const paste = await Paste.create({
            content,
            expiresAt,
            maxViews: max_views || null
        });
        res.status(201).json({
            id: paste._id,
            url: `${process.env.BASE_URL}/api/pastes/${paste._id}`
        });
    }catch(err){
        res.status(500).json({ error: "server error" });
    }
});

router.get("/:id", async(req, res)=>{
    try{
        const paste = await Paste.findById(req.params.id);
        if(!paste) return res.status(404).json({ error: "Not found" });

        if(paste.expiresAt && new Date() > paste.expiresAt){
            return res.status(404).json({ error: "expired" });
        }
        if(paste.maxViews && paste.views >= paste.maxViews){
            return res.status(404).json({ error: "view limit exceeded" });
        }
        paste.views += 1;
        await paste.save();

        res.json({
            content: paste.content,
            remaining_views: paste.maxViews
             ? paste.maxViews - paste.views
             : null,
             expires_at: paste.expiresAt
        });
    }catch(err){
        res.status(404).json({ error: "invalid id" });
    }
});

module.exports = router;