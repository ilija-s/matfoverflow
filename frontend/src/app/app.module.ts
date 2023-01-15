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
import { LoginFormComponent } from './user/login-form/login-form.component';
import { RegisterFormComponent } from './user/register-form/register-form.component';
import { UserInfoComponent } from './user/user-info/user-info.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    QuestionListComponent,
    QuestionInfoComponent,
    CreateQuestionComponent,
    LoginFormComponent,
    RegisterFormComponent,
    UserInfoComponent
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
