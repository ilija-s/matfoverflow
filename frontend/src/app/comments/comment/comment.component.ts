import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { Comment } from '../models/comment.model';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { CommentService } from 'src/app/services/comment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

TimeAgo.addDefaultLocale(en);

@Component({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnChanges{

	public timeFormater : any;
	public commentModified : boolean = false;
	public editingMode : boolean = false;
	public editForm : FormGroup;

	@Output('commentDeleted')
 	public emitCommentDeleted : EventEmitter<string> = new EventEmitter<string>();

	@Output('commentEdited')
 	public emitCommentEdited : EventEmitter<string> = new EventEmitter<string>();

	@Output('commentEditing')
 	public emitCommentEditing : EventEmitter<boolean> = new EventEmitter<boolean>();

	@Input('comment')
	public comment : Comment = new Comment(
		"", 
		"", 
		"",
		"",
		"",
		0,
		"",
		"",
		"",
		"");

	constructor(private commentService : CommentService, private formBuilder: FormBuilder) {
		this.timeFormater = new TimeAgo('en-US');
		
		if(this.comment.createdAt !== this.comment.updatedAt){
			this.commentModified = true;
		}

		this.editForm = this.formBuilder.group({
			content : [this.comment.content, [Validators.required, Validators.minLength(2)]]
		})
	}
	ngOnChanges(changes: SimpleChanges): void {
		this.editForm.controls["content"].setValue(this.comment.content);
	}

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

	public editComment(form : {content : string}) {

		form.content = form.content.trim();
		if (form.content.length == 0){
			alert("Comment content can non be empty!");
			return;
		}

		this.commentService.editComment(this.comment._id, this.comment.authorId, form.content).subscribe((res: any) => {});
		this.emitCommentEdited.emit(this.comment._id);
		this.toggleEditingMode()
		this.comment.content = form.content;
	}
}
