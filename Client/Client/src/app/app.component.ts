import { Component } from '@angular/core';
import { DataService } from './services/data-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  form!: FormGroup;
  time = '';

  constructor(private dataService: DataService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

  }

  get f() { return this.form.controls; }

  onSubmit() {

    if (this.form.invalid) {
      return;
    }
    this.dataService.getData(this.form.controls['email'].value.toString()).subscribe(
      (res) => {
        if (res.statusCode == 200 || res.statusCode == 429)
          this.time = res.value.currentTime;
        else {
          alert('An error occured, pls try again later');
        }

      }, err => alert(err.message),

    );
  }

}
