import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Comment } from '../models/comment.model';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { CommentService } from 'src/app/services/comment.service';

TimeAgo.addDefaultLocale(en);

@Component({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.css']
})
export class CommentComponent{

	public timeFormater : any;
	public commentModified : boolean = false;
	public editingMode : boolean = false;

	@Output('commentDeleted')
 	public emitCommentDeleted : EventEmitter<string> = new EventEmitter<string>();

	@Output('commentEdited')
 	public emitCommentEdited : EventEmitter<string> = new EventEmitter<string>();

	@Output('commentEditing')
 	public emitCommentEditing : EventEmitter<boolean> = new EventEmitter<boolean>();

	@Input('comment')
	public comment : Comment = new Comment(
		"639b50e38f04137f9d2c6b29", 
		"323132333435363738393130", 
		'',
		"313233343536373839313032",
		"Can you be more specific? Why do you need Weierstrasse theoreme? ^.-",
		-1 ,
		"",
		"",
		"2023-01-03T01:32:37.646Z",
		"2023-01-03T01:32:37.646Z");

	constructor(private commentService : CommentService) {
		this.timeFormater = new TimeAgo('en-US');
		
		if(this.comment.createdAt !== this.comment.updatedAt){
			this.commentModified = true;
		}
	};

	public toggleEditingMode() {
		this.editingMode = !this.editingMode;
		this.emitCommentEditing.emit(this.editingMode);
	}

	public upvote() {
		this.commentService.upvote(this.comment._id).subscribe((res: any) => {
			this.comment.votes = res.currentVoteCount;
		});
	}

	public downvote() {
		this.commentService.downvote(this.comment._id).subscribe((res: any) => {
			this.comment.votes = res.currentVoteCount;
		});
	}

	public deleteComment() {
		this.commentService.deleteComment(this.comment._id).subscribe((res: any) => {});
		this.emitCommentDeleted.emit(this.comment._id);
	}

	public editComment(content : string) {
		this.commentService.editComment(this.comment._id, content).subscribe((res: any) => {});
		this.emitCommentEdited.emit(this.comment._id);
	}
}
