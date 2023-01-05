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
exports.downvote = exports.upvote = exports.deleteComment = exports.deleteComments = exports.updateComment = exports.createComment = exports.getComments = void 0;
const comments_1 = require("../models/comments");
const mongoose_1 = require("mongoose");
function getComments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const questionId = req.params.questionId;
            if (!(0, mongoose_1.isValidObjectId)(questionId)) {
                return res.status(400).json({ message: "Invalid questionId" });
            }
            const comments = yield (0, comments_1._getComments)(questionId);
            if (comments.length == 0) {
                return res.status(404).json({ message: "Question with given ID not found, or it has no comments" });
            }
            res.status(200).json(comments);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal comment-service error" });
        }
    });
}
exports.getComments = getComments;
function createComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body.authorId || !req.body.content) {
                return res.status(400).json({ message: "Author ID and comment content are required in request body" });
            }
            const questionId = req.params.questionId;
            const authorId = req.body.authorId;
            if (!(0, mongoose_1.isValidObjectId)(questionId)) {
                return res.status(400).json({ message: "Invalid question ID" });
            }
            if (!(0, mongoose_1.isValidObjectId)(authorId)) {
                return res.status(400).json({ message: "Invalid author ID" });
            }
            const content = req.body.content;
            if (content.trim() == "") {
                return res.status(400).json({ message: "Comment content can not be empty" });
            }
            const comment = yield (0, comments_1._createComment)(questionId, authorId, content);
            res.status(200).json(comment);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal comment-service error" });
        }
    });
}
exports.createComment = createComment;
function updateComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body.authorId || !req.body.content) {
                return res.status(400).json({ message: "Author ID and comment content are required in request body" });
            }
            const commentId = req.params.commentId;
            const authorId = req.body.authorId;
            const content = req.body.content;
            if (!(0, mongoose_1.isValidObjectId)(commentId)) {
                return res.status(400).json({ message: "Invalid comment ID" });
            }
            if (!(0, mongoose_1.isValidObjectId)(authorId)) {
                return res.status(400).json({ message: "Invalid author ID" });
            }
            if (content.trim() == "") {
                return res.status(400).json({ message: "Comment content can not be empty" });
            }
            try {
                const comment = yield (0, comments_1._updateComment)(commentId, authorId, content);
                res.status(200).json(comment);
            }
            catch (error) {
                res.status(error.statusCode).json({ message: error.message });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal comment-service error" });
        }
    });
}
exports.updateComment = updateComment;
function deleteComments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const questionId = req.params.questionId;
            if (!(0, mongoose_1.isValidObjectId)(questionId)) {
                return res.status(400).json({ message: "Invalid comment ID" });
            }
            const result = yield (0, comments_1._deleteComments)(questionId);
            res.status(200).json({ "message": `${result.deletedCount} comment(s) successfully deleted` });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal comment-service error" });
        }
    });
}
exports.deleteComments = deleteComments;
function deleteComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const commentId = req.params.commentId;
            const deletedComment = yield (0, comments_1._deleteComment)(commentId);
            if (!(0, mongoose_1.isValidObjectId)(commentId)) {
                return res.status(400).json({ message: "Invalid comment ID" });
            }
            if (!deletedComment) {
                return res.status(404).json({ message: "Comment with this ID is not found" });
            }
            res.sendStatus(204);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal comment-service error" });
        }
    });
}
exports.deleteComment = deleteComment;
function upvote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body.userId) {
                return res.status(400).json({ message: "User ID is required in request body" });
            }
            const commentId = req.params.commentId;
            const userId = req.body.userId;
            if (!(0, mongoose_1.isValidObjectId)(commentId)) {
                return res.status(400).json({ message: "Invalid comment ID" });
            }
            if (!(0, mongoose_1.isValidObjectId)(userId)) {
                return res.status(400).json({ message: "Invalid user ID" });
            }
            try {
                const currentVoteCount = yield (0, comments_1._upvote)(commentId, userId);
                res.status(200).json({ currentVoteCount: currentVoteCount });
            }
            catch (error) {
                res.status(error.statusCode).json({ message: error.message });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal comment-service error" });
        }
    });
}
exports.upvote = upvote;
function downvote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body.userId) {
                return res.status(400).json({ message: "User ID is required in request body" });
            }
            const commentId = req.params.commentId;
            const userId = req.body.userId;
            if (!(0, mongoose_1.isValidObjectId)(commentId)) {
                return res.status(400).json({ message: "Invalid comment ID" });
            }
            if (!(0, mongoose_1.isValidObjectId)(userId)) {
                return res.status(400).json({ message: "Invalid user ID" });
            }
            try {
                const currentVoteCount = yield (0, comments_1._downvote)(commentId, userId);
                res.status(200).json({ currentVoteCount: currentVoteCount });
            }
            catch (error) {
                res.status(error.statusCode).json({ message: error.message });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal comment-service error" });
        }
    });
}
exports.downvote = downvote;
