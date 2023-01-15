import { Component } from '@angular/core';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  question: any = null;

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionService.selectedQuestion$.subscribe((value) => {
      this.question = value;
    });
  }

}
