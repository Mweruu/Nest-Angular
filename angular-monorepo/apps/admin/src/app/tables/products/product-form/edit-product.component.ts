import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil, timer } from 'rxjs';
import { InventoryStatus, Product, ProductsService } from '@angular-monorepo/products';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'libs/category/src/lib/models/category';
import { LocalstorageService } from 'libs/employees/src/lib/services/localstorage.service';
import { CategoryService } from '@angular-monorepo/category';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent implements OnInit, OnDestroy {
  form!:FormGroup;
  editMode=false;
  currentId!:string;
  isSubmitted = false;
  products: Product[] = [];
  categories :Category[] = [];
  endsubs$: Subject<any> = new Subject();
  userId!:string;
  // inventoryOptions!: InventoryStatus
  inventoryOptions: any[] = [
    { name: 'INSTOCK' },
    { name: 'LOWSTOCK' },
    { name: 'OUTOFSTOCK'}
];
  constructor( private fb:FormBuilder,
              private productsService:ProductsService,
              private router:Router,
              private activatedRoute:ActivatedRoute,
              private localStorage:LocalstorageService,
              private categoryService: CategoryService
            ){}

  ngOnInit(): void {
    this.form = this.fb.group({
      name:['', Validators.required],
      code:['', Validators.required],
      price:['', Validators.required],
      quantity:['', Validators.required],
      description:['', Validators.required],
      category:['', Validators.required],
      inventoryStatus:['', Validators.required],
    });
    this._getCategories();
    this._checkEditMode();
  }

  private _getCategories(){
    this.categoryService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe((categories)=>{
      this.categories =categories;
    })
  }

  private _checkEditMode(){
    this.activatedRoute.params.pipe(takeUntil(this.endsubs$)).subscribe(params => {
      if(params['id']){
        this.editMode = true;
        this.currentId = params['id']
        this.productsService.getProduct(this.currentId).pipe(takeUntil(this.endsubs$)).subscribe(product=>{
          this.form.patchValue({
            name: product.name,
            code: product.code,
            price: product.price,
            quantity: product.quantity,
            description: product.description,
            category: product.category?.id,
            inventoryStatus: product.inventoryStatus,
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
    // const productsData = new FormData();
    // productsData.append("name", this.productsForm['name'].value);
    // productsData.append("code", this.productsForm['code'].value);
    // productsData.append("description", this.productsForm['description'].value);
    // productsData.append("price", this.productsForm['price'].value);
    // productsData.append("quantity", this.productsForm['quantity'].value);
    // productsData.append("catId", this.productsForm['category'].value);
    // productsData.append("inventoryStatus", this.productsForm['inventoryStatus'].value);
    const productsData = {
      name:this.productsForm['name'].value,
      code: this.productsForm['code'].value,
      description:this.productsForm['description'].value,
      price:this.productsForm['price'].value,
      quantity:this.productsForm['quantity'].value,
      catId:this.productsForm['category'].value.id,
      inventoryStatus:this.productsForm['inventoryStatus'].value,
    }

    if(this.editMode){
      this._updateProduct(productsData)
    }else{
      this._createProduct(productsData)
    }
  }

  private _createProduct(product: Product){
    this.productsService.createProduct(product).pipe(takeUntil(this.endsubs$)).subscribe(
     ( product:Product )=>{
          timer(3500).toPromise().then(()=>{
            this.router.navigate(['/products'])
          })
      }, error=> {
        console.error("Failed to create product",error)
      }
      );
  }

  private _updateProduct(product:Product){
    this.productsService.updateProduct(this.currentId, product).subscribe(
      product =>{
          timer(3500).toPromise().then(()=>{
            this.router.navigate(['/products'])
          })
      },(error: any)=>{
        console.error("Failed to update product",error)
      }
      );
  }

  get productsForm(){
    return this.form.controls
  }
  ngOnDestroy() {
    // this.endsubs$.next();
    this.endsubs$.complete();
  }
}
