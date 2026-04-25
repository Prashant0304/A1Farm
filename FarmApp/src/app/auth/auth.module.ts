import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmerRegistrationComponent } from './farmer-registration/farmer-registration';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
   
      { path: '', redirectTo: 'farmer-registration', pathMatch: 'full' },
      { path: 'farmer-registration', component: FarmerRegistrationComponent },
      

    
  
];

@NgModule({
  declarations: [
    FarmerRegistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule, 
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
