
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from 'src/app/common/patient';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css']
})
export class CreatePatientComponent implements OnInit {

  patientForm: FormGroup;
  patient: Patient = new Patient();

  constructor(private formBuilder: FormBuilder, private patientService: PatientService, private router: Router) { }

  ngOnInit(): void {
    this.patientForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      age: ['', Validators.required],
      blood: ['', Validators.required],
      prescription: ['', Validators.required],
      dose: ['', Validators.required],
      fees: ['', Validators.required],
      urgency: ['', Validators.required]
    });
  }

  get formControls() {
    return this.patientForm.controls;
  }

  savePatient() {
    this.patient.id = this.patientForm.value.id;
    this.patient.name = this.patientForm.value.name;
    this.patient.age = this.patientForm.value.age;
    this.patient.blood = this.patientForm.value.blood;
    this.patient.prescription = this.patientForm.value.prescription;
    this.patient.dose = this.patientForm.value.dose;
    this.patient.fees = this.patientForm.value.fees;
    this.patient.urgency = this.patientForm.value.urgency;

    this.patientService.createPatient(this.patient).subscribe(
      (data) => {
        console.log(data);
        this.goToPatientList();
      },
      (error) => console.log(error)
    );
  }

  goToPatientList() {
    this.router.navigate(['/docdash']);
  }

  onSubmit() {
    this.savePatient();
  }

}

