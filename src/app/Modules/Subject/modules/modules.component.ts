import { CommonModule, formatDate } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { ApiserviceService } from '../../../apiservice.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modules',
  standalone: true,
  imports: [RouterModule, CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']  // Fixed to styleUrls
})
export class ModulesComponent implements OnInit {

  isLoading: boolean = false; // This controls the loader visibility
  isSubmitting: boolean = false; // Tracks submission state

  isEditMode: boolean = false;
  selectedModuleId: number | null = null;
  
  subjectID: number | null = null;
  storedSubjectID: any;
  modules: any;
  moduls: any;
  classId: any;
  moduleDetails: any;
  isModalOpen = false;

  moduleDate: any;

  today: string = '';

  createModule: FormGroup;
  
  // createModule = new FormGroup({
  //   title: new FormControl(null),
  //   description: new FormControl(null),
  //   date: new FormControl(null),
  //   classid: new FormControl(null)
  // });

  constructor(
    private apiService: ApiserviceService,
    private route: Router, 
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    // Set today's date in 'yyyy-MM-dd' format
    this.today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.createModule = this.fb.group({
      classid: [''], // Initialize with an empty value
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadModules();
    this.isLoading = true;
    
  }

  isModuleOpen(moduleDate: string): boolean {
    const moduleDateParsed = new Date(moduleDate); // Parse the module date
    const todayParsed = new Date(this.today);      // Parse today's date

    // Open the module if the module date is today or in the past
    return moduleDateParsed <= todayParsed;
  }

  // Function to force open a module by updating its date to today's date
  // forceOpenModule(moduleID: number) {
  //   // Call the API to update the module date to today's date
  //   this.apiService.updateModuleDate(moduleID, this.today).subscribe(
  //     (response) => {
  //       Swal.fire({
  //         title: "Success",
  //         text: "Module has been opened",
  //         icon: "success"
  //       });
  //       // Reload the modules to reflect the change
  //       this.getModules(this.storedSubjectID);
  //     },
  //     (error) => {
  //       Swal.fire({
  //         title: "Error",
  //         text: "Failed to open module: " + error,
  //         icon: "error"
  //       });
  //       console.error('Error updating module date:', error);
  //     }
  //   );
  // }

  loadModules() {
    // Simulate data fetching (you can replace this with an actual service call)
    this.storedSubjectID = localStorage.getItem('classid');
    
    this.apiService.getModules(this.storedSubjectID).subscribe((response: any) => {
      this.modules = response;
      console.log('Modules:', this.modules);
      this.isLoading = false;
    });
  }

  // save() {
  //   if (this.createModule.valid) {
  //     this.isSubmitting = true; // Disable the button
  //     this.apiService.createMods(this.createModule.value).subscribe(
  //       (response) => {
  //         Swal.fire({
  //           title: "Success",
  //           text: "Module created",
  //           icon: "success"
  //         });
  //         console.log('Module created:', response);
  //         this.closeModal(); // Close the modal after creation
  //         this.getModules(this.storedSubjectID); // Reload the module list
  //         this.createModule.reset();  // Reset the createModule form
  //         this.isSubmitting = false; // Re-enable the button
  //       },
  //       (error) => {
  //         Swal.fire({
  //           title: "Error",
  //           text: "The date cannot be earlier than today.",
  //           icon: "error"
  //         });
  //         console.error('Error creating module:', error);
  //         this.isSubmitting = false; // Re-enable the button
  //       }
  //     );
  //   }
  // }

  save(): void {
    if (this.createModule.valid) {
        this.isSubmitting = true;

        const moduleData = this.createModule.value;
        console.log(this.moduleDate);
        if (this.isEditMode && this.selectedModuleId) {
            // Call API to update module date
            this.apiService.updateModuleDate(this.selectedModuleId, moduleData ).subscribe(
                (response: any) => {
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
                      title: "Update successfully"
                    });
                    this.getModules(this.storedSubjectID); // Refresh module list
                    this.closeModal();
                },
                (error) => {
                    Swal.fire('Error', 'Failed to update module date: ' + error, 'error');
                }
            );
        } else {
            // Add new module
            this.apiService.createMods(moduleData).subscribe(
                () => {
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
                    title: "Module added successfully"
                  });
                    this.getModules(this.storedSubjectID); // Refresh module list
                    this.closeModal();
                },
                (error) => {
                    Swal.fire('Error', 'Failed to add module: ' + error, 'error');
                }
            );
        }
    }
}

  getModules(id: number) {
    this.apiService.getModules(id).subscribe(
      (response) => {
        this.modules = response;   
        this.moduleDetails = response;
        this.cdr.detectChanges();  // Manually trigger change detection
        console.log('Module Details:', this.moduleDetails);
      },
      (error) => {
        console.error('Error fetching module details:', error);
      }
    );
  }

  // openModal() {
  //   this.isModalOpen = true;

  //   const storedClassId = localStorage.getItem('classid');
  //   if (storedClassId) {
  //     this.createModule.patchValue({ classid: storedClassId });
  //   }
  // }

  openAddModuleModal(): void {
    this.isEditMode = false;
    this.isModalOpen = true;
    this.createModule.reset(); // Clear the form
    const storedClassId = localStorage.getItem('classid');
    if (storedClassId) {
      this.createModule.patchValue({ classid: storedClassId });
    }
  }
  
  openEditModal(module: any): void {
    this.isEditMode = true;
    this.isModalOpen = true;
    this.selectedModuleId = module.modules_id;

    this.moduleDate = module.date;

    // Populate the form with module data
    this.createModule.patchValue({
        classid: localStorage.getItem('classid'),
        title: module.title,
        description: module.description,
        date: module.date // Ensure this is a valid date format
    });
  }

  // closeModal() {
  //   this.isModalOpen = false;
  // }

  closeModal(): void {
    this.isModalOpen = false;
    this.isSubmitting = false;
    this.selectedModuleId = null;
    this.createModule.reset();
  }

  setModuleID(id: any, title: any, description: any) {
    localStorage.setItem('moduleid', id);  // Correctly sets the module id
    localStorage.setItem('moduletitle', title);
    localStorage.setItem('moduledescription', description);
  }
}
