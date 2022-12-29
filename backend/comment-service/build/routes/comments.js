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
const express_1 = __importDefault(require("express"));
const comments_1 = require("../models/comments");
const mongoose_1 = require("mongoose");
const router = express_1.default.Router();
router.get('/:questionId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questionId = req.params.questionId;
        if (!(0, mongoose_1.isValidObjectId)(questionId)) {
            return res.status(400).json({ message: "Invalid questionId" });
        }
        const comments = yield (0, comments_1.getComments)(questionId);
        res.status(200).json(comments);
    }
    catch (error) {
    }
}));
router.post('/:questionId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.authorId || !req.body.content) {
        res.status(400).json({
            "message": "All fields required",
        });
        return;
    }
    const questionId = req.params.questionId;
    const authorId = req.body.authorId;
    const content = req.body.content;
    const comment = yield (0, comments_1.createComment)(questionId, authorId, content);
    res.status(200).json(comment);
}));
router.put('/:commentId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.authorId || !req.body.content) {
        return res.status(400).json({
            "message": "All fields required"
        });
    }
    const commentId = req.params.commentId;
    const authorId = req.body.authorId;
    const content = req.body.content;
    const comment = yield (0, comments_1.updateComment)(commentId, authorId, content);
    res.status(200).json(comment);
}));
router.delete('/:questionId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, comments_1.deleteAllComments)(req.params.questionId);
        res.sendStatus(204);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}));
router.delete('/:questionId/:commentId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedComment = yield (0, comments_1.deleteComment)(req.params.commentId);
        if (!deletedComment) {
            return res.sendStatus(404);
        }
        res.sendStatus(204);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}));
router.put('/:commentId/upvote', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.userId) {
            return res.status(400).json({
                message: "All fields required"
            });
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
            const currentVoteCount = yield (0, comments_1.upvote)(commentId, userId);
            res.status(200).json({ currentVoteCount: currentVoteCount });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}));
router.put('/:commentId/downvote', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.userId) {
            return res.status(400).json({ message: "User ID not found in request body" });
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
            const currentVoteCount = yield (0, comments_1.downvote)(commentId, userId);
            res.status(200).json({ currentVoteCount: currentVoteCount });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}));
module.exports = router;
