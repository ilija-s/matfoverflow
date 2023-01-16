import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../models/question.model';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-question-info',
  templateUrl: './question-info.component.html',
  styleUrls: ['./question-info.component.css']
})
export class QuestionInfoComponent implements OnInit {
  
  @Input()
  question!: Question;
  
  constructor(private questionService: QuestionService) { }
  
  ngOnInit(): void {
  }

  public onUpvoteButtonPressed(question: Question): void {
    this.questionService.sendVoteForQuestion(question._id, "HARDCODED USER", "upvote");
  }

  public onDownvoteButtonPressed(question: Question): void {
    this.questionService.sendVoteForQuestion(question._id, "HARDCODED USER", "downvote");
  }

  public viewQuestion(questionInfo: Question): void {
    this.questionService.getQuestion(questionInfo._id);
    this.questionService.setQuestion(questionInfo);
    this.questionService.setIsSelectedQuestion(true);
  }

  public filterQuestionsByTag(tag: string): void {
    const questions: any = this.questionService.filterQuestionsByTag(tag);
    this.questionService.setQuestions(questions);
  }
}
