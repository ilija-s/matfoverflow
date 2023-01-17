import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Question } from './questions/models/question.model';
import { QuestionService } from './questions/services/question.service';
import { AuthService } from './services/auth.service';
import { User } from './user/models/user.model';
declare const $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  questions: Observable<Question[]>;
  user: User | null = null;
  sub: Subscription;

  constructor(private questionService: QuestionService, private auth: AuthService) {
    this.questions = this.questionService.getQuestions();
    this.sub = this.auth.user.subscribe((user: User | null) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    $('.menu .item').tab();
  }

  public loadQuestions() {
    this.questions = this.questionService.getQuestions();
    this.questionService.setIsSelectedQuestion(false);
  }

  public onQuestionCreated(question: Question): void {
    // this.questions.push(question);
  }
}
