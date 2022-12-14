import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "../shared/models/recipe.model";
import { DataStorageService } from "../shared/services/data-storage.service";
import { RecipeService } from "../shared/services/recipe.service";

@Injectable({
    providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]>{

    constructor(
        private dataStorageService: DataStorageService,
        private recipeService: RecipeService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        const recipes = this.recipeService.getRecipies();
        if(recipes.length == 0){
            return this.dataStorageService.fetchRecipes();
        }
        return recipes;
    }
}