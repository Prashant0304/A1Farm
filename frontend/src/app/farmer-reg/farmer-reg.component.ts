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
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { VerifyOtpComponent } from '../verify-otp/verify-otp.component';

@Component({
  selector: 'app-farmer-reg',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './farmer-reg.component.html',
  styleUrls: ['./farmer-reg.component.css'],
})
export class FarmerRegComponent {
  farmerForm: FormGroup;

  districts: any[] = [];

  states: any[] = [];

  constructor(
    private fb: FormBuilder,
    private farmerregservice: FarmerRegService,
    private toastr: ToastrService,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.farmerForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      village: [''],
      districtId: ['', Validators.required],
      stateId: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.farmerForm.valid) {
      console.log(this.farmerForm.value);
      const data = {
        ...this.farmerForm.value,
        FarmerId: 0,
      };
      this.farmerregservice.addFarmer(data).subscribe({
        next: (data) => {
          console.log(data);
          this.toastr.success(
            'Farmer registered successfully & OTP sent to mobile',
            'Sucess',
          );
          const dialogRef = this.dialog.open(VerifyOtpComponent, {
            width: '400px',
            disableClose: true,
            data: {
              phone: this.farmerForm.value.phone,
            },
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  ngOnInit() {
    this.loadStates();
  }

  loadStates() {
    this.farmerregservice.getStates().subscribe((res) => {
      this.states = res;
    });
  }

  onStateChange() {
    const stateId = this.farmerForm.get('stateId')?.value;

    this.farmerregservice.getDistricts(stateId).subscribe((res) => {
      this.districts = res;
    });
  }
}
