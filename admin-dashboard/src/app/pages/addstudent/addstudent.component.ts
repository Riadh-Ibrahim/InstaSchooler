import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-student',
  templateUrl: 'addstudent.component.html',
  styleUrls: ['./addstudent.component.scss'],
})
export class AddStudentComponent implements OnInit {
  studentForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      studentName: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      }),
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      nationality: ['', Validators.required],
      category: ['', Validators.required],
      religion: ['', Validators.required],
      contactDetails: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        phone: [''],
        mobileNo: ['', Validators.required],
        photo: [''],
        address: [''],
      }),
      officialDetails: this.fb.group({
        admissionNo: ['', Validators.required],
        joiningDate: ['', Validators.required],
        rollNo: ['', Validators.required],
      }),
      parentDetails: this.fb.group({
        parentName: this.fb.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
        }),
        relation: ['', Validators.required],
        occupation: [''],
        email: ['', [Validators.required, Validators.email]],
        phone: [''],
        mobileNo: [''],
        parentAddress: [''],
        sameAddress: [false],
      }),
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      console.log(this.studentForm.value);
      // Traitement des données
    }
  }
}
