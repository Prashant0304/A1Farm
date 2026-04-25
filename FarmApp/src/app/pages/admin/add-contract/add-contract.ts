import { Component } from '@angular/core';
import { ContractService } from './contract';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-add-contract',
  standalone: false,
  templateUrl: './add-contract.html',
  styleUrl: './add-contract.css',
})
export class AddContract {

  
  searchText = '';
  searchSubject = new Subject<string>();

  selectedFarmer: any;
  lands: any[] = [];
  crops: any[] = [];
  farmers: any[] = [];

  form = {
    farmerId: 0,
    landId: 0,
    cropId: 0,
    startDate: '',
    endDate: '',
    rate: 0,
    yield: 0
  };

  constructor(private farmService: ContractService) {}

  ngOnInit() {
    this.loadCrops();

    // ✅ debounce search (production level)
    this.searchSubject.pipe(debounceTime(400))
      .subscribe(value => this.searchFarmer(value));
  }

  // 🔍 Triggered on typing
  onSearchChange() {
    if (this.searchText.length < 4) return;
    this.searchSubject.next(this.searchText);
  }

  // 🔎 API call
  searchFarmer(search: string) {
  this.farmService.getFarmers(search).subscribe({
    next: (res: any) => {
      console.log('API response:', res); // 👈 debug once
      this.farmers = res.data.map((f: any) => ({
  farmerId: f.FarmerId,
  name: f.Name,
  phone: f.Phone
}));           // ✅ IMPORTANT
    },
    error: (err) => {
      console.error(err);
      this.farmers = [];
    }
  });
}

  // 🌾 Load lands
  loadLands(farmerId: number) {
  this.farmService.getLandsByFarmerId(farmerId)
    .subscribe((res: any[]) => {

      this.lands = res.map(l => ({
        landId: l.LandId,
        landLocation: l.LandLocation,
        soilType: l.SoilType,
        waterSource: l.WaterSource
      }));

    });
}

  // 🌱 Load crops
  loadCrops() {
    this.farmService.getCrops().subscribe(res => {
      this.crops = res.data;
    });
  }

  // 💾 Save
  saveContract() {

    if (!this.form.farmerId || !this.form.landId || !this.form.cropId) {
      alert('Please fill all required fields');
      return;
    }

    this.farmService.saveContract({
      contractId: 0,
      farmerId: this.form.farmerId,
      cropId: this.form.cropId,
      landId: this.form.landId,
      startDate: this.form.startDate,
      endDate: this.form.endDate,
      rate: this.form.rate,
      yield: this.form.yield,
      userId: 1
    }).subscribe({
      next: () => {
        alert('✅ Contract saved successfully');

        // reset form
        this.form = {
          farmerId: 0,
          landId: 0,
          cropId: 0,
          startDate: '',
          endDate: '',
          rate: 0,
          yield: 0
        };
        this.selectedFarmer = null;
      },
      error: () => {
        alert('❌ Error saving contract');
      }
    });
  }

  selectFarmer(farmer: any) {
  this.selectedFarmer = farmer;
  this.form.farmerId = farmer.farmerId;

  this.lands = [];
  this.loadLands(farmer.farmerId);
}

}
