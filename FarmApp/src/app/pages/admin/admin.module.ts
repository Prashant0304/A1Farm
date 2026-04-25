import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddContract } from './add-contract/add-contract';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  
      { path: '', redirectTo: 'add-contract', pathMatch: 'full' },
      { path: 'add-contract', component: AddContract },
      

    
  
];

@NgModule({
  declarations: [
    AddContract
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
  ]
})
export class AdminModule { }
