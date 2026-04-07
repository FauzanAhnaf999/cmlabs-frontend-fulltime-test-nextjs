import { it } from "node:test";

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export type Ingredient = {
    idIngredient: string;
    strIngredient: string;
    strDescription: string | null;
    strType: string | null;
};

export type FilteredMeal = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
};

export type MealDetail = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory: string | null;
    strArea: string | null;
    strInstructions: string | null;
    strYoutube: string | null;
    [key: string]: string | null;
}

async function fetchJson<T>(path: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${path}`, {
        next: { revalidate: 600 },
    });

    if (!response.ok) {
        throw new Error(`Mealdb request failed ${path}: ${response.statusText}`);
    }

    return response.json() as Promise<T>;
}

export async function getIngredients(): Promise<Ingredient[]> {
    const data = await fetchJson<{ meals: Ingredient[] | null }>('/list.php?i=list');
    return data.meals ?? [];
}

export async function getMealsByIngredient(ingredient: string): Promise<FilteredMeal[]> {
    const data = await fetchJson<{ meals: FilteredMeal[] | null }>(
        `/filter.php?i=${encodeURIComponent(ingredient)}`);
    return data.meals ?? [];
}

export async function getMealById(id:string): Promise<MealDetail | null> {
    const data = await fetchJson<{ meals: MealDetail[] | null }>(
        `/lookup.php?i=${encodeURIComponent(id)}`);
    return data.meals ? data.meals[0] : null;
}

export async function extractIngredients(meal: MealDetail): Promise<string[]> {
   const items: string[] = [];

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`]?.trim();
        const measure = meal[`strMeasure${i}`]?.trim();

        if (ingredient) {
            items.push(`${measure ? `${measure} ` : ''}${ingredient}`.trim());
        }
    }
    return items;
}

export async function toEmbedUrl(url: string | null): Promise<string | null> {    
    if (!url) { 
        return null;
    }
    const videoId = url.includes("v=") ? url.split("v=")[1]?.split("&")[0] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}