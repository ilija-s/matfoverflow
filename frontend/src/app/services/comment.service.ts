import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Comment } from '../comments/models/comment.model';

@Injectable({
  	providedIn: 'root'
})
export class CommentService {

	private readonly url = "http://localhost:4001/comments/";

	constructor(private http : HttpClient) {}

	public getComments(questionId : string) : Observable<Comment[]>{
		return this.http.get<Comment[]>(this.url + questionId);
	}

	private mongoObjectId = function () : string {
		var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
		return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
			return (Math.random() * 16 | 0).toString(16);
		}).toLowerCase();
	};

	public upvote(commentId : string) : Observable<{currentVoteCount : number}> {
		const userId : string = this.mongoObjectId();
		return this.http.put<{currentVoteCount : number}>(this.url + commentId + "/upvote", {userId : userId});
	}

	public downvote(commentId : string) : Observable<{currentVoteCount : number}> {
		const userId : string = this.mongoObjectId();
		return this.http.put<{currentVoteCount : number}>(this.url + commentId + "/downvote", {userId : userId});
	}

	public deleteComment(commentId : string) : Observable<any> {
		const userId : string = this.mongoObjectId();
		return this.http.delete<any>(this.url + commentId);
	}

	public editComment(commentId : string, authorId : string, content : string) : Observable<Comment> {
		return this.http.put<Comment>(this.url + commentId, {content : content, authorId : authorId});
	}

	public postComment(questionId : string, authorId : string, authorName: string, content : string) : Observable<Comment> {
		return this.http.post<Comment>(this.url + questionId, {authorId : authorId, authorName : authorName, content : content});
	}
}
