import { Router } from "express";
import express from "express";
import {loadComments, saveComment, updateComment, deleteAllComments, deleteComment, updateUpvotes, updateDownvotes} from "../models/comments";
import { isValidObjectId } from "mongoose";

export async function getComments(req, res) {
    try {
        const questionId = req.params.questionId;

        if (!isValidObjectId(questionId)){
            return res.status(400).json({message: "Invalid questionId"});
        }

        const comments = await loadComments(questionId);
        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function createComment(req, res) {

    if(!req.body.authorId || !req.body.content) {
    
        res.status(400).json({
            message : "All fields required"
        });
       return;
    }

    const questionId = req.params.questionId;
    const authorId = req.body.authorId;
    const content = req.body.content;
    const comment = await saveComment(questionId, authorId, content)

    res.status(200).json(comment);
}

export async function editComment (req, res) {

    if(!req.body.authorId || !req.body.content) {

        return res.status(400).json({
            "message": "All fields required"
        });
    }

    const commentId = req.params.commentId;
    const authorId = req.body.authorId;
    const content = req.body.content;
    const comment = await updateComment(commentId, authorId, content)

    res.status(200).json(comment);
}

export async function removeAllComments(req, res) {
    try {
        await deleteAllComments(req.params.questionId);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function removeComment(req, res) {
    try {
        const deletedComment = await deleteComment(req.params.commentId);

        if(!deletedComment){
            return res.sendStatus(404);
        }

        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function upvote(req, res) {
    try {
        if(!req.body.userId) {

            return res.status(400).json({
                message: "All fields required"
            });
        }

        const commentId : string = req.params.commentId;
        const userId : string = req.body.userId;

        if(!isValidObjectId(commentId)){
            return res.status(400).json({message: "Invalid comment ID"})
        }

        if(!isValidObjectId(userId)){
            return res.status(400).json({message: "Invalid user ID"})
        }

        try {
            const currentVoteCount : number = await updateUpvotes(commentId, userId);
            res.status(200).json({currentVoteCount : currentVoteCount});
        } catch (error) {
            res.status(400).json({message: error.message})
        }

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }    
}

export async function downvote(req, res) {
    try {

        if (!req.body.userId) {
            return res.status(400).json({ message: "User ID not found in request body" });
        }

        const commentId : string = req.params.commentId;
        const userId : string = req.body.userId;

        if(!isValidObjectId(commentId)){
            return res.status(400).json({message: "Invalid comment ID"});
        }

        if(!isValidObjectId(userId)){
            return res.status(400).json({message: "Invalid user ID"});
        }

        try {
            const currentVoteCount : number = await updateDownvotes(commentId, userId);
            res.status(200).json({currentVoteCount : currentVoteCount});
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}