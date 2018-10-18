import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';
import {NgForm} from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import {Subscription} from 'rxjs/Subscription';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit ,OnDestroy{
  @ViewChild('f')slForm:NgForm;
  subcription:Subscription;
  editMode = false;
  editItemIndex:number;
  editedItem:Ingredient;
  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subcription = this.slService.startedEditing.subscribe(
      (index:number)=>{
        this.editItemIndex =index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        });
      }
    )
  }
  ngOnDestroy(){
    this.subcription.unsubscribe();
  }
  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete(){
    this.slService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }
  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode == true){
      this.slService.updateIngrediet(this.editItemIndex,newIngredient);
    }else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

}
