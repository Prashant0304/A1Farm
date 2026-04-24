import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FarmerRegService } from '../services/farmer-reg.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-farmer-reg',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './farmer-reg.component.html',
  styleUrls: ['./farmer-reg.component.css'],
})
export class FarmerRegComponent {
  farmerForm: FormGroup;

  districts = ['Bangalore Rural', 'Tumkur', 'Kolar', 'Mandya', 'Mysore'];

  states = ['Karnataka', 'Tamil Nadu', 'Kerala', 'Andhra Pradesh'];

  constructor(
    private fb: FormBuilder,
    private farmerregservice: FarmerRegService,
    private toastr: ToastrService,
  ) {
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
      const data = {
        ...this.farmerForm.value,
        FarmerId: 0,
        StateId: 1,
        DistrictId: 1,
      };
      this.farmerregservice.addFarmer(data).subscribe({
        next: (data) => {
          console.log(data);
          this.toastr.success('Farmer registered successfully', 'Sucess');
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
