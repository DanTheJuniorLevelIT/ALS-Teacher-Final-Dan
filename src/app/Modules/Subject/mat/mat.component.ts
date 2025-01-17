import { CommonModule, ViewportScroller } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mat',
  standalone: true,
  imports: [CommonModule,RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './mat.component.html',
  styleUrl: './mat.component.css'
})

export class MatComponent implements OnInit{

  isLoading: boolean = false; // This controls the loader visibility
  isEditModalOpen = false; // To control edit modal visibility
  isSubmitting: boolean = false; // Tracks submission state

  subjectID: number | null = null;
  moduleID: any;
  assess:any;
  assessment: any;
  moduleTitle: any;
  LessonID:any;
  cDiscussion: any;
  LessonDetails:any;
  storedSubjectID:any;
  lessons:any;
  selectLessonID:any;

  constructor(
    private apiService: ApiserviceService, 
    private route: ActivatedRoute, 
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private viewportScroller: ViewportScroller,
    private fb: FormBuilder
  ) {
    this.editAssessmentForm = this.fb.group({
      assessmentID: [''], // Hidden field for the ID
      title: ['', Validators.required],
      instruction: ['', Validators.required],
      description: ['', Validators.required],
      due_date: ['', Validators.required],
  });
  }

  editAssessmentForm: FormGroup; // Reactive form for editing

  createAssessment = new FormGroup({
    title: new FormControl(null),
    lesson_id: new FormControl(null),
    instruction: new FormControl(null),
    description: new FormControl(null),
    due_date: new FormControl(null)
  })

  isModalOpen2 = false;

  //NEW
  ngOnInit(): void {
    this.isLoading = true; // Show the loader at the start
  
    // Retrieve subjectID, moduleID, and moduleTitle from localStorage
    const storedSubjectID = localStorage.getItem('classid');
    const storedModuleID = localStorage.getItem('moduleid');
    const storedModuleTitle = localStorage.getItem('moduletitle');
  
    if (storedSubjectID) {
      this.subjectID = +storedSubjectID; // Convert the string to a number
      this.moduleID = storedModuleID;
      this.moduleTitle = storedModuleTitle;
  
      // Load lessons and their related assessments
      this.loadMaterials(this.moduleID);
    } else {
      console.error('No subjectID found in localStorage.');
    }
  
    // Scroll to anchor if fragment exists
    this.route.fragment.subscribe((fragment: any) => {
      if (fragment) {
        this.viewportScroller.scrollToAnchor(fragment);
      }
    });
  
    // Load assessments
    this.loadAssessments();
  }

  //NEW
  loadMaterials(id:any): void {
    this.apiService.getLessons(id).subscribe(
      (response: any) => {
        this.lessons = response.lessons;
        console.log('Lessons:', this.lessons);
  
        this.lessons.forEach((lesson: any) => {
          this.countDiscussion(lesson); // Count discussions for each lesson
          lesson.filteredAssessments = this.assess.filter(
            (a: any) => a.lesson_id === lesson.lesson_id
          );
        });
  
        this.checkLoadingComplete(); // Check if loading is complete
      },
      (error) => {
        console.error('Error fetching lessons:', error);
        this.checkLoadingComplete(); // Ensure loader hides even on error
      }
    );
  }

  transformText(text: string): string {
    // Split text into paragraphs by double newlines or line breaks
    let paragraphs = text.split(/\n\s*\n/);
  
    // For each paragraph, add <p> tags, and within each paragraph add <br> after each period
    return paragraphs
      .map(paragraph => paragraph.replace(/\.\s*/g, '.<br>')) // Add <br> after each period
      .map(paragraph => `<p>${paragraph}</p>`) // Wrap each transformed paragraph in <p> tags
      .join(''); // Join all paragraphs together
  }

  //NEW
  showLessons(id: any): void {
    this.apiService.getLessons(id).subscribe(
      (response: any) => {
        this.lessons = response.lessons;
        console.log('Lessons:', this.lessons);
  
        this.lessons.forEach((lesson: any) => {
          this.countDiscussion(lesson); // Count discussions for each lesson
          lesson.filteredAssessments = this.assess.filter(
            (a: any) => a.lesson_id === lesson.lesson_id
          );
        });
  
        this.checkLoadingComplete(); // Check if loading is complete
      },
      (error) => {
        console.error('Error fetching lessons:', error);
        this.checkLoadingComplete(); // Ensure loader hides even on error
      }
    );
  }

