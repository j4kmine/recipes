import {Injectable} from '@angular/core';
import {Http,Response} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import 'rxjs/Rx';
@Injectable()
export class DataStorageService{
    constructor(private http:Http,private recipeservice:RecipeService){

    }
    storeRecipe(){
        return this.http.put('https://ng-recipe-book-69bb2.firebaseio.com/recipes.json',this.recipeservice.getRecipes());

    }
    getRecipes(){
        this.http.get('https://ng-recipe-book-69bb2.firebaseio.com/recipes.json')
        .map(
            (response:Response)=>{
                const recipes : Recipe[] = response.json();
                for (let recipe of recipes){
                    if(!recipe['ingredients']){
                        recipe['ingredients']= [];
                    }
                }
                return recipes;
            }
        )
        .subscribe(
            (recipes:Recipe[])=>{
               
                this.recipeservice.setRecipes(recipes);
            }
        )
    }
}