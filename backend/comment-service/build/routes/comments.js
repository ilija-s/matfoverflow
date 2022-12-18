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
const express = require('express');
const { getComments, createComment } = require('../models/comments');
const router = express.Router();
router.get('/:questionId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const questionId = req.params.questionId;
    const comments = yield getComments(questionId);
    res.status(200).json(comments);
}));
router.post('/:questionId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const questionId = req.params.questionId;
    const authorId = req.body.authorId;
    const content = req.body.content;
    const comment = yield createComment(questionId, authorId, content);
    res.status(200).json(comment);
}));
module.exports = router;
