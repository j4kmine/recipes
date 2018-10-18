import {Injectable} from '@angular/core';
import {Http,Response} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';
import 'rxjs/Rx';
@Injectable()
export class DataStorageService{
    constructor(private http:Http,private recipeservice:RecipeService,private authservice:AuthService){

    }
    storeRecipe(){
        const token = this.authservice.getToken();
        return this.http.put('https://ng-recipe-book-69bb2.firebaseio.com/recipes.json?auth='+token,this.recipeservice.getRecipes());

    }
    getRecipes(){
        const token = this.authservice.getToken();
        this.http.get('https://ng-recipe-book-69bb2.firebaseio.com/recipes.json?auth='+token)
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