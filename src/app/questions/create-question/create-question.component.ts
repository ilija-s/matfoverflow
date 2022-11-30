import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit{

  @ViewChild('inputTitle', { static: false }) inputTitle: ElementRef | undefined;
  @ViewChild('inputDescription', { static: false }) inputDescription: ElementRef | undefined;

  @Output() questionCreated: EventEmitter<Question> = new EventEmitter<Question>();
  
  constructor() {  }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public addNewQuestion(): void{
    const title: string = (this.inputTitle?.nativeElement as HTMLInputElement).value;
    const description: string = (this.inputDescription?.nativeElement as HTMLTextAreaElement).value;

    if ( title.length < 10 ) {
      window.alert("Title must be at least 10 characters long")
      return;
    }

    if ( description.length < 10 ) {
      window.alert("Description must be at least 10 characters long")
      return;
    }

    const newQuestion: Question = new Question(title, description, "New Author");

    this.questionCreated.emit(newQuestion);
  }

}
