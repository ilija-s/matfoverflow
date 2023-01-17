"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const comments_1 = __importDefault(require("../controllers/comments"));
const router = express_1.default.Router();
router.get('/:questionId', comments_1.default.getComments);
router.post('/:questionId', comments_1.default.createComment);
router.put('/:commentId', comments_1.default.updateComment);
router.delete('/question/:questionId', comments_1.default.deleteComments);
router.delete('/:commentId', comments_1.default.deleteComment);
router.put('/:commentId/upvote', comments_1.default.upvote);
router.put('/:commentId/downvote', comments_1.default.downvote);
module.exports = router;
