import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/src/components/app-shell";
import {
    extractIngredients,
    getMealById,
    toEmbedUrl,
} from "@/src/lib/mealdb";

type MealDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MealDetailPage({ params }: MealDetailPageProps) {
  const { id } = await params;
  const meal = await getMealById(id);

  if (!meal) {
    notFound();
  }

  const ingredients = extractIngredients(meal);
  const embedUrl = await toEmbedUrl(meal.strYoutube);

  return (
    <AppShell subtitle="Detail meal page from TheMealDB lookup endpoint.">
      <h2 className="section-title">{meal.strMeal}</h2>

      <div className="detail-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={meal.strMealThumb} alt={meal.strMeal} className="detail-image" />

        <article className="detail-panel">
          <h3>Instructions</h3>
          <p>{meal.strInstructions ?? "No instructions provided."}</p>

          <h3 style={{ marginTop: "14px" }}>Recipes</h3>
          <ul className="ingredient-list">
            {(await ingredients).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>

      {embedUrl ? (
        <div className="video-wrap">
          <iframe
            src={embedUrl}
            title={`${meal.strMeal} tutorial`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : null}

      <Link href="/" className="back-link">
        Back to ingredients
      </Link>
    </AppShell>
  );
}