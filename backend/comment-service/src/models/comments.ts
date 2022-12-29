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

export async function getComments(questionId : string){
    let comments = await commentModel.find({questionId : questionId});
    return comments;
}

export async function createComment(questionId : string, authorId : string, content : string) {
    const newComment = new commentModel();
    newComment._id = new mongoose.Types.ObjectId();
    newComment.questionId = new mongoose.Types.ObjectId(questionId);
    newComment.authorId = new mongoose.Types.ObjectId(authorId);
    newComment.content = content;

    const commentFromDB = await newComment.save({timestamps : true});
    return commentFromDB;
};

export async function updateComment(commentId : string, authorId : string, content : string) {
    const comment = await commentModel.findById(commentId);
    comment.content = content;

    const commentFromDB = comment.save();
    return commentFromDB;
};

export async function deleteAllComments(questionId : string) {
    return await commentModel.deleteMany({questionId : questionId});
}

export async function deleteComment(commentId : string) {
    return await commentModel.findByIdAndDelete({_id : commentId});
};

export async function upvote(commentId: string, userId: string) {

        const comment = await commentModel.findById(commentId);
        const userObjId = new mongoose.Types.ObjectId(userId);

        let upvotes : number = 0;
        let index : number = comment.upvotes.indexOf(userObjId);
        if (index == -1) {
            comment.upvotes.push(userObjId);
            upvotes++;
        } else {
            throw new Error("This user has already upvoted");
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

export async function downvote(commentId: string, userId: string) {

    const comment = await commentModel.findById(commentId);
    const userObjId = new mongoose.Types.ObjectId(userId);

    let downvotes : number = 0;
    let index : number = comment.downvotes.indexOf(userObjId);
    if (index == -1) {
        comment.downvotes.push(userObjId);
        downvotes++;
    } else {
        // User has already downvoted
        throw new Error("This user has already downvoted");
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