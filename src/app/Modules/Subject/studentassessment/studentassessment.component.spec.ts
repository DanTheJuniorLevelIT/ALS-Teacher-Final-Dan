import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentassessmentComponent } from './studentassessment.component';

describe('StudentassessmentComponent', () => {
  let component: StudentassessmentComponent;
  let fixture: ComponentFixture<StudentassessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentassessmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentassessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
