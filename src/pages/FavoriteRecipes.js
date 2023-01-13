import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ShareButton from '../components/ShareBtn';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      const favRecipesLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

      if (filter === 'all') setFavoriteRecipes(favRecipesLocalStorage);
      if (filter === 'meals') {
        setFavoriteRecipes(favRecipesLocalStorage.filter((r) => r.type === 'meal'));
      }
      if (filter === 'drinks') {
        setFavoriteRecipes(favRecipesLocalStorage.filter((r) => r.type === 'drink'));
      }
    }
  }, [filter]);

  const removeFavoriteRecipe = (id) => {
    const favRecipesLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filteredFavoriteRecipes = favRecipesLocalStorage.filter((r) => r.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredFavoriteRecipes));
    setFavoriteRecipes(filteredFavoriteRecipes);
  };

  return (
    <div>
      <Header title="Favorite Recipes" searchIcon={ false } />
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
      { favoriteRecipes.length > 0
        && favoriteRecipes.map((recipe, index) => (
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
            <ShareButton
              detailsPage={ false }
              type={ recipe.type }
              id={ recipe.id }
              index={ index }
            />
            <button
              type="button"
              onClick={ () => { removeFavoriteRecipe(recipe.id); } }
            >
              <img
                src={ blackHeartIcon }
                alt="favorite icon"
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
          </div>
        ))}
    </div>
  );
}

export default FavoriteRecipes;
