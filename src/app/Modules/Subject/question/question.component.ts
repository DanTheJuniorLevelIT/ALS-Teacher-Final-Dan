import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent implements OnInit{

  isSubmitting: boolean = false;
  isLoading: boolean = false;

  qid: any;
  res: any;

  ClassID: number | null = null;
  lessonTitle: any;
  assessmentID: any;
  moduleID: any;
  moduleTitle:any;
  det: any;
  questions: any;


  identify: any;
  tf: any;
  essay: any;
  mc: any;

  completedCount: number = 0;
  totalStudents: number = 0;
  totalPoints: any;

  isModalOpen = false;
  isEditing = false;
  selectedQuestion: any = null; 
  questionText = '';
  questionType = 'multiple-choice';
  options: { text: string }[] = [];
  optionLabels: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  keyAnswer = '';
  points = 1;
  Object: any;

  constructor(private apiService: ApiserviceService, private router: Router) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.options.push({ text: '' });
    this.lessonTitle = localStorage.getItem('lessTitle');
    const storedClassID = localStorage.getItem('classid');
    const storedAssessmentID = localStorage.getItem('assid');
    const storedModuleID = localStorage.getItem('moduleid');
    const storedModuleTitle = localStorage.getItem('moduletitle');
    if (storedClassID) {
      this.moduleID = storedModuleID;
      this.ClassID = +storedClassID; 
      this.assessmentID = storedAssessmentID;
      this.moduleTitle = storedModuleTitle;
      this.loadQuestions();
      this.getTotalPoints();
      this.loadCompletion(); 
      console.log('Retrieved Subject ID from localStorage:', this.assessmentID);
    } else {
      console.error('No ClassID found in localStorage.');
    }
    

    this.apiService.getAssessmentDetails(this.assessmentID).subscribe((response: any)=>{
      this.det = response
      console.log(this.det);
    });
  }

  getTotalPoints(){
    this.apiService.getTotalPoints(this.assessmentID).subscribe((response: any)=>{
      this.totalPoints = response;
      console.log(response);
      this.isLoading = false;
    })
  }

  addOption() {

    if (this.options.length < this.optionLabels.length) {
        this.options.push({ text: '' });
    }
  }

  setKeyAnswer(optionText: string) {
    this.keyAnswer = optionText;
  }

  loadQuestions(){
    this.apiService.getQuestion(this.assessmentID).subscribe((response: any) => {
      if (response.data && Array.isArray(response.data)) {
        this.questions = response.data; 
        this.filteredQuestionTypes();
        console.log(this.questions);
        this.isLoading = false;
      } else {
        console.error('Unexpected response structure:', response);
        this.isLoading = false;
      }
    });
  }

  filteredQuestionTypes(){
    this.identify = this.questions.filter((typ: { type: string; }) => typ.type == 'identification');
    this.tf = this.questions.filter((typ: { type: string; })=> typ.type == 'true-false');
    this.essay = this.questions.filter((typ: { type: string; }) => typ.type == 'Essay');
    this.mc = this.questions.filter((typ: { type: string; }) => typ.type == 'multiple-choice');
  }

  loadCompletion(){
    this.apiService.getCompletionStats(this.assessmentID, this.ClassID).subscribe((stats: any) => {
      this.completedCount = stats.completed;
      this.totalStudents = stats.total;
      this.isLoading = false;
    });
  }

  editQuestion(id: any) {
    this.isEditing = true;
    this.selectedQuestion = this.questions.find((q: any) => q.question_id === id);
  
    this.questionText = this.selectedQuestion.question;
    this.questionType = this.selectedQuestion.type;
    if (this.questionType === 'essay') {
      this.keyAnswer = '';  
    } else {
      this.keyAnswer = this.selectedQuestion.key_answer;  
    }
    this.points = this.selectedQuestion.points;
  
    if (this.questionType === 'multiple-choice') {
      this.options = this.selectedQuestion.options.map((opt: any) => ({ text: opt })); 
    } else {
      this.options = [{ text: '' }];  
    }
  
    this.openModal();
  }
  

  getLetter(index: number): string {
    return String.fromCharCode(65 + index); // 65 is the char code for 'A'
  }


  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.resetForm();
  }

onQuestionTypeChange(): void {
  this.keyAnswer = '';
}

addQuestion() {

  const questionPayload = {
    question_id: this.isEditing ? this.selectedQuestion.question_id : null,
    assessment_id: this.assessmentID,
    question: this.questionText,
    type: this.questionType,
    key_answer: this.questionType !== 'Essay' ? this.keyAnswer : null, 
    points: this.points,
    options: this.getOptions()
  };

  if (this.isEditing) {
    this.isSubmitting = true; 
    this.apiService.editQuestion(questionPayload).subscribe(
      (response: any) => {
        Swal.fire({
          title: "Updated Question",
          icon: "success"
        });
        this.loadQuestions();
        this.getTotalPoints();
        this.closeModal();
        this.isSubmitting = false;
      },
      error => {
        console.error('Error updating question', error);
        Swal.fire({
          title: "Error Updating Question",
          icon: "error"
        });
        this.isSubmitting = false;
      }
    );
  } else {
    if (this.questionType === 'multiple-choice' && this.getOptions().length < 2) {
      Swal.fire({
        title: "Please enter at least two valid options.",
        icon: "warning"
      });
      this.isSubmitting = false;
      return;
    }  
    this.isSubmitting = true;
    this.apiService.createQuestion(questionPayload).subscribe(
      (response: any) => {
        const newQuestion = {
          question_id: response.question.question_id,
          question: response.question.question,
          type: response.question.type,
          key_answer: response.question.key_answer,
          points: response.question.points,
          options: response.question.options || []
        };
        Swal.fire({
          title: "Added New Question",
          icon: "success"
        });
        this.loadQuestions();
        this.getTotalPoints();
        this.closeModal();
        this.isSubmitting = false;
      },
      error => {
        console.error('Error adding question', error);
        Swal.fire({
          title: "Error adding question",
          icon: "error"
        });
        this.isSubmitting = false;
      }
    );
  }
}

deleteQuestion(){
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      this.qid = this.selectedQuestion.question_id;
      console.log('Question ID: ',this.qid);

      this.apiService.deleteQuestion(this.qid).subscribe((response: any)=>{
        this.res = response.status;
        console.log('Message: ', this.res);
        this.loadQuestions();
        this.getTotalPoints();
        this.closeModal();
      })
    }
  });
}

resetForm() {
  this.questionText = '';
  this.questionType = 'multiple-choice';
  this.options = [{ text: '' }];  // Reset to one empty option
  this.keyAnswer = '';
  this.points = 1;
  this.isEditing = false;
  this.selectedQuestion = null;
}

getOptions() {
  if (this.questionType === 'multiple-choice') {
    return this.options.map(option => option.text).filter(text => text.trim() !== '');
  }
  return [];
}

navigateToProgress(title: any) {
  localStorage.setItem('assessTitle', title);
  const storedClassID = localStorage.getItem('classid');
  const storedAssessmentID = localStorage.getItem('assid');

  this.router.navigate(['/main/Subject/main/subject/modulesmain', storedClassID, 'modules', this.moduleID, 'assess', 'question', storedAssessmentID, 'progress']);
}


}
