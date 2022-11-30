import { Component, OnInit } from '@angular/core';
import { Question } from './questions/models/question.model';
declare const $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  //creating a list of questions for testing
  questions: Question[] = [
    new Question(
      "Question x",
      "This is a description for question x",
      "autor1"
    ),
    new Question(
      "Question y",
      "This is a description for question y",
      "autor2"
    ),
    new Question(
      "Question z",
      "This is a description for question z",
      "autor3"
    ),
    new Question(
      "Question m",
      "This is a description for question m",
      "autor4"
    ),
  ];

  constructor() {

  }

  ngOnInit(): void {
    $('.menu .item').tab();
  }

  public onQuestionCreated(question: Question): void {
    this.questions.push(question);
  }
}
