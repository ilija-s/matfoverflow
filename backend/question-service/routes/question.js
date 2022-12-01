const express = require("express");

const questionsRoute = express.Router();

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

module.exports = questionsRoute