  getLessons(id: number) {
    this.apiService.getLessons(id).subscribe(
      (response) => {
        this.lessons = response;   
        this.LessonDetails = response;
        this.cdr.detectChanges();  
        console.log('Lessons Details:', this.LessonDetails);

          this.lessons.forEach((lesson: any) => {
          lesson.filteredAssessments = this.assess.filter(
            (a: any) => a.lesson_id === lesson.lesson_id
          );
        });
      },
      (error) => {
        console.error('Error fetching lesson details:', error);
      }
    );
  }

  //NEW
  loadAssessments(): void {
    this.apiService.getAssessment().subscribe(
      (response: any) => {
        this.assess = response; // Assign assessments
        console.log('Assessments:', this.assess);
  
        this.lessons.forEach((lesson: any) => {
          lesson.filteredAssessments = this.assess.filter(
            (a: any) => a.lesson_id === lesson.lesson_id
          );
        });
  
        this.checkLoadingComplete(); // Check if loading is complete
      },
      (error) => {
        console.error('Error fetching assessments:', error);
        this.checkLoadingComplete(); // Ensure loader hides even on error
      }
    );
  }

  // Helper method to check if all async operations are done
checkLoadingComplete(): void {
  if (
    this.lessons !== undefined &&
    this.assess !== undefined
  ) {
    this.isLoading = false; // Hide the loader when all data is fetched
  }
}

  countDiscussion(lesson: any){
    localStorage.setItem('lessonid', lesson.lesson_id)
    console.log('lesson ID: ' + lesson);
    this.apiService.countDiscussion(lesson.lesson_id).subscribe((response: any)=>{
      lesson.cDiscussion = response;
    })
  }

  setLessonID(lesson: any) {
    localStorage.setItem('idLesson', lesson.lesson_id);
    localStorage.setItem('lessonTitle', lesson.topic_title);
  }

  openModal2(lessonid: any) {
    this.isModalOpen2 = true;
    this.LessonID = lessonid;
    this.createAssessment = new FormGroup({
      title: new FormControl(null),
      lesson_id: new FormControl(this.LessonID),
      instruction: new FormControl(null),
      description: new FormControl(null),
      due_date: new FormControl(null)
    })
  }
  
  closeModal2() {
    this.isModalOpen2 = false;
  }

  toggleDropdown(lesson: any) {
    lesson.isDropdownOpen = !lesson.isDropdownOpen;
  }

