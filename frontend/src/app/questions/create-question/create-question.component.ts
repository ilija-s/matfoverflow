import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Question } from '../models/question.model';
import { QuestionService } from '../services/question.service';
import { QuestionNameValidator } from '../validators/question-name-validator';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit{

  // @ViewChild('inputTitle', { static: false }) inputTitle: ElementRef | undefined;
  // @ViewChild('inputDescription', { static: false }) inputDescription: ElementRef | undefined;

  @Output() questionCreated: EventEmitter<Question> = new EventEmitter<Question>();
  
  createQuestionForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private questionService: QuestionService){
    this.createQuestionForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5), QuestionNameValidator]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      user: 'HARDCODED USER',
      tags: [""]
    });
  }
  
  ngOnInit(): void {
  }

  public onCreateQuestionSubmit(): void {
    console.log(this.createQuestionForm.value);
    const title: string = this.createQuestionForm.value['title'];
    const description: string = this.createQuestionForm.value['description'];
    const user: string = this.createQuestionForm.value['user'];
    const tags: string[] = this.createQuestionForm.value['tags'];
    const response: any = this.questionService.addNewQuestion(title, description, user, tags);
    console.log(response);
  }

  //TREBA POPRAVITI
  public titleHasErrors(): boolean {
    const errors: ValidationErrors | undefined | null = this.createQuestionForm.get("title")?.errors;

    console.log(errors);

    return errors != null;
  }

  public descriptionHasErrors(): boolean {
    const errors: ValidationErrors | undefined | null = this.createQuestionForm.get("description")?.errors;

    console.log(errors);

    return errors != null;
  }



  // public addNewQuestion(): void{
  //   const title: string = (this.inputTitle?.nativeElement as HTMLInputElement).value;
  //   const description: string = (this.inputDescription?.nativeElement as HTMLTextAreaElement).value;

  //   if ( title.length < 10 ) {
  //     window.alert("Title must be at least 10 characters long")
  //     return;
  //   }

  //   if ( description.length < 10 ) {
  //     window.alert("Description must be at least 10 characters long")
  //     return;
  //   }

  //   const newQuestion: Question = new Question(title, description, "New Author");

  //   this.questionCreated.emit(newQuestion);
  // }

}
