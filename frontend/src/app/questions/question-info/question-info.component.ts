import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-question-info',
  templateUrl: './question-info.component.html',
  styleUrls: ['./question-info.component.css']
})
export class QuestionInfoComponent implements OnInit {
  
  @Input()
  question!: Question;
  
  constructor() { }
  
  ngOnInit(): void {
  }
}
