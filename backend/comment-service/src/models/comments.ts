import mongoose, { isValidObjectId } from "mongoose";

const commentSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    questionId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    authorId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    votes: {
        type : Number,
        required : true,
        default : 0
    },
    upvotes: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        default: []
    },
    downvotes: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        default: []
    }
}, {timestamps : true});

const commentModel = mongoose.model('Comments', commentSchema);

class MyError extends Error {
    private statusCode: number;
    constructor(statusCode: number, message: string){
        super(message);
        this.statusCode = statusCode;
    }
}

export async function _getComments(questionId : string){
    let comments = await commentModel.find({questionId : questionId});
    return comments;
}

export async function _createComment(questionId : string, authorId : string, content : string) {
    const newComment = new commentModel();
    newComment._id = new mongoose.Types.ObjectId();
    newComment.questionId = new mongoose.Types.ObjectId(questionId);
    newComment.authorId = new mongoose.Types.ObjectId(authorId);
    newComment.content = content;

    const commentFromDB = await newComment.save({timestamps : true});
    return commentFromDB;
};

export async function _updateComment(commentId : string, authorId : string, content : string) {
    const comment = await commentModel.findById(commentId);
    if (!comment) {
        throw new MyError(404,`Comment with ID ${commentId} is not found`);
    }
    comment.content = content;

    const commentFromDB = comment.save();
    return commentFromDB;
};

export async function _deleteComments(questionId : string) {
    return await commentModel.deleteMany({questionId : questionId});
}

export async function _deleteComment(commentId : string) {
    return await commentModel.findByIdAndDelete({_id : commentId});
};

export async function _upvote(commentId: string, userId: string) {

        const comment = await commentModel.findById(commentId);
        if (!comment) {
            throw new MyError(404,`Comment with ID ${commentId} is not found`);
        }
        const userObjId = new mongoose.Types.ObjectId(userId);

        let upvotes : number = 0;
        let index : number = comment.upvotes.indexOf(userObjId);
        if (index == -1) {
            comment.upvotes.push(userObjId);
            upvotes++;
        } else {
            throw new MyError(400, "This user has already upvoted");
        }

        index = comment.downvotes.indexOf(userObjId);
        if (index != -1) {
            // User has previously downvoted
            comment.downvotes.splice(index,1);
            upvotes++;
        }

        comment.votes += upvotes;

        const commentFromDB = await comment.save({timestamps : true});
        return commentFromDB.votes;
};

export async function _downvote(commentId: string, userId: string) {

    const comment = await commentModel.findById(commentId);
    if (!comment) {
        throw new MyError(404, `Comment with ID ${commentId} is not found`);
    }
    const userObjId = new mongoose.Types.ObjectId(userId);

    let downvotes : number = 0;
    let index : number = comment.downvotes.indexOf(userObjId);
    if (index == -1) {
        comment.downvotes.push(userObjId);
        downvotes++;
    } else {
        throw new MyError(400, "This user has already downvoted");
    }

    index = comment.upvotes.indexOf(userObjId);
    if (index != -1) {
        // User has previously upvoted
        comment.upvotes.splice(index,1);
        downvotes++;
    }

    comment.votes -= downvotes;

    const commentFromDB = await comment.save({timestamps : true});
    return commentFromDB.votes;
};