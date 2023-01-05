"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const comments_1 = require("../controllers/comments");
const router = express_1.default.Router();
router.get('/:questionId', comments_1.getComments);
router.post('/:questionId', comments_1.createComment);
router.put('/:commentId', comments_1.updateComment);
router.delete('/:questionId', comments_1.deleteComments);
router.delete('/:questionId/:commentId', comments_1.deleteComment);
router.put('/:commentId/upvote', comments_1.upvote);
router.put('/:commentId/downvote', comments_1.downvote);
module.exports = router;
