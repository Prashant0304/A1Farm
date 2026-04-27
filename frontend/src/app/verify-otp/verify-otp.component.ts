import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FarmerRegService } from '../services/farmer-reg.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css'],
})
export class VerifyOtpComponent {
  otpForm: FormGroup;
  phone: string = '';

  constructor(
    private fb: FormBuilder,
    private farmerregservice: FarmerRegService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<VerifyOtpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.phone = data.phone;

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  verifyOtp() {
    if (this.otpForm.invalid) return;

    const payload = {
      phone: this.phone,
      otp: this.otpForm.value.otp,
    };

    this.farmerregservice.verifyOtp(payload).subscribe({
      next: () => {
        this.toastr.success('Farmer verified successfully');

        // close popup
        this.dialogRef.close(true);
      },

      error: () => {
        this.toastr.error('Invalid OTP');
      },
    });
  }
}
