import { Component, Input } from '@angular/core';

import { Comment } from '../models/comment.model';
import { CommentService } from 'src/app/services/comment.service';

@Component({
	selector: 'app-comment-list',
	templateUrl: './comment-list.component.html',
	styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent {
	public comments : Comment[] = [];

	@Input('questionId')
	public questionId: string = "63c541be1958205093781043";

	constructor(private commentService : CommentService) {
		this.commentService.getComments(this.questionId).subscribe((comments: Comment[]) => {
			this.comments = comments;
		});
	}

	public onCommentDeleted(questionId : string) : void {
		this.commentService.getComments(this.questionId).subscribe((comments: Comment[]) => {
			this.comments = comments;
		});
	}
}

