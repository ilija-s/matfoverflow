import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit{
  isSelectedQuestion: boolean = false;

  @Input()
  questions!: Observable<Question[]>;

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionService.isSelectedQuestionObs$.subscribe((value) => {
      this.isSelectedQuestion = value;
    });
  }
}
