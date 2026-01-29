const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
 const pasteSchema = new mongoose.Schema({
    pasteId: {
        type: String,
        default:()=> nanoid(10),
        unique: true,
        index: true
    },
    content: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        default: null
    },
    maxViews: {
        type: Number,
        default: null
    },
    views: {
        type: Number,
        default: 0
    }
 }, {timestamps: true});

 module.exports = mongoose.model("pastes", pasteSchema);
