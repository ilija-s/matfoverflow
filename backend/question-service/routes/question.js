const express = require("express");

const questionsRoute = express.Router();

questionsRoute.get("/", (req, res) => {
    const questions = [{
		id: "id",
        title: "What is a microservice architecture?",
        description: "Description of the question...",
        author: "Ilija Stojanovic"
    }];
    res.json(question);
})

questionsRoute.get("/:id", (req, res) => {
	const id = req.params.id;
    const question = {
		id,
        title: "What is a microservice architecture?",
        description: "Description of the question...",
        author: "Ilija Stojanovic"
    };
    res.json(question);
})

questionsRoute.post("/", (req, res) => {
	const body = req.body;
    return "POST REQUEST";
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