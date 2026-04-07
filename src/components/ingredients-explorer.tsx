"use client";

import Link from "next/link";
import {useMemo,   useState} from "react";
import type { Ingredient } from "../lib/mealdb";

type IngredientsExplorerProps = {
  ingredients: Ingredient[];
};

export function IngredientsExplorer({ ingredients }: IngredientsExplorerProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return ingredients;
    }

    return ingredients.filter((item) =>
      item.strIngredient.toLowerCase().includes(normalized),
    );
  }, [ingredients, query]);

  return (
    <>
      <h2 className="section-title">Ingredients</h2>
      <input
        className="search-box"
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search ingredients by name..."
        aria-label="Search ingredients"
      />

      {filtered.length === 0 ? (
        <div className="empty">No ingredient matches your search.</div>
      ) : (
        <div className="grid">
          {filtered.map((ingredient, index) => (
            <article
              key={ingredient.idIngredient}
              className="card"
              style={{ animationDelay: `${(index % 12) * 40}ms` }}
            >
              <Link
                href={`/ingredients/${encodeURIComponent(ingredient.strIngredient)}`}
                className="card-link"
              >
                <div className="card-visual">
                  <span className="card-title">{ingredient.strIngredient}</span>
                </div>
                <div className="card-body">
                  <p className="meta">Tap to browse related meals</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </>
  );
}