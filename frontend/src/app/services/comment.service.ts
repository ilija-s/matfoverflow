import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Comment } from '../comments/models/comment.model';

@Injectable({
  	providedIn: 'root'
})
export class CommentService {

	constructor(private http : HttpClient) {}

	public getComments(questionId : string) : Observable<Comment[]>{
		return this.http.get<Comment[]>("http://localhost:4001/comments/" + questionId);
	}

	private mongoObjectId = function () : string {
		var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
		return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
			return (Math.random() * 16 | 0).toString(16);
		}).toLowerCase();
	};

	public upvote(commentId : string) : Observable<number> {
		const userId : string = this.mongoObjectId();
		return this.http.put<number>("http://localhost:4001/comments/" + commentId + "/upvote", {userId : userId});
	}

	public downvote(commentId : string) : Observable<number> {
		const userId : string = this.mongoObjectId();
		return this.http.put<number>("http://localhost:4001/comments/" + commentId + "/downvote", {userId : userId});
	}

	public deleteComment(commentId : string) : Observable<any> {
		const userId : string = this.mongoObjectId();
		return this.http.delete<any>("http://localhost:4001/comments/" + commentId);
	}

	public editComment(commentId : string, content : string) : Observable<Comment> {
		return this.http.put<Comment>("http://localhost:4001/comments/" + commentId + "/downvote", {content : content});
	}
}
