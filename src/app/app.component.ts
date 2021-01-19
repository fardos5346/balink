import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from '../shared/services/customer.service';
import { CountriesService } from '../shared/services/countries.service';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  buttonDisabled: Boolean = false;
  showNotification = false;
  name = 'balink';
  error=true;
  isSubmitted3: Boolean = false;
  isSubmitted2: Boolean = false;
  isSubmitted: Boolean = false;
  isEditable: Boolean = false;
  validate: Boolean = false;
  msg_firstName: string = "";
  msg_lastName: string = "";
  msg_title: string = "";
  msg_country: string = "";
  msg_city: string = "";
  msg_street: string = "";
  msg_email: string = "";
  msg_phone: string = "";
  msgSuccess: string = "";
  msgError: string = "";
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  isLinear = true;
  public customer: any = {};
  public countries: any = [];
  public lang: any = 'en';

  constructor(private _formBuilder: FormBuilder, private ps: CustomersService,private cs:CountriesService, public translate: TranslateService) {
    this.validation();
    this.translation();
  }

  ngOnInit() {
    this.initCountries();
    this.ps.getCustomersAsync().subscribe(res => {
      
    });
  }
  translation (){
    this.translate.addLangs(['en', 'he'])
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    let language = JSON.parse(JSON.stringify(sessionStorage.getItem("language")));
    if(language==null){
      language = 'en';
    }
    this.translate.use(language);
    this.lang=this.translate.currentLang;
  }
   validation(){
    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      title: ['', Validators.required],

    });

    this.secondFormGroup = this._formBuilder.group({
       country: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      email: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")] ],
      phone: ['', [Validators.required,Validators.pattern("^((\\+972?)|0+)?[0-9]{9}$")]],
      

    });
   }
  initialize(){
    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      title: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      email: ['', Validators.required],
      phone: ['', Validators.required],
      
    });
  }

  get formControls() {
    return this.firstFormGroup.controls;
  }
  switchLang(language : any){
    this.translate.use(language);
    sessionStorage.setItem("language",language);
    this.lang=language;
  }
  get formControls2() {
    return this.secondFormGroup.controls;
  }
  get formControls3() {
    return this.thirdFormGroup.controls;
  }
  public initCountries(){


    // this.cs.getAllCountries().
    //   subscribe(countries =>{this.countries = countries;
    //     //console.log(this.countries)

    //   } );

      this.ps.getCountryList().
        subscribe(countries =>{
          this.countries = countries;
      } );

        



  }

  public submitForm() {
    
    this.error = false;
    if (this.firstFormGroup.invalid || this.secondFormGroup.invalid || this.thirdFormGroup.invalid) {
      this.error=true;
      this.showNotification = true;
        setTimeout(()=>{
          this.showNotification = false;
        },4000)
      return;
    }



    else {
      let request = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        ...this.thirdFormGroup.value
      }
      this.ps.addCustomer(request).subscribe(res => {
        this.initialize();
        this.isSubmitted3 =false;
        this.customer = {};
        this.msgError = '';
        this.showNotification = true;
        setTimeout(()=>{
          this.showNotification = false;
        },4000)
        
        this.msgSuccess = 'Success Submission , Thank you For the Time. ';
        setTimeout(() => {
          window.location.href = '/';
        }, 6000)

      }, err => {
        this.error=true;
        this.showNotification = true;
        setTimeout(()=>{
          this.showNotification = false;
        },4000)
       
        this.msgError = 'Error';
      })
    }

  }


}


