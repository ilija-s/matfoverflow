const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true  
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true  
    },
    votes: {
        type: BigInt,
		default: 0
    },
    answers: {
        type: Number,
		default: 0
    },
    views: {
        type: BigInt,
		default: 0
    },
    tags: {
		type: [String],
		required: true,
		default: []
	},
}, { collection: "questions", timestamps: true });

const QuestionModel = mongoose.model('Question', questionSchema);

module.exports.model = QuestionModel