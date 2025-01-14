import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';
import { CommonModule } from '@angular/common';
import { EditorComponent} from '@tinymce/tinymce-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addmat',
  standalone: true,
  imports: [RouterModule, CommonModule, MatFormFieldModule, MatInputModule, MatIconModule,ReactiveFormsModule, EditorComponent],
  templateUrl: './addmat.component.html',
  styleUrl: './addmat.component.css'
})
export class AddmatComponent implements OnInit {
  isSubmitting: boolean = false; // Tracks submission state
  storedModuleID: any;
  subjectID: any;
  selectedFile: File | null = null; // Holds the selected file

  createLesson: FormGroup;

  // createLesson = new FormGroup({
  //   modules_id: new FormControl(localStorage.getItem('moduleid')),
  //   topic_title: new FormControl(null),
  //   lesson: new FormControl(null),
  // });

  constructor(
    private apiService: ApiserviceService,
    private route: Router,
  ) {
    this.createLesson = new FormGroup({
      modules_id: new FormControl(localStorage.getItem('moduleid')),
      topic_title: new FormControl(null),
      lesson: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.subjectID = localStorage.getItem('classid');
    this.storedModuleID = localStorage.getItem('moduleid');
  }

  onEditorInit(event: any): void {
    const editor = event.editor;

    // Set initial content from FormControl
    editor.setContent(this.createLesson.get('lesson')?.value || '');

    // Update FormControl on content change
    editor.on('keyup change', () => {
      this.createLesson.get('lesson')?.setValue(editor.getContent());
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  save() {
    const storedSubjectID = localStorage.getItem('classid');
    const storedModuleID = localStorage.getItem('moduleid');
    const formData = new FormData();
    console.log('Module ID:', this.createLesson.value.modules_id); 
    formData.append('module_id', this.createLesson.value.modules_id!);
    formData.append('topic_title', this.createLesson.value.topic_title!);
    formData.append('lesson', this.createLesson.value.lesson!);

    if (this.selectedFile) {
      formData.append('file', this.selectedFile); // Append the file to form data
    }

    this.isSubmitting = true; // Disable the button

    this.apiService.createTopic(formData).subscribe(
      (response) => {
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
            title: "Lesson added"
          });
        console.log('Lesson created successfully:', response);
        this.route.navigate(['/main/Subject/main/subject/modulesmain', storedSubjectID, 'modules', storedModuleID, 'mat']); // Redirect on success
        this.isSubmitting = false;
      },
      (error) => {
        Swal.fire({
          title: "Error",
          text: "Error Creating lesson: " + error,
          icon: "error"
        });
        console.error('Error creating lesson:', error);
        this.isSubmitting = false;
      }
    );
  }
}
