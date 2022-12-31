import express from "express";
import { getComments, createComment, editComment, removeAllComments, removeComment, upvote, downvote} from "../controllers/comments";

const router : express.Router = express.Router();

router.get('/:questionId', getComments);
router.post('/:questionId', createComment);
router.put('/:commentId', editComment);
router.delete('/:questionId', removeAllComments);
router.delete('/:questionId/:commentId', removeComment);
router.put('/:commentId/upvote', upvote);
router.put('/:commentId/downvote', downvote);

export = router;