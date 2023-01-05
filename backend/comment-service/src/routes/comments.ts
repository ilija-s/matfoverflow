import express from "express";
import { getComments, createComment, updateComment, deleteComments, deleteComment, upvote, downvote} from "../controllers/comments";

const router : express.Router = express.Router();

router.get('/:questionId', getComments);
router.post('/:questionId', createComment);
router.put('/:commentId', updateComment);
router.delete('/:questionId', deleteComments);
router.delete('/:questionId/:commentId', deleteComment);
router.put('/:commentId/upvote', upvote);
router.put('/:commentId/downvote', downvote);

export = router;