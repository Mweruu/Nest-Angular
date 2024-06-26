import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
// import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Employee } from '../../models/employees';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'lib-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  SignupFormData!:FormGroup;
  isSubmitted =false;
  authError = false;
  authMessage  = 'Email or Password are wrong';
  value!: number;
  formGroup!: FormGroup;

  roleOptions: any[] = [
      { name: 'INTERN' },
      { name: 'ENGINEER' },
      { name: 'ADMIN' }
  ];

  constructor(private fb:FormBuilder,
              private employeeService: EmployeesService,
              // private messageService:MessageService,
              private router:Router){}

  ngOnInit(): void {
      this.formGroup = new FormGroup({
          value: new FormControl('on')
      });

      this.SignupFormData = this.fb.group({
        email:['',[Validators.required,Validators.email]],
        password: ['', Validators.required],
        firstName:['',  Validators.required],
        lastName:['',  Validators.required],
        role:[''],
      })
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.SignupFormData.invalid){
      return
    }
    const signupData = {
      email:this.signupForm['email'].value,
      password:this.signupForm['password'].value,
      firstName:this.signupForm['firstName'].value,
      lastName:this.signupForm['lastName'].value,
      role:this.signupForm['role'].value.name,
    }
    this._createEmployee(signupData)
  }

  private _createEmployee(employee:Employee){
    this.employeeService.signup(employee).subscribe(
      employee =>{
        timer(3500).toPromise().then(()=>{
          this.router.navigate(['/login'])
        })
        // this.messageService.add({
        //   severity:'success',
        //   summary:'employee successfully created', });
        //     timer(3500).toPromise().then(()=>{
        //       this.router.navigate(['/login'])
        //     })
      },error=>{
        console.error("Failed to create employee",error)
        // this.messageService.add({
        //   severity:'error',
        //   summary:'Failed to create employee'})
      }
      )
  }

  get signupForm(){
    return this.SignupFormData.controls;
  }
}
