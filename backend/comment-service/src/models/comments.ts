const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    questionId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    authorId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    votes: {
        type : Number,
        required : true,
        default : 0
    },
    upvotes: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        default: []
    },
    downvotes: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        default: []
    },
    creationDate : mongoose.Schema.Types.Date,
    modifiedDate : mongoose.Schema.Types.Date
});

const commentModel = mongoose.model('Comments', commentSchema);

export async function getComments(questionId : String){
    let comments = await commentModel.find({questionId : mongoose.Types.ObjectId(questionId)});
    return comments;
}

export async function createComment(questionId : String, authorId : String, content : String) {
    const newComment = new commentModel();
    newComment._id = new mongoose.Types.ObjectId();
    newComment.questionId = questionId;
    newComment.authorId = authorId;
    newComment.content = content;

    const commentFromDB = await newComment.save();
    return commentFromDB;
};