const express = require('express');
const {getComments, createComment} = require('../models/comments');

const router = express.Router();

router.get('/:questionId', async (req, res) => {
    const questionId = req.params.questionId;
    const comments = await getComments(questionId);
    res.status(200).json(comments);
});

router.post('/:questionId', async (req, res) => {
    const questionId = req.params.questionId;
    const authorId = req.body.authorId;
    const content = req.body.content;
    const comment = await createComment(questionId, authorId, content)

    res.status(200).json(comment);
});

module.exports = router;