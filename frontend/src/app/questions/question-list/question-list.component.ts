import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit{
  
  @Input()
  questions!: Observable<Question[]>;

  constructor() { }
  
  ngOnInit(): void {
  }

}
