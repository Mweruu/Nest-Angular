import { CategoryService } from '@angular-monorepo/category';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'libs/category/src/lib/models/category';
import { Subject, timer, takeUntil } from 'rxjs';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrl: './categories-form.component.css',
})
export class CategoriesFormComponent implements OnInit, OnDestroy {
  form!:FormGroup;
  isSubmitted = false;
  editMode = false;
  currentId!:string;
  endsubs$: Subject<any> = new Subject();

  constructor( private fb:FormBuilder,
              private categoryService:CategoryService,
              private router:Router,
              private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.form = this.fb.group({
      name:['', Validators.required],
      icon:['', Validators.required],
      color:['#ffff']
    })

    this._checkEditMode()
  }

  private _checkEditMode(){
    this.activatedRoute.params.subscribe((params) =>{
      if(params['id']){
        this.editMode = true
        this.currentId = params['id']
        this.categoryService.getCategory(this.currentId).subscribe(category =>{
            this.categoriesForm['name'].setValue(category.name),
            this.categoriesForm['icon'].setValue(category.icon)
            this.categoriesForm['color'].setValue(category.color)
        })
      }
    })
  }

  onSubmit(){
    this.isSubmitted = true
    if(this.form.invalid){
      return;
    }
    const category = {
      // id: this.currentId,
      name: this.categoriesForm['name'].value,
      icon: this.categoriesForm['icon'].value,
      color: this.categoriesForm['color'].value,

    }
      if(this.editMode){
        this._updateCategory(category)
      }else{
        this._createCategory(category)
      }
  }


  private _createCategory(category:Category){
    this.categoryService.createCategory(category).subscribe(
      category =>{

        timer(3500).toPromise().then(()=>{
          this.router.navigate(['/category'])
        })

        // timer(2000).toPromise().then((done)=>{
        //   this.location.back()
        // })

        },error=>{
          console.error("Failed to create category",error)
        }
    )
  }


  private _updateCategory(category:Category){
    this.categoryService.updateCategories(this.currentId,category).pipe(takeUntil(this.endsubs$)).subscribe(category=>{

    timer(3500).toPromise().then(()=>{
      this.router.navigate(['/category'])
    })

    },error=>{
      console.error("Failed to update category",error)
    }
    )
  }


  get categoriesForm(){
    return this.form.controls
  }

  ngOnDestroy() {
    // this.endsubs$.next();
    this.endsubs$.complete();
  }
}
