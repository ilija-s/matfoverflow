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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._downvote = exports._upvote = exports._deleteComment = exports._deleteComments = exports._updateComment = exports._createComment = exports._getComments = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    questionId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true
    },
    authorId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
        type: [mongoose_1.default.Schema.Types.ObjectId],
        required: true,
        default: []
    },
    downvotes: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        required: true,
        default: []
    }
}, { timestamps: true });
const commentModel = mongoose_1.default.model('Comments', commentSchema);
class MyError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}
function _getComments(questionId) {
    return __awaiter(this, void 0, void 0, function* () {
        let comments = yield commentModel.find({ questionId: questionId });
        return comments;
    });
}
exports._getComments = _getComments;
function _createComment(questionId, authorId, content) {
    return __awaiter(this, void 0, void 0, function* () {
        const newComment = new commentModel();
        newComment._id = new mongoose_1.default.Types.ObjectId();
        newComment.questionId = new mongoose_1.default.Types.ObjectId(questionId);
        newComment.authorId = new mongoose_1.default.Types.ObjectId(authorId);
        newComment.content = content;
        const commentFromDB = yield newComment.save({ timestamps: true });
        return commentFromDB;
    });
}
exports._createComment = _createComment;
;
function _updateComment(commentId, authorId, content) {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = yield commentModel.findById(commentId);
        if (!comment) {
            throw new MyError(404, `Comment with ID ${commentId} is not found`);
        }
        comment.content = content;
        const commentFromDB = comment.save();
        return commentFromDB;
    });
}
exports._updateComment = _updateComment;
;
function _deleteComments(questionId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield commentModel.deleteMany({ questionId: questionId });
    });
}
exports._deleteComments = _deleteComments;
function _deleteComment(commentId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield commentModel.findByIdAndDelete({ _id: commentId });
    });
}
exports._deleteComment = _deleteComment;
;
function _upvote(commentId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = yield commentModel.findById(commentId);
        if (!comment) {
            throw new MyError(404, `Comment with ID ${commentId} is not found`);
        }
        const userObjId = new mongoose_1.default.Types.ObjectId(userId);
        let upvotes = 0;
        let index = comment.upvotes.indexOf(userObjId);
        if (index == -1) {
            comment.upvotes.push(userObjId);
            upvotes++;
        }
        else {
            throw new MyError(400, "This user has already upvoted");
        }
        index = comment.downvotes.indexOf(userObjId);
        if (index != -1) {
            // User has previously downvoted
            comment.downvotes.splice(index, 1);
            upvotes++;
        }
        comment.votes += upvotes;
        const commentFromDB = yield comment.save({ timestamps: true });
        return commentFromDB.votes;
    });
}
exports._upvote = _upvote;
;
function _downvote(commentId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = yield commentModel.findById(commentId);
        if (!comment) {
            throw new MyError(404, `Comment with ID ${commentId} is not found`);
        }
        const userObjId = new mongoose_1.default.Types.ObjectId(userId);
        let downvotes = 0;
        let index = comment.downvotes.indexOf(userObjId);
        if (index == -1) {
            comment.downvotes.push(userObjId);
            downvotes++;
        }
        else {
            throw new MyError(400, "This user has already downvoted");
        }
        index = comment.upvotes.indexOf(userObjId);
        if (index != -1) {
            // User has previously upvoted
            comment.upvotes.splice(index, 1);
            downvotes++;
        }
        comment.votes -= downvotes;
        const commentFromDB = yield comment.save({ timestamps: true });
        return commentFromDB.votes;
    });
}
exports._downvote = _downvote;
;
