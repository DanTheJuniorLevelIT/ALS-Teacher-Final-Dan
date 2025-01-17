import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-check',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './check.component.html',
  styleUrl: './check.component.css'
})
export class CheckComponent implements OnInit {

  isLoading: boolean = false;

  assessTitle: any;

  fname: any;
  lname: any;
  fullname: any;
  lessonTitle: any;
  subjectID: number | null = null;
  studScore: any;
  studFile: any;
  totalScore: number = 0;
  maxScore: number = 0;
  assessmentID: any;
  moduleID: any;
  learnerID: any;
  questions: any;
  studentAnswers: any;
  studentScores: any;
  det: any

  constructor(private apiserv: ApiserviceService) {}

  isTeacher: boolean = true;

  ngOnInit(): void {
    this.isLoading = true;
    this.assessTitle = localStorage.getItem('assessTitle');
    const first = localStorage.getItem('fname');
    const last = localStorage.getItem('lname');
    this.fname = first;
    this.lname = last;
    this.fullname = this.fname + ' ' + this.lname;
    // Retrieve the subjectID from localStorage
    this.lessonTitle = localStorage.getItem('lessTitle');
    const storedSubjectID = localStorage.getItem('classid');
    const storedAssessmentID = localStorage.getItem('assid');
    const storedModuleID = localStorage.getItem('moduleid');
    const storedLearnerID = localStorage.getItem('lrn');
      if (storedSubjectID) {
        this.moduleID = storedModuleID;
        this.subjectID = +storedSubjectID;  // Convert the string to a number
        this.assessmentID = storedAssessmentID;
        this.learnerID = storedLearnerID;
        this.loadStudentAnswers(this.assessmentID, this.learnerID);
      console.log('Retrieved Assessment ID from localStorage:', this.assessmentID);
    } else {
      console.error('No subjectID found in localStorage.');
    }

    this.apiserv.getAssessmentDetails(this.assessmentID).subscribe((response: any)=>{
      this.det = response
      console.log(this.det);
    });
  }

  loadStudentAnswers(assessmentId: number, lrn: string) {
    this.apiserv.getStudentAnswers(assessmentId, lrn).subscribe((response: any) => {
      if (response.status === 'success') {
        this.studentAnswers = response.data;
        this.totalScore = response.total_score;
        this.studFile = response.studentFile;
        this.studScore = response.studentScore;
        this.studentScores = response.scores;
        this.maxScore = response.max_score;
        console.log('student answers: ', this.studentAnswers);
        console.log('student file: ', this.studFile);
        console.log('student Total Score: ', this.studScore);
        this.isLoading = false;
      } else {
        console.error('Failed to load student answers');
        this.isLoading = false;
      }
    });
  }
  

  getLetter(index: number): string {
    return String.fromCharCode(65 + index);  // Converts 0 -> 'A', 1 -> 'B', etc.
  }

  //working
  manualCheck(questionId: number, score: number) {
    const payload = {
      assessment_id: this.assessmentID,
      learner_id: this.learnerID,
      question_id: questionId,
      score: score  // Only add this to essay questions
    };
  
    // Call API to submit the score
    this.apiserv.submitScore(payload).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Updated Score"
          });
          this.totalScore = response.total_score;  // Update total score
          this.loadStudentAnswers(this.assessmentID, this.learnerID);  // Reload answers to refresh the scores
        } else {
          console.error('Failed to add score');
        }
      },
      (error) => {
        console.error('Error adding score', error);
      }
    );
  }
}
