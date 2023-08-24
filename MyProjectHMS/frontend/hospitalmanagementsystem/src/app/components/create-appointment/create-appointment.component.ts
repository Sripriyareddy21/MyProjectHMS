
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/common/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;

  appointment: Appointment = new Appointment();
  

  constructor(private formBuilder: FormBuilder,private appointmentService: AppointmentService,
    private router: Router) { }

  
  ngOnInit(): void {
    this.appointmentForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-z]*$')]],
      age: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      symptoms: ['', Validators.required],
      number: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  get formControls() {
    return this.appointmentForm.controls;
  }

  saveAppointment() {
    
    this.appointment.id = this.appointmentForm.value.id;
    this.appointment.name = this.appointmentForm.value.name;
    this.appointment.age = this.appointmentForm.value.age;
    this.appointment.symptoms = this.appointmentForm.value.symptoms;
    this.appointment.number = this.appointmentForm.value.number;

    this.appointmentService.createAppointment(this.appointment).subscribe(
      (data) => {
        console.log(data);
        this.goToAppointmentList();
      },
      (error) => console.log(error)
    );
  }


  goToAppointmentList() {
    this.router.navigate(['/appointmentlist'])
  }

  onSubmit() {
    console.log(this.appointment);
    this.saveAppointment();
  }

}