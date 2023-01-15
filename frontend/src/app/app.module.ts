import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { QuestionInfoComponent } from './questions/question-info/question-info.component';
import { CreateQuestionComponent } from './questions/create-question/create-question.component';
import { QuestionComponent } from './questions/question/question.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    QuestionListComponent,
    QuestionInfoComponent,
    CreateQuestionComponent,
    QuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
