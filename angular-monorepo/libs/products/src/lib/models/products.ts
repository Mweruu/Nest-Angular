import { Category } from "libs/category/src/lib/models/category";
import { InventoryStatus } from "./inventoryStatus";

export class Product {
  id?:string;
  name?:string;
  code?:string;
  price?:number;
  quantity?:number;
  description?:string;
  catId?: number;
  category?:Category
  inventoryStatus?: InventoryStatus;
}
