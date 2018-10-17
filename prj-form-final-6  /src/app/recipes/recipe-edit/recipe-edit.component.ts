import { Component, OnInit } from '@angular/core';
import{ActivatedRoute,Params,Router} from '@angular/router';
import {FormGroup,FormArray, FormControl, Validators} from '@angular/forms'
import {RecipeService} from '../recipe.service';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode = false;
  recipeForm:FormGroup;
  constructor(private router:Router,private route:ActivatedRoute,private recipeservice:RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id = + params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  onSubmit(){
    if (this.editMode) {
      this.recipeservice.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeservice.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }
  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  private initForm(){
    let recipeName='';
    let recipeImagePath='';
    let recipeDescription='';
    let recipeIngredient = new FormArray([]);
    if(this.editMode){
      const recipe = this.recipeservice.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']){
        for(let ingredients of recipe.ingredients){
          recipeIngredient.push(
            new FormGroup({
              'name':new FormControl(ingredients.name,Validators.required),
              'amount':new FormControl(ingredients.amount,[
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredient
    });
  }

}
