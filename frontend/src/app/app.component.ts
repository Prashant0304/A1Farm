import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FarmerRegComponent } from './farmer-reg/farmer-reg.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FarmerRegComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'A1Farm';
}
