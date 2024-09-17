import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {

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
  // Retrieve the subjectID from localStorage
  const storedSubjectID = localStorage.getItem('subjectID');
    const storedAssessmentID = localStorage.getItem('assid');
    const storedModuleID = localStorage.getItem('moduleid');
    if (storedSubjectID) {
      this.moduleID = storedModuleID;
      this.subjectID = +storedSubjectID;  // Convert the string to a number
      this.assessmentID = storedAssessmentID;
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
      // this.students = data.score;
      console.log("Students: ", data.status);
    },
    (error) => {
      console.error('Error fetching students', error);
    }
  );
}


//1st Approach
// autoCheck() {
//   this.apiserv.autoCheck(this.subjectID, this.assessmentID).subscribe(
//     (data) => {
//       // Update the students list with the completion and score data
//       this.students = data;
//       console.log('Auto Check Completed', data);
//     },
//     (error) => {
//       console.error('Error performing auto-check', error);
//     }
//   );
// }

//2nd Approach
autoCheck() {
  this.apiserv.autoCheck(this.subjectID, this.assessmentID).subscribe(
    (response: any) => {
      console.log('Auto check completed:', response);
      this.students = response.score;
      this.students = response.status;
      // After auto-check, reload the student data to get updated scores
    },
    (error) => {
      console.error('Error during auto-check:', error);
    }
  );
}


  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  navigateToChecking(lrnid: any) {
    const storedSubjectID = localStorage.getItem('subjectID');
    const storedAssessmentID = localStorage.getItem('assid');
    localStorage.setItem('lrn', lrnid);
    // Store the subjectID in localStorage
  
    // Navigate to the modules page
    // this.route.navigate(['/main/Subject/main/subject/modulesmain', subjectID, 'modules']);
    this.router.navigate(['/main/Subject/main/subject/modulesmain', storedSubjectID, 'modules', this.moduleID, 'assess', 'question', storedAssessmentID, 'checking']);
  }

}
