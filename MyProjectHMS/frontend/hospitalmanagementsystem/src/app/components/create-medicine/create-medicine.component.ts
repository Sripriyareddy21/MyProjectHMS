
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Medicine } from 'src/app/common/medicine';
import { MedicineService } from 'src/app/services/medicine.service';

@Component({
  selector: 'app-create-medicine',
  templateUrl: './create-medicine.component.html',
  styleUrls: ['./create-medicine.component.css']
})
export class CreateMedicineComponent implements OnInit {

  medicineForm: FormGroup;
  medicine: Medicine = new Medicine();

  constructor(private formBuilder: FormBuilder, private medicineService: MedicineService, private router: Router) { }

  ngOnInit(): void {
    this.medicineForm = this.formBuilder.group({
      id: ['', Validators.required],
      drugName: ['', Validators.required],
      stock: ['', Validators.required]
    });
  }

  get formControls() {
    return this.medicineForm.controls;
  }

  saveMedicine() {
    this.medicine.id = this.medicineForm.value.id;
    this.medicine.drugName = this.medicineForm.value.drugName;
    this.medicine.stock = this.medicineForm.value.stock;

    this.medicineService.createMedicine(this.medicine).subscribe(
      (data) => {
        console.log(data);
        this.goToMedicineList();
      },
      (error) => console.log(error)
    );
  }

  goToMedicineList() {
    this.router.navigate(['/medicinelist']);
  }

  onSubmit() {
    this.saveMedicine();
  }

}