  save() {
    this.isSubmitting = true;
    if (this.createAssessment.valid) {
      this.isSubmitting = true; // Disable the button
      this.apiService.createAssess(this.createAssessment.value).subscribe(
        response => {
          console.log('Assessment created:', response);
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
              title: "Added new assessment"
            });
          this.loadAssessments();
          this.closeModal2(); // Close the modal
          this.isSubmitting = false;
        },
        error => {
          console.error('Error creating assessment:', error);
          Swal.fire({
            title: 'The due date cannot be earlier than today.',
            icon: "error"
          });
          this.isSubmitting = false;
        }
      );
    } else {
      console.error('Form is not valid');
      Swal.fire({
        title: "A Form is not valid",
        icon: "error"
      });
      this.isSubmitting = false;
    }
  }

  toggleAssessmentStatus(assessment: any) {
    // Check if assessment is closed and needs to be reopened
    if (!assessment.isOpen) {
      // Set a new due date (e.g., one day from today)
      const newDueDate = this.calculateNewDueDate();
      const newStatus = assessment.available === 0 ? 1 : 0;
  
      // Call the API to update the due date
      this.apiService.updateAvailability(assessment.assessmentID, newStatus).subscribe(
        (response: any) => {
          console.log(response.message);
          // Update the UI to reflect the change
          assessment.isOpen = true;
          assessment.available = newStatus;
        },
        (error) => {
          console.error('Error updating due date:', error);
        }
      );
    } else {
      // Logic for closing the assessment (if needed)
      assessment.isOpen = false;
    }
  }
  
  calculateNewDueDate(): string {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1); // Add 1 day
    return currentDate.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
  }
  

  navigateToQuestions(assID: number, lessTitle: any) {
    const storedSubjectID = localStorage.getItem('classid');
    // Store the subjectID in localStorage
    localStorage.setItem('assid', assID.toString());
    localStorage.setItem('lessTitle', lessTitle);

    // Navigate to the modules page
    this.router.navigate(['/main/Subject/main/subject/modulesmain', storedSubjectID, 'modules', this.moduleID, 'assess', 'question', assID]);
  }

  updateLesson(modules_id: any) {
    this.selectLessonID = modules_id;
    console.log('Selected Lesson ID', this.selectLessonID);
    localStorage.setItem('Lesson Id', this.selectLessonID )
  }

  uploadFile(modules_id: any) {
    this.selectLessonID = modules_id;
    console.log('Selected Lesson ID', this.selectLessonID);
    localStorage.setItem('Lesson Id', this.selectLessonID )
  }
  
  deleteLesson(lesson: any) {
    // Show confirmation dialog using SweetAlert
    Swal.fire({
      title: `Are you sure you want to delete the lesson: "${lesson.topic_title}"?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      // If user confirms deletion
      if (result.isConfirmed) {
        // Call the delete API
        this.apiService.deleteLesson(lesson.lesson_id).subscribe(
          (response) => {
            // Success response handling
            console.log('Lesson deleted:', response);
            // Remove the deleted lesson from the list
            this.showLessons(this.moduleID);
            this.cdr.detectChanges();
  
            // Show success alert
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "success",
              title: "Deleted!"
            });
          },
          (error) => {
            // Error response handling
            console.error('Error deleting lesson:', error);
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting the lesson. Please try again.",
              icon: "error"
            });
          }
        );
      }
    });
  }

  deleteAssessment(id: any){
    console.log(id);
    // Show confirmation dialog using SweetAlert
    Swal.fire({
      title: "Are you sure you want to delete this Assessment?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      // If user confirms deletion
      if (result.isConfirmed) {
        // Call the delete API
        this.apiService.deleteAssessment(id).subscribe(
          (response) => {
            // Success response handling
            console.log('Lesson deleted:', response);
            // Remove the deleted lesson from the list
            this.loadAssessments();
            this.cdr.detectChanges();
  
            // Show success alert
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "success",
              title: "Deleted"
            });
          },
          (error) => {
            // Error response handling
            console.error('Error deleting assessment:', error);
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting the assessment. Please try again.",
              icon: "error"
            });
          }
        );
      }
    });
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
        this.isEditModalOpen = true;
    });
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }
  
  // Save edited assessment
  saveEditedAssessment() {
    if (this.editAssessmentForm.valid) {
        const updatedAssessment = this.editAssessmentForm.value;
        this.apiService.updateAssessment(updatedAssessment.assessmentID, updatedAssessment).subscribe(
            (response: any) => {
                console.log('Assessment updated successfully', response);
                this.loadAssessments(); // Refresh the list
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
                  title: "Updated assessment"
                });
                this.isEditModalOpen = false; // Close modal
            },
            (error) => {
                console.error('Error updating assessment:', error);
                Swal.fire({
                  title: "Error Updating Assessment",
                  icon: "error"
                });
            }
        );
    }
  }

  deleteFile(lesson_id: number) {
    // Show confirmation dialog using SweetAlert
    Swal.fire({
      title: "Are you sure you want to delete this file?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      // If user confirms deletion
      if (result.isConfirmed) {
        // Call the delete API for file deletion
        this.apiService.deleteFile(lesson_id).subscribe(
          (response) => {
            // Success response handling
            console.log('File deleted:', response);
            
            // Find the lesson in the lessons array and set its file property to null
            this.showLessons(this.moduleID);
            this.cdr.detectChanges();  // Manually trigger change detection
  
            // Show success alert
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "success",
              title: "Deleted"
            });
            this.getLessons(this.moduleID);
          },
          (error) => {
            // Error response handling
            console.error('Error deleting file:', error);
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting the file. Please try again.",
              icon: "error"
            });
          }
        );
      }
    });
  }  

  deleteMediaFile(mediaId: string) {
    Swal.fire({
      title: "Are you sure you want to delete this file?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      // If user confirms deletion
      if (result.isConfirmed) {
        // Call the delete API for file deletion
        this.apiService.deleteMediaFile(mediaId).subscribe(
          (response) => {
            // Success response handling
            console.log('File deleted:', response);
            // Show success alert
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "success",
              title: "Deleted"
            });
            this.getLessons(this.moduleID);
            this.showLessons(this.moduleID);
            this.loadAssessments();
          },
          (error) => {
            // Error response handling
            console.error('Error deleting file:', error);
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting the file. Please try again.",
              icon: "error"
            });
          }
        );
      }
    });
}

}
