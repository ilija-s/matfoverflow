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
        type: Number,
		default: 0
    },
    answers: {
        type: Number,
		default: 0
    },
    views: {
        type: Number,
		default: 0
    },
    tags: {
		type: [String],
		required: true,
		default: []
	},
    upvoters: {
		type: [String],
		default: []
	},
    downvoters: {
		type: [String],
		default: []
	}
}, { collection: "questions", timestamps: true });

const QuestionModel = mongoose.model('Question', questionSchema);

module.exports.model = QuestionModel

module.exports.getQuestionById = async function (questionId) {
    let question = await QuestionModel.findById(questionId).exec();
    return question;
};

module.exports.getQuestionsByTag = async function (questionTag) {
    let questions = await QuestionModel.find({tags: questionTag}).exec();
    return questions;
};

module.exports.getAllQuestions = async function () {
    let question = await QuestionModel.find().exec();
    return question;
};

module.exports.addNewQuestion = async function (question) {
	const { title, description, author, tags } = question;
	const newQuestion = new QuestionModel();
	newQuestion._id = new mongoose.Types.ObjectId();
	newQuestion.title = title;
	newQuestion.description = description;
	newQuestion.author = author;
	newQuestion.tags = tags;

	const savedQuestion = await newQuestion.save();

    return savedQuestion;
};
