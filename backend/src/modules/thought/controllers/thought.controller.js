import Thought from "../models/thought.model.js";

export const getThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find().sort({ createdAt: -1 }).limit(20)
        res.status(200).json({ success: true, data: thoughts })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const createThought = async (req, res) => {
    try {
        const { name, text, stars, avatar } = req.body

        if (!text || !stars) {
            return res.status(400).json({ success: false, message: 'Text and stars are required' })
        }

        const thought = await Thought.create({
            name: name?.trim() || 'Anonymous',
            text: text.trim(),
            stars,
            avatar: avatar || 'default',
        })

        res.status(201).json({ success: true, data: thought })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}