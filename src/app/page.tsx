import { AppShell } from "../components/app-shell";
import { getIngredients } from "../lib/mealdb";
import { IngredientsExplorer } from "../components/ingredients-explorer";

export default async function Home() {
  const ingredients = await getIngredients();
  
  return (
    <AppShell>
      <IngredientsExplorer ingredients={ingredients} />
    </AppShell>
  );
}