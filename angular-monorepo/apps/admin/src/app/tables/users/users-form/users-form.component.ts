import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '@angular-monorepo/category';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'libs/category/src/lib/models/category';
import { LocalstorageService } from 'libs/employees/src/lib/services/localstorage.service';
import { Subject, takeUntil, timer } from 'rxjs';
import { Employee, EmployeesService } from '@angular-monorepo/employees';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.css',
})
export class UsersFormComponent implements OnInit, OnDestroy {
  form!:FormGroup;
  editMode=false;
  currentId!:string;
  isSubmitted = false;
  categories :Category[] = [];
  endsubs$: Subject<any> = new Subject();
  userId!:string;
  roleOptions: any[] = [
    { name: 'INTERN'},
    { name: 'ENGINEER' },
    { name: 'ADMIN'}
];
  constructor( private fb:FormBuilder,
              private employeesService:EmployeesService,
              private router:Router,
              private activatedRoute:ActivatedRoute,
              private localStorage:LocalstorageService,
              private categoryService: CategoryService
            ){}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      email:['', Validators.required],
      role:['', Validators.required],
      password:['', Validators.required],
    });
    this._checkEditMode();
  }



  private _checkEditMode(){
    this.activatedRoute.params.pipe(takeUntil(this.endsubs$)).subscribe(params => {
      if(params['id']){
        this.editMode = true;
        this.currentId = params['id']
        this.employeesService.getEmployee(this.currentId).pipe(takeUntil(this.endsubs$)).subscribe(user=>{
          this.form.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            password: user.password,
          });
        })
      }
    })
  }

  onSubmit(){
    this.isSubmitted = true
    if(this.form.invalid){
      return;
    }
    const token = this.localStorage.getToken();
    if(token){
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      this.userId = tokenDecode.userId
    }
    const usersData = {
      password:this.usersForm['password'].value,
      firstName: this.usersForm['firstName'].value,
      lastName:this.usersForm['lastName'].value,
      email:this.usersForm['email'].value,
      role:this.usersForm['role'].value,
    }

    if(this.editMode){
      this._updateUser(usersData)
    }else{
      this._createUser(usersData)
    }
  }

  private _createUser(user: Employee){
    this.employeesService.createUser(user).pipe(takeUntil(this.endsubs$)).subscribe(
     ( user:Employee )=>{
          timer(3500).toPromise().then(()=>{
            this.router.navigate(['/users'])
          })
      }, error=> {
        console.error("Failed to create users",error)
      }
      );
  }

  private _updateUser(user:Employee){
    this.employeesService.updateUser(this.currentId, user).subscribe(
      user =>{
          timer(3500).toPromise().then(()=>{
            this.router.navigate(['/users'])
          })
      },(error: any)=>{
        console.error("Failed to update users",error)
      }
      );
  }

  get usersForm(){
    return this.form.controls
  }
  ngOnDestroy() {
    // this.endsubs$.next();
    this.endsubs$.complete();
  }
}
