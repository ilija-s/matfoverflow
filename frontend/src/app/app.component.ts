import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from './questions/models/question.model';
import { QuestionService } from './questions/services/question.service';
declare const $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  questions: Observable<Question[]>;

  constructor(private questionService: QuestionService) {
    this.questions = this.questionService.getQuestions();
  }

  ngOnInit(): void {
    $('.menu .item').tab();
  }

  public loadQuestions() {
    this.questions = this.questionService.getQuestions();
  }

  public onQuestionCreated(question: Question): void {
    // this.questions.push(question);
  }
}
