import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Comment } from '../models/comment.model';
import { CommentService } from 'src/app/services/comment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/user/models/user.model';

@Component({
	selector: 'app-comment-list',
	templateUrl: './comment-list.component.html',
	styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit{

	public comments : Comment[] = [];
	public isEditingModeOn: boolean = false;	
	public commentForm: FormGroup;
	public user: User | null;
	public userId : string = "";

	@Input("questionId")
	public questionId: string = "";

	@Output("answerCountUpdate")
	public emitCommentCount : EventEmitter<number> = new EventEmitter<number>();

	constructor(private commentService : CommentService, 
				private formBuilder : FormBuilder,
				private authService: AuthService) {
		this.commentForm = this.formBuilder.group({
			content : ["", [Validators.required, Validators.minLength(2)]]
		});

		this.authService.user.subscribe((user: User | null) => {
			this.user = user;
		});

		this.user = this.authService.sendUserDataIfExists();
	}

	ngOnInit(): void {
		this.refreshComments();
		this.userId = this.user!.id;
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
		
		if (this.user === null) {
			window.alert("You need to be logged in to post answers.");
			return;
		} 

		form.content = form.content.trim();
		if (form.content.length == 0){
			window.alert("Comment content can non be empty!");
			return;
		}

		this.commentService.postComment(this.questionId, this.user?.id, this.user?.username, form.content)
			.subscribe((comment : Comment) => {
				this.comments.push(comment);
			});
			
		this.commentForm.controls["content"].setValue("");
		this.refreshCommentCount();
	}
}