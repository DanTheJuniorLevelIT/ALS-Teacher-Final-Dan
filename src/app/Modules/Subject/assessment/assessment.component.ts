import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assessment',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.css'
})
export class AssessmentComponent implements OnInit{

  classID: number | null = null;
  authtoken: any;
  moduleID: any;
  moduleTitle: any;

  isEditModalOpen = false; // To control edit modal visibility
  isSubmitting: boolean = false;
  
  lessons:any;
  lesson: any;
  LessonDetails: any;
  assess: any;

  isModalOpen = false;

  editAssessmentForm: FormGroup;

  createAssessment = new FormGroup({
    title: new FormControl(null),
    lesson_id: new FormControl(null),
    instruction: new FormControl(null),
    description: new FormControl(null),
    due_date: new FormControl(null)
  })

  constructor(private apiService: ApiserviceService, private router: Router, private fb: FormBuilder) {
    this.editAssessmentForm = this.fb.group({
      assessmentID: [''], // Hidden field for the ID
      title: ['', Validators.required],
      instruction: ['', Validators.required],
      description: ['', Validators.required],
      due_date: ['', Validators.required],
  });
  }

  ngOnInit(): void {
    // Retrieve the classID from localStorage
    const storedClasstID = localStorage.getItem('classid');
    const token = localStorage.getItem('authToken');
    this.authtoken = token;
    const storedModuleID = localStorage.getItem('moduleid');
    const storedModuleTitle = localStorage.getItem('moduletitle');
    if (storedClasstID) {
      this.classID = +storedClasstID;  // Convert the string to a number
      this.moduleID = storedModuleID;
      this.moduleTitle = storedModuleTitle;  // Convert the string to a number  // Convert the string to a number
      this.loadAssessments(this.classID);
      console.log('Retrieved Subject ID from localStorage:', this.classID);
    } else {
      console.error('No classID found in localStorage.');
    }

    
  }

  loadAssessments(cid: any){
    this.apiService.getAssessmentsByClass(cid).subscribe((response: any)=>{
      this.assess = response;
      console.log(this.assess)
    })
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // Open edit modal and populate form with assessment details
  editAssessment(id: any) {
    this.apiService.getSingleAssessment(id).subscribe((assessment: any) => {
        this.editAssessmentForm.patchValue({
            assessmentID: assessment.assessmentid,
            title: assessment.title,
            instruction: assessment.instruction,
            description: assessment.description,
            due_date: assessment.due_date,
        });
        // localStorage.setItem('aid', assessment.assessmentid)
        this.isEditModalOpen = true;
    });
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  saveEditedAssessment() {
    this.isSubmitting = true;
    // console.log(localStorage.getItem('aid'));
    if (this.editAssessmentForm.valid) {
        const updatedAssessment = this.editAssessmentForm.value;
        this.apiService.updateAssessment(updatedAssessment.assessmentID, updatedAssessment).subscribe(
            (response: any) => {
                console.log('Assessment updated successfully', response);
                this.loadAssessments(this.classID); // Refresh the list
                Swal.fire({
                  title: "Updated Assessment",
                  icon: "success"
                });
                this.isEditModalOpen = false;
                this.isSubmitting = false; // Close modal
            },
            (error) => {
                console.error('Error updating assessment:', error);
                Swal.fire({
                  title: "Error Updating Assessment",
                  icon: "error"
                });
                this.isSubmitting = false; 
            }
        );
    }
  }

  // loadAssessmentss(): void {
  //   this.apiService.getAssessment().subscribe(
  //     (response: any) => {
  //       this.assess = response; // Assign assessments
  //       console.log('Assessments:', this.assess);
  
  //       this.lessons.forEach((lesson: any) => {
  //         lesson.filteredAssessments = this.assess.filter(
  //           (a: any) => a.lesson_id === lesson.lesson_id
  //         );
  //       });
  
  //       // this.checkLoadingComplete(); // Check if loading is complete
  //     },
  //     (error) => {
  //       console.error('Error fetching assessments:', error);
  //       // this.checkLoadingComplete(); // Ensure loader hides even on error
  //     }
  //   );
  // }

  navigateToQuestions(assID: number, lessTitle: any) {
    const storedSubjectID = localStorage.getItem('classid');
    // Store the subjectID in localStorage
    localStorage.setItem('assid', assID.toString());
    localStorage.setItem('lessTitle', lessTitle);

    // Navigate to the modules page
    // this.route.navigate(['/main/Subject/main/subject/modulesmain', subjectID, 'modules']);
    this.router.navigate(['/main/Subject/main/subject/modulesmain', storedSubjectID, 'modules', this.moduleID, 'assess', 'question', assID]);
  }

  navigateToProgress(assID: number, lessTitle: any, assessTitle: any) {
    const storedSubjectID = localStorage.getItem('classid');
    // Store the subjectID in localStorage
    localStorage.setItem('assid', assID.toString());
    localStorage.setItem('lessTitle', lessTitle);
    localStorage.setItem('assessTitle', assessTitle);

    // Navigate to the modules page
    // this.route.navigate(['/main/Subject/main/subject/modulesmain', subjectID, 'modules']);
    this.router.navigate(['/main/Subject/main/subject/modulesmain', storedSubjectID, 'modules', this.moduleID, 'assess', 'question', assID, 'progress']);
  }

}
