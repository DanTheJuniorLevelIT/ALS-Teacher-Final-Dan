import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {

  isLoading: boolean = false;
  isSubmitting: boolean = false;

  assessTitle: any;
  lessonTitle: any;
  moduleTitle:any;
  students: any;
  totalPoints: any;
  isModalOpen = false;
  questionText = '';
  questionType = 'multiple-choice'; // Default type
  optionA = '';
  optionB = '';
  optionC = '';
  optionD = '';
  keyAnswer = '';
  subjectID: number | null = null;
  assessmentID: any;
  moduleID: any;

constructor(private apiserv: ApiserviceService, private router: Router){}

ngOnInit(): void {
  this.isLoading = true
  // Retrieve the subjectID from localStorage
  this.assessTitle = localStorage.getItem('assessTitle');
  const storedSubjectID = localStorage.getItem('classid');
  const storedAssessmentID = localStorage.getItem('assid');
  const storedModuleID = localStorage.getItem('moduleid');
  this.lessonTitle = localStorage.getItem('lessTitle');
  const storedModuleTitle = localStorage.getItem('moduletitle');
    if (storedSubjectID) {
      this.moduleID = storedModuleID;
      this.subjectID = +storedSubjectID;  // Convert the string to a number
      this.assessmentID = storedAssessmentID;
      this.moduleTitle = storedModuleTitle;
      this.loadStudents(); 
    console.log('Retrieved Assessment ID from localStorage:', this.assessmentID);
  } else {
    console.error('No subjectID found in localStorage.');
  }
}

loadStudents(){
  this.apiserv.getStudents(this.subjectID, this.assessmentID).subscribe(
    (data: any) => {
      this.students = data.status;
      this.totalPoints = data.total_points; 
      console.log("Students: ", data.status);
      this.isLoading = false;
    },
    (error) => {
      console.error('Error fetching students', error);
      this.isLoading = false;
    }
  );
}

//2nd Approach
autoCheck() {
  this.isSubmitting = true;
  this.apiserv.autoCheck(this.subjectID, this.assessmentID).subscribe(
    (response: any) => {
      Swal.fire({
        title: "Auto Check Completed",
        icon: "success"
      });
      this.students = response.score;
      this.students = response.status;
      this.isSubmitting = false;
      // After auto-check, reload the student data to get updated scores
    },
    (error) => {
      console.error('Error during auto-check:', error);
      Swal.fire({
        title: "Something went wrong!",
        icon: "error"
      });
      this.isSubmitting = false;
    }
  );
}


  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  navigateToChecking(lrnid: any, fname: any, lname: any) {
    const storedSubjectID = localStorage.getItem('classid');
    const storedAssessmentID = localStorage.getItem('assid');
    localStorage.setItem('lrn', lrnid);
    localStorage.setItem('fname', fname);
    localStorage.setItem('lname', lname);
    // Store the subjectID in localStorage
  
    // Navigate to the modules page
    this.router.navigate(['/main/Subject/main/subject/modulesmain', storedSubjectID, 'modules', this.moduleID, 'assess', 'question', storedAssessmentID, 'checking']);
  }

  navigateToViewFile(lrnid: any, fname: any, lname: any) {
    const storedSubjectID = localStorage.getItem('classid');
    const storedAssessmentID = localStorage.getItem('assid');
    localStorage.setItem('lrn', lrnid);
    localStorage.setItem('fname', fname);
    localStorage.setItem('lname', lname);
    // Store the subjectID in localStorage
  
    // Navigate to the modules page
    this.router.navigate(['/main/Subject/main/subject/modulesmain', storedSubjectID, 'modules', this.moduleID, 'assess', 'question', storedAssessmentID, 'file']);
  }

}
