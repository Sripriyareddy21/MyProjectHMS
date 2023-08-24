

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from 'src/app/common/patient';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent implements OnInit {

  id: number;
  patientForm: FormGroup;
  patient: Patient = new Patient();

  constructor(private formBuilder: FormBuilder, private patientService: PatientService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

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

    this.patientService.getPatientById(this.id).subscribe(
      (data) => {
        this.patient = data;
        this.patientForm.patchValue(data);
      },
      (error) => console.log(error)
    );
  }

  get formControls() {
    return this.patientForm.controls;
  }

  onSubmit() {
    this.patientService.updatePatient(this.id, this.patientForm.value).subscribe(
      (data) => {
        this.goToPatientList();
      },
      (error) => console.log(error)
    );
  }
  
  

  goToPatientList() {
    this.router.navigate(['/docdash']);
  }
}

