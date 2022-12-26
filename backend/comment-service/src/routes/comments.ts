const express = require('express');
const {getComments, createComment, updateComment} = require('../models/comments');

const router = express.Router();

router.get('/:questionId', async (req, res) => {

    const questionId = req.params.questionId;
    const comments = await getComments(questionId);
    res.status(200).json(comments);
});

router.post('/:questionId', async (req, res) => {

    if(!req.body.authorId || !req.body.content) {

        res.status(400).json({
            "message": "All fields required"
        });
       return;
    }

    const questionId = req.params.questionId;
    const authorId = req.body.authorId;
    const content = req.body.content;
    const comment = await createComment(questionId, authorId, content)

    res.status(200).json(comment);
});

router.put('/:commentId', async (req, res) => {

    if(!req.body.authorId || !req.body.content) {

        res.status(400).json({
            "message": "All fields required"
        });
       return;
    }

    const commentId = req.params.commentId;
    const authorId = req.body.authorId;
    const content = req.body.content;
    const comment = await updateComment(commentId, authorId, content)

    res.status(200).json(comment);
});

export = router;