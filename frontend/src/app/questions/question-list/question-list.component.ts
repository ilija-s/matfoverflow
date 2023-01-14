import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit{
  
  @Input()
  questions!: Question[];

  constructor() { }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
