import express from "express";
import commentController from "../controllers/comments";

const router : express.Router = express.Router();

router.get('/:questionId', commentController.getComments);
router.post('/:questionId', commentController.createComment);
router.put('/:commentId', commentController.updateComment);
router.delete('/question/:questionId', commentController.deleteComments);
router.delete('/:commentId', commentController.deleteComment);
router.put('/:commentId/upvote', commentController.upvote);
router.put('/:commentId/downvote', commentController.downvote);

export = router;