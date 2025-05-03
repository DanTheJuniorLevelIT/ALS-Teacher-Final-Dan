import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';

@Component({
  selector: 'app-discussion',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, FormsModule],
templateUrl: './discussion.component.html',
  styleUrl: './discussion.component.css'
})
export class DiscussionComponent implements OnInit {

  isLoading: boolean = false;
  isSubmitting: boolean= false;
  
  private intervalId: any;
  subjectID: number | null = null;
  moduleID: any;
  moduleTitle: any;
  lessonTitle: any;
  discussuinID: any;
  discTopic: any;
  date: any;
  teacherID: any;
  discussionForm: FormGroup;
  discussions: any[] = [];

  constructor(private fb: FormBuilder, private apiService: ApiserviceService) {
    this.discussionForm = this.fb.group({
      answer: ['']
    });
  }

  ngOnInit(): void {
    const storedSubjectID = localStorage.getItem('classid');
    const storedModuleID = localStorage.getItem('moduleid');
    const storedModuleTitle = localStorage.getItem('moduletitle');
    const storedDiscussionID = localStorage.getItem('discussionid');
    this.lessonTitle = localStorage.getItem('lessTitle');
    if (storedSubjectID) {
      this.subjectID = +storedSubjectID;
      this.moduleID = storedModuleID;
      this.moduleTitle = storedModuleTitle;
      this.discussuinID = storedDiscussionID;
      this.discTopic = localStorage.getItem('disctopic');
      this.date = localStorage.getItem('date');

      this.spinner();

      this.intervalId = setInterval(() => {
        this.loadDiscussions(this.discussuinID);
      }, 20000);
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  spinner() {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 20000);
  }

  transformText(text: string): string {
    let paragraphs = text.split(/\n\s*\n/);
  
    return paragraphs
      .map(paragraph => paragraph.replace(/\.\s*/g, '.<br>'))
      .map(paragraph => `<p>${paragraph}</p>`)
      .join('');
  }

  loadDiscussions(discussionID: number) {
    console.log(discussionID);
    this.apiService.viewDiscussionReplies(discussionID).subscribe((data: any) => {
      const groupedDiscussions: any[] = [];

      let currentStudentReply: { user: string; date: any; answer: any; role: string; } | null = null;
  
      data.forEach((reply: any) => {
        if (reply.lrn) {
          if (currentStudentReply) {
            groupedDiscussions.push(currentStudentReply);
            currentStudentReply = null;
          }
          currentStudentReply = {
            user: `${reply.student_firstname} ${reply.student_lastname}`,
            date: reply.created_at,
            answer: reply.reply,
            role: 'student'
          };
        } else {
          if (currentStudentReply) {
            groupedDiscussions.push(currentStudentReply);
            currentStudentReply = null;
          }
          groupedDiscussions.push({
            user: `${reply.teacher_firstname} ${reply.teacher_lastname}`,
            date: reply.created_at,
            answer: reply.reply,
            role: 'teacher'
          });
        }
      });

      console.log(data);
  
      if (currentStudentReply) {
        groupedDiscussions.push(currentStudentReply);
      }
  
      this.discussions = groupedDiscussions;
    });
  }

  submitAnswer(){
    this.isSubmitting = true;
    const newAnswer = this.discussionForm.value.answer;
    const storedTeacherID = localStorage.getItem('id');

    const payload = {
      discussionid: this.discussuinID,
      lrn: null,
      adminID: storedTeacherID,
      reply: newAnswer
    };

    this.apiService.sendDiscussionReplies(payload).subscribe((response: any) => {
      this.loadDiscussions(this.discussuinID);
      this.discussionForm.reset();
      this.isSubmitting = false;
    });
  }
}

