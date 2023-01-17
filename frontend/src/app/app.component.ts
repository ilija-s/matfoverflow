import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from './questions/models/question.model';
import { QuestionService } from './questions/services/question.service';
import { User } from './user/models/user.model';
import { UserService } from './user/services/user.service';
declare const $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  questions: Observable<Question[]>;
  user: User | null = null;

  constructor(private questionService: QuestionService, private userService: UserService) {
    this.questions = this.questionService.getQuestions();
  }

  ngOnInit(): void {
    $('.menu .item').tab();

    console.log(this.user);

    this.userService.currentUser$.subscribe((value) => {
      this.user = value;
    });
  }

  public loadQuestions() {
    this.questions = this.questionService.getQuestions();
    this.questionService.setIsSelectedQuestion(false);
  }

  public onQuestionCreated(question: Question): void {
    // this.questions.push(question);
  }

}
