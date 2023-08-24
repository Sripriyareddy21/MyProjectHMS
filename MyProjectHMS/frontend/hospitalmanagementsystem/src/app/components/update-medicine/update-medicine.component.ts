
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Medicine } from 'src/app/common/medicine';
import { MedicineService } from 'src/app/services/medicine.service';
@Component({
  selector: 'app-update-medicine',
  templateUrl: './update-medicine.component.html',
  styleUrls: ['./update-medicine.component.css']
})
export class UpdateMedicineComponent implements OnInit {

  id: number;
  medicineForm: FormGroup;
  medicine: Medicine = new Medicine();

  constructor(
    private formBuilder: FormBuilder,
    private medicineService: MedicineService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.medicineForm = this.formBuilder.group({
      id: ['', Validators.required],
      drugName: ['', Validators.required],
      stock: ['', Validators.required]
    });

    this.medicineService.getMedicineById(this.id).subscribe(
      (data) => {
        this.medicine = data;
        this.medicineForm.patchValue(data);
      },
      (error) => console.log(error)
    );
  }

  get formControls() {
    return this.medicineForm.controls;
  }

  onSubmit() {
    this.medicine.id = this.medicineForm.value.id;
    this.medicine.drugName = this.medicineForm.value.drugName;
    this.medicine.stock = this.medicineForm.value.stock;

    this.medicineService.updateMedicine(this.id, this.medicine).subscribe(
      (data) => {
        this.goToMedicineList();
      },
      (error) => console.log(error)
    );
  }

  goToMedicineList() {
    this.router.navigate(['/medicinelist']);
  }
}
