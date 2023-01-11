import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ShareButton from '../components/ShareBtn';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (localStorage.getItem('doneRecipes')) {
      const doneRecipesLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));

      if (filter === 'all') setDoneRecipes(doneRecipesLocalStorage);
      if (filter === 'meals') {
        setDoneRecipes(doneRecipesLocalStorage.filter((r) => r.type === 'meal'));
      }
      if (filter === 'drinks') {
        setDoneRecipes(doneRecipesLocalStorage.filter((r) => r.type === 'drink'));
      }
    }
  }, [filter]);

  return (
    <div>
      <Header title="Done Recipes" searchIcon={ false } />
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => { setFilter('all'); } }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        type="button"
        onClick={ () => { setFilter('meals'); } }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => { setFilter('drinks'); } }
      >
        Drinks
      </button>
      { doneRecipes.length > 0
        && doneRecipes.map((recipe, index) => (
          <div key={ index }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {
                recipe.type === 'meal'
                  ? `${recipe.nationality} - ${recipe.category}`
                  : `${recipe.alcoholicOrNot} - ${recipe.category}`
              }
            </p>
            <p
              data-testid={ `${index}-horizontal-done-date` }
            >
              { recipe.doneDate }
            </p>
            <ShareButton
              detailsPage={ false }
              type={ recipe.type }
              id={ recipe.id }
              index={ index }
            />
            {
              recipe.tags.map((tag) => (
                <span
                  key={ tag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  { tag }
                </span>
              ))
            }
          </div>
        ))}
    </div>
  );
}

export default DoneRecipes;
