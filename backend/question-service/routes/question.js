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

questionsRoute.get("/search/:query", async (req, res) => {
    const query = req.params.query;
    console.log(query);
    const questions = await QuestionModel.model.find(
        { $text: { $search: query }}
        ).sort( { score: { $meta: "textScore" } } 
        ).exec();

    res.json(questions);
})

questionsRoute.post("/", async (req, res) => {
    const { title, description, user, tags } = req.body;
    if (!title || !description || !user) {
        res.status(400).json({ error: "Information provided is not valid!" });
        return;
    }
    // HACK
    const author = user;

    const createdQuestion = await QuestionModel.addNewQuestion({ title, description, author, tags });

    res.json(createdQuestion);
})

questionsRoute.put("/:id", (req, res) => {
    const id = req.params.id;
    return "PUT REQUEST";
})

questionsRoute.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await QuestionModel.deleteQuestionById(id);

    res.status(204).json("");
})

questionsRoute.put("/:id/vote", async (req, res) => {
    const id = req.params.id;
    const { user, vote } = req.body;

    const successfullyUpdatedVoteCount = await QuestionModel.updateVotes(id, user, vote.toLowerCase());

    if (!successfullyUpdatedVoteCount) {
        res.status(400).json("User could not update the vote.");
    } else {
        res.json("Successfully updated vote count.");
    }
})

module.exports = questionsRoute