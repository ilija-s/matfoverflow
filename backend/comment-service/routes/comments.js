const express = require('express');

const router = express.Router();

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const comment = {
		id,
        answer: "Thank you very much, I get it now. ✨",
        author: "Igor Paunovic"
    };
    res.json(comment);
});

module.exports = router;