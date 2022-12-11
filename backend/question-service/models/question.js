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

module.exports.deleteQuestionById = async function (id) {
    await QuestionModel.deleteOne({ _id: id });
};

module.exports.updateVotes = async function (questionId, user, vote) {
    let question = await QuestionModel.findById(questionId).exec();
    const UPVOTE = "upvote";
    const DOWNVOTE = "downvote";

    const userAlreadyUpvoted = question.upvoters.filter(username => username === user).length > 0;
    const userAlreadyDownvoted = question.downvoters.filter(username => username === user).length > 0;

    switch (vote) {
        case UPVOTE:
            if (userAlreadyDownvoted) {
                await QuestionModel.updateOne(
                    { _id: questionId }, 
                    { $inc: { votes: 2}, $push: { upvoters: user }, $pull: { downvoters: user } }).exec();
            } else if (!(userAlreadyUpvoted || userAlreadyDownvoted)) {
                await QuestionModel.updateOne(
                    { _id: questionId }, 
                    { $inc: { votes: 1}, $push: { upvoters: user } }).exec();
            } else {
                await QuestionModel.updateOne(
                    { _id: questionId }, 
                    { $inc: { votes: -1}, $pull: { upvoters: user } }).exec();
            }
            return true;
        case DOWNVOTE:
            if (userAlreadyUpvoted) {
                await QuestionModel.updateOne(
                    { _id: questionId }, 
                    { $inc: { votes: -2}, $push: { downvoters: user }, $pull: { upvoters: user } }).exec();
            } else if (!(userAlreadyUpvoted || userAlreadyDownvoted)) {
                await QuestionModel.updateOne(
                    { _id: questionId }, 
                    { $inc: { votes: -1}, $push: { downvoters: user } }).exec();
            } else {
                await QuestionModel.updateOne(
                    { _id: questionId }, 
                    { $inc: { votes: 1}, $pull: { downvoters: user } }).exec();
            }
            return true;
        default:
            return false;
    }
};
