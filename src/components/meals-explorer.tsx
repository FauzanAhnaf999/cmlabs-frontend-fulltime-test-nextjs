"use client";

import { useMemo, useState } from "react";
import type { FilteredMeal } from "../lib/mealdb";
import Link from "next/link";

type MealsExplorerProps = {
  meals: FilteredMeal[];
};

export function MealsExplorer({ meals }: MealsExplorerProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return meals;
    }

    return meals.filter((item) => item.strMeal.toLowerCase().includes(normalized));
  }, [meals, query]);

  return (
    <>
      <h2 className="section-title">Meals</h2>
      <input
        className="search-box"
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search meal by name..."
        aria-label="Search meal"
      />

      {filtered.length === 0 ? (
        <div className="empty">No meal matches your search.</div>
      ) : (
        <div className="grid">
          {filtered.map((meal, index) => (
            <article
              key={meal.idMeal}
              className="card"
              style={{ animationDelay: `${(index % 12) * 40}ms` }}
            >
              <Link href={`/meals/${meal.idMeal}`} className="card-link">
                <div className="card-visual">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={meal.strMealThumb} alt={meal.strMeal} />
                </div>
                <div className="card-body">
                  <h3 className="card-title">{meal.strMeal}</h3>
                  <p className="meta">Open meal detail</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </>
  );
}