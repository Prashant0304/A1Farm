import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-farmer-registration',
  standalone: false,
  templateUrl: './farmer-registration.html',
  styleUrl: './farmer-registration.css',
})
export class FarmerRegistrationComponent {

  farmerForm: FormGroup;

  districts = ['Bangalore Rural', 'Tumkur', 'Kolar', 'Mandya', 'Mysore'];

  states = ['Karnataka', 'Tamil Nadu', 'Kerala', 'Andhra Pradesh'];

  constructor(private fb: FormBuilder) {
    this.farmerForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      village: [''],
      district: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.farmerForm.valid) {
      console.log(this.farmerForm.value);
    }
  }

}
