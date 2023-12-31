import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/user/models/user.model';
import { Question } from '../models/question.model';
import { QuestionService } from '../services/question.service';
import { QuestionNameValidator } from '../validators/question-name-validator';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit{
  public sub: Subscription;
  @Output() questionCreated: EventEmitter<Question> = new EventEmitter<Question>();
  user: User | null = null;
  createQuestionForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private questionService: QuestionService,
    private authService: AuthService){

  this.sub = this.authService.user.subscribe((user: User | null) => {
    this.user = user;
  });

  this.authService.sendUserDataIfExists();

  this.createQuestionForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(5), QuestionNameValidator]],
    description: ['', [Validators.required, Validators.minLength(30)]],
    tags: [""]
  });
}
  
  ngOnInit(): void {
  }

  public onCreateQuestionSubmit(): void {
    console.log(this.createQuestionForm.value);

    if (this.createQuestionForm.invalid){
      window.alert('Form is not valid. Please, try again!');
      return;
    }
    const title: string = this.createQuestionForm.value['title'];
    const description: string = this.createQuestionForm.value['description'];
    const tags: string[] = this.createQuestionForm.value['tags'];

    if (this.user !== null) {
      this.questionService.addNewQuestion(title, description, this.user.username, tags);
    } else {
      window.alert("You need to be logged in to ask a question.");
    }

    this.createQuestionForm.reset({
        title: "",
        description: ""
    });
  }

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
}
