import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private readonly url = "http://localhost:4000/questions";
  private question$ = new BehaviorSubject<any>({});
  selectedQuestion$ = this.question$.asObservable();
  private isSelectedQuestion$ = new BehaviorSubject<any>({});
  isSelectedQuestionObs$ = this.isSelectedQuestion$.asObservable();

  constructor(private http: HttpClient) { }

  setQuestion(question: any) {
    this.question$.next(question);
  }

  setIsSelectedQuestion(value: any) {
    this.isSelectedQuestion$.next(value);
  }

  public getQuestions(): Observable<Question[]> {
    const obs: Observable<Question[]> = this.http.get<Question[]>(this.url);

    return obs.pipe();
  }

  public addNewQuestion(title: string, description: string, user: string, tags: string[]): any {
    const body = {
      title,
      description,
      user,
      tags
    };
    let response: any;
    this.http.post<any>(this.url, body).subscribe(msg => response = msg);
  
    return response;
  }

  public sendVoteForQuestion(questionId: string, user: string, vote: string): void {
    this.http.put<any>(
      this.url + "/" + questionId + "/vote",
      { user, vote }
    ).subscribe(msg => console.log(msg));
  }
}