import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';
import 'rxjs/Rx';
@Injectable()
export class DataStorageService{
    constructor(private httpClient:HttpClient,private recipeservice:RecipeService,private authservice:AuthService){

    }
    storeRecipe(){
        const token = this.authservice.getToken();
        // return this.httpClient.put('https://ng-recipe-book-69bb2.firebaseio.com/recipes.json',this.recipeservice.getRecipes(),{
        //     observe:'body',
        //     params:new HttpParams().set("auth",token)
        //     // headers:new HttpHeaders().set('Authorization','token').append('Authorization2','token2')
        // });
        const req = new HttpRequest('PUT','https://ng-recipe-book-69bb2.firebaseio.com/recipes.json'
        ,this.recipeservice.getRecipes(),
        {reportProgress:true,params:new HttpParams().set("auth",token)}
        )
        return this.httpClient.request(req);

    }
    getRecipes(){
        const token = this.authservice.getToken();
        // this.httpClient.get<Recipe[]>('https://ng-recipe-book-69bb2.firebaseio.com/recipes.json?auth='+token)
        this.httpClient.get<Recipe[]>('https://ng-recipe-book-69bb2.firebaseio.com/recipes.json',{
            observe:'body',
            params:new HttpParams().set("auth",token),
            responseType:'json'
        })
        .map(
            (recipes)=>{
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