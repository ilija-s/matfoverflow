import commentModel from "../models/comments";
import { isValidObjectId } from "mongoose";

const controller : any = {};

controller.getComments = async function (req, res) {
    try {
        const questionId = req.params.questionId;

        if (!isValidObjectId(questionId)){
            return res.status(400).json({message: "Invalid questionId"});
        }

        const comments : Object[] = await commentModel._getComments(questionId);
        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal comment-service error"});
    }
}

controller.createComment = async function (req, res) {

    try {
        if(!req.body.authorId || !req.body.content) {
            return res.status(400).json({message : "Author ID and comment content are required in request body"});
        }
    
        const questionId = req.params.questionId;
        const authorId = req.body.authorId;

        if (!isValidObjectId(questionId)){
            return res.status(400).json({message: "Invalid question ID"});
        }

        if (!isValidObjectId(authorId)){
            return res.status(400).json({message: "Invalid author ID"});
        }

        const content : string = req.body.content;
        if (content.trim() == ""){
            return res.status(400).json({message: "Comment content can not be empty"});
        }

        const comment = await commentModel._createComment(questionId, authorId, content)
        res.status(200).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal comment-service error"});
    }
}

controller.updateComment = async function (req, res) {
    try {
        if(!req.body.authorId || !req.body.content) {
            return res.status(400).json({message : "Author ID and comment content are required in request body"});
        }
    
        const commentId = req.params.commentId;
        const authorId = req.body.authorId;
        const content = req.body.content;
    
        if (!isValidObjectId(commentId)){
            return res.status(400).json({message: "Invalid comment ID"});
        }
    
        if (!isValidObjectId(authorId)){
            return res.status(400).json({message: "Invalid author ID"});
        }
    
        if (content.trim() == ""){
            return res.status(400).json({message: "Comment content can not be empty"});
        }
    
        try {
            const comment = await commentModel._updateComment(commentId, authorId, content);
            res.status(200).json(comment);
        } catch (error) {
            res.status(error.statusCode).json({message: error.message});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal comment-service error"});
    }
}

controller.deleteComments = async function (req, res) {
    try {

        const questionId : string = req.params.questionId;
        if (!isValidObjectId(questionId)){
            return res.status(400).json({message: "Invalid comment ID"});
        }

        const result = await commentModel._deleteComments(questionId);
        res.status(200).json({"message": `${result.deletedCount} comment(s) successfully deleted`});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal comment-service error"});
    }
}

controller.deleteComment = async function (req, res) {
    try {
        const commentId : string = req.params.commentId;
        const deletedComment = await commentModel._deleteComment(commentId);

        if (!isValidObjectId(commentId)){
            return res.status(400).json({message: "Invalid comment ID"});
        }

        if(!deletedComment){
            return res.status(404).json({message: "Comment with this ID is not found"});
        }

        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal comment-service error"});
    }
}

controller.upvote = async function (req, res) {
    try {
        if(!req.body.userId) {
            return res.status(400).json({message: "User ID is required in request body"});
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
            const currentVoteCount : number = await commentModel._upvote(commentId, userId);
            res.status(200).json({currentVoteCount : currentVoteCount});
        } catch (error) {
            res.status(error.statusCode).json({message: error.message})
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal comment-service error"});
    }    
}

controller.downvote = async function (req, res) {
    try {

        if (!req.body.userId) {
            return res.status(400).json({ message: "User ID is required in request body" });
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
            const currentVoteCount : number = await commentModel._downvote(commentId, userId);
            res.status(200).json({currentVoteCount : currentVoteCount});
        } catch (error) {
            res.status(error.statusCode).json({message: error.message})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal comment-service error"});
    }
}

export = controller;