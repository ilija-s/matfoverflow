import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/user/models/user.model';
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
  public sub: Subscription;
  user: User | null = null;
  
  constructor(private questionService: QuestionService,
              private authService: AuthService){

    this.sub = this.authService.user.subscribe((user: User | null) => {
      this.user = user;
    });

    this.authService.sendUserDataIfExists();
  }
  
  ngOnInit(): void {
  }

  public onUpvoteButtonPressed(question: Question): void {
    if (!this.user) {
      window.alert("Login to vote on a question!");
    } else {
      this.questionService.sendVoteForQuestion(question._id, this.user?.username, "upvote");
    }
  }

  public onDownvoteButtonPressed(question: Question): void {
    if (!this.user) {
      window.alert("Login to vote on a question!");
    } else {
      this.questionService.sendVoteForQuestion(question._id, this.user?.username, "downvote");
    }
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
