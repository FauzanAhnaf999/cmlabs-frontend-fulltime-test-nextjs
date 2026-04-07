import Link from "next/link";
import { AppShell } from "@/src/components/app-shell";
import { MealsExplorer } from "@/src/components/meals-explorer";
import { getMealsByIngredient } from "@/src/lib/mealdb";

type IngredientDetailPageProps = {
    params: Promise<{ name: string }>;
};

export default async function IngredientDetailPage({ params }: IngredientDetailPageProps) {
  const { name } = await params;
  const ingredientName = decodeURIComponent(name);
  const meals = await getMealsByIngredient(ingredientName);

  return (
    <AppShell subtitle={`Showing meals that use ingredient: ${ingredientName}`}>
      <h2 className="section-title">{ingredientName} Meals</h2>
      <MealsExplorer meals={meals} />
      <Link href="/" className="back-link">
        Back to ingredients
      </Link>
    </AppShell>
  );
}