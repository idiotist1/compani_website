const mongoose = require("monggose");

const postSchema = new mongoose.Schema(
    {
        number: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
        },
        fileUrl: {
            type: [String],
            trim: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        viewLogs: [{
            ip: String,
            userAgent: String,
            timestamp: {
                type: Date,
                default: Date.now,
            }
        }],
        createAt: {
            type: Date,
            default: Date.now,
        },
        updateAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;