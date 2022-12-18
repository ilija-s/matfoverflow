"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComment = exports.getComments = void 0;
const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        required: true,
        default: 0
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
    creationDate: mongoose.Schema.Types.Date,
    modifiedDate: mongoose.Schema.Types.Date
});
const commentModel = mongoose.model('Comments', commentSchema);
function getComments(questionId) {
    return __awaiter(this, void 0, void 0, function* () {
        let comments = yield commentModel.find({ questionId: mongoose.Types.ObjectId(questionId) });
        return comments;
    });
}
exports.getComments = getComments;
function createComment(questionId, authorId, content) {
    return __awaiter(this, void 0, void 0, function* () {
        const newComment = new commentModel();
        newComment._id = new mongoose.Types.ObjectId();
        newComment.questionId = questionId;
        newComment.authorId = authorId;
        newComment.content = content;
        const commentFromDB = yield newComment.save();
        return commentFromDB;
    });
}
exports.createComment = createComment;
;
