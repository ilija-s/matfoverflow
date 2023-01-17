import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { Comment } from '../models/comment.model';
import { CommentService } from 'src/app/services/comment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-comment-list',
	templateUrl: './comment-list.component.html',
	styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit{
	public comments : Comment[] = [];

	@Input("questionId")
	public questionId: string = "";

	@Output("answerCountUpdate")
	public emitCommentCount : EventEmitter<number> = new EventEmitter<number>();

	public isEditingModeOn: boolean = false;	
	public commentForm: FormGroup;

	constructor(private commentService : CommentService, private formBuilder : FormBuilder) {
		this.commentForm = this.formBuilder.group({
			content : ["", [Validators.required, Validators.minLength(2)]]
		});
	}

	ngOnInit(): void {
		this.refreshComments();

		setInterval(() => {
			if (!this.isEditingModeOn) {
				this.refreshComments();
			}
		}, 10000);
	}

	private refreshCommentCount() {
		this.emitCommentCount.emit(this.comments.length);
	}

	private refreshComments() {
		this.commentService.getComments(this.questionId).subscribe((comments: Comment[]) => {
			this.comments = comments;
			this.refreshCommentCount();
		});
	}

	public onCommentDeleted(commentId : string) : void {
		this.comments = this.comments.filter((comment : Comment) => {
			return comment._id != commentId;
		});
		this.refreshCommentCount();
	}

	public onEditingModeChanged(isEditingModeOn : boolean) : void {
		this.isEditingModeOn = isEditingModeOn;
	}

	public postComment(form : {content : string}) : void {
		form.content = form.content.trim();
		if (form.content.length == 0){
			alert("Comment content can non be empty!");
			return;
		}

		this.commentService.postComment(this.questionId, "1148a2d211a47ca32ee1f42f", "gojko33", form.content)
			.subscribe((comment : Comment) => {
				this.comments.push(comment);
			});
			
		this.commentForm.controls["content"].setValue("");
		this.refreshCommentCount();
	}
}