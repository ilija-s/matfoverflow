import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  public getQuestions(): Observable<Question[]> {
    const obs: Observable<Question[]> = this.http.get<Question[]>(
      "http://localhost:4000/questions"
    );

    return obs.pipe();
  }

  public sendVoteForQuestion(questionId: string, user: string, vote: string): void {
    this.http.put<any>(
      "http://localhost:4000/questions/" + questionId + "/vote",
      { user, vote }
    ).subscribe(msg => console.log(msg));
  }
}
