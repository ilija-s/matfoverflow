const express = require("express");
const mongoose = require("mongoose");

const questionsRoute = express.Router();

const QuestionModel = require("../models/question");

questionsRoute.get("/", async (req, res) => {
    const questions = await QuestionModel.getAllQuestions();
    
    res.json(questions);
})

questionsRoute.get("/:id", async (req, res) => {
	const id = mongoose.Types.ObjectId(req.params.id);
    const question = await QuestionModel.getQuestionById(id);

    if (question === null) {
        res.status(404).json("Question with given id is not found.")
    }

    res.json(question);
})

questionsRoute.get("/tags/:tag", async (req, res) => {
    const questions = await QuestionModel.getQuestionsByTag(req.params.tag);

    res.json(questions);
})

questionsRoute.post("/", async (req, res) => {
    const { title, description, author, tags } = req.body;
    if (!title || !description || !author || !tags) {
        res.status(400).json("Information provided is not valid!");
        return;
    }

    const createdQuestion = await QuestionModel.addNewQuestion({ title, description, author, tags });

    res.json(createdQuestion);
})

questionsRoute.put("/:id", (req, res) => {
    const id = req.params.id;
    return "PUT REQUEST";
})

questionsRoute.delete("/:id", (req, res) => {
    const id = req.params.id;
    return "DELETE REQUEST";
})

questionsRoute.post("/:id/vote", (req, res) => {
    const id = req.params.id;
    const body = req.body;
    return "POST REQUEST on questions/" + id + "/vote";
})

module.exports = questionsRoute