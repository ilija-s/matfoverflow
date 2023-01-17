import { Component, Input, OnInit} from '@angular/core';

import { Comment } from '../models/comment.model';
import { CommentService } from 'src/app/services/comment.service';

@Component({
	selector: 'app-comment-list',
	templateUrl: './comment-list.component.html',
	styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit{
	public comments : Comment[] = [];

	@Input('questionId')
	public questionId: string = "";

	private isEditingModeOn: boolean = false;	

	constructor(private commentService : CommentService) {}

	ngOnInit(): void {
		this.commentService.getComments(this.questionId).subscribe((comments: Comment[]) => {
			this.comments = comments;
		});
		setInterval(() => {
			if (!this.isEditingModeOn) {
				this.refreshComments();
			}
		}, 10000);
	}

	private refreshComments() {
		this.commentService.getComments(this.questionId).subscribe((comments: Comment[]) => {
			this.comments = comments;
		});
	}

	public onCommentDeleted(commentId : string) : void {
		this.comments = this.comments.filter((comment : Comment) => {
			return comment._id != commentId;
		});
	}

	public onEditingModeChanged(isEditingModeOn : boolean) : void {
		this.isEditingModeOn = isEditingModeOn;
	}
}

