import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-discuss',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './discuss.component.html',
  styleUrl: './discuss.component.css'
})
export class DiscussComponent implements OnInit{

  isLoading: boolean = false; // This controls the loader visibility
  isSubmitting: boolean = false; // Tracks submission state

  subjectID: number | null = null;
  moduleID: any;
  moduleTitle: any;
  lessonTitle: any;
  lessonid: any;
  discuss: any;
  lessons: any;
  assess: any;

  isModalOpen = false;

  createDiscussion = new FormGroup({
    lesson_id: new FormControl(localStorage.getItem('idLesson')),
    discussion_topic: new FormControl(null)
  })

  constructor(private apiService: ApiserviceService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Retrieve the subjectID from localStorage
    this.isLoading = true;
    const storedSubjectID = localStorage.getItem('classid');
    const storedModuleID = localStorage.getItem('moduleid');
    const storedModuleTitle = localStorage.getItem('moduletitle');
    const storedLessonID = localStorage.getItem('idLesson');
    const storedLessonTitle = localStorage.getItem('lessonTitle');
    if (storedSubjectID) {
      this.subjectID = +storedSubjectID;  // Convert the string to a number
      this.moduleID = storedModuleID;  // Convert the string to a number
      this.moduleTitle = storedModuleTitle;  // Convert the string to a number
      this.lessonTitle = storedLessonTitle;
      this.lessonid = storedLessonID;
      this.apiService.getLessons(this.moduleID).subscribe((response: any) => {
        this.lessons = response.lessons;
        console.log('Lesson: ', this.lessons);
        this.loadDiscussion(localStorage.getItem);
        // After lessons are loaded, load discussions
        // Get lessonId from query params
        if (storedLessonID) {
          this.loadDiscussion(storedLessonID);
        }
      });
      console.log('Retrieved Subject ID from localStorage:', this.subjectID);
    } else {
      console.error('No subjectID found in localStorage.');
    }
  }

  loadDiscussion(lessonid: any) {
    this.apiService.getDiscussion(lessonid).subscribe(
      (response: any) => {
        this.discuss = response;
  
        // Now, we will filter the discussions by lesson_id for each lesson
        this.lessons.forEach((lesson: any) => {
          lesson.filteredDiscussions = this.discuss.filter(
            (discussion: any) => discussion.lesson_id === lesson.lesson_id
          );
        });
  
        this.isLoading = false;
        console.log('Discussions:', this.discuss);
      },
      (error) => {
        console.error('Error fetching discussions:', error);
      }
    );
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  save(){
    this.isSubmitting = true;
    this.apiService.createDiscussion(this.createDiscussion.value).subscribe((response: any)=>{
      console.log("Discussion Created: ", response)
      Swal.fire({
        title: "Added New Discussion",
        icon: "success"
      });
      this.closeModal();
      this.loadDiscussion(this.lessonid);
      this.createDiscussion.get('discussion_topic')?.reset();
      this.isSubmitting = false;
    })
  }

  navigateToDiscussions(did: any, disctopic: any, date: any, lesTitle: any) {
    const storedSubjectID = localStorage.getItem('classid');
    // Store the subjectID in localStorage
    localStorage.setItem('discussionid', did);
    localStorage.setItem('disctopic', disctopic);
    localStorage.setItem('date', date);
    localStorage.setItem('lessTitle', lesTitle);

    // Navigate to the modules page
    this.router.navigate(['/main/Subject/main/subject/modulesmain', storedSubjectID, 'modules', this.moduleID, 'discuss', did, 'discussion']);
  }

}
