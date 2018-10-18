import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Params ,Router} from '@angular/router' ;
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
 recipe: Recipe;
 id:number;
  constructor(private router:Router,private recipeService: RecipeService, private shop:ShoppingListService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id = + params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    )
  }
  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route});
  }
  onAddToShoppingList() {
    // this.shop.addIngredients(this.recipe.ingredients);
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
