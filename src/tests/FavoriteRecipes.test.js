import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers';

describe('Testa o componente FavoriteRecipes', () => {
  const favRecipesPath = '/favorite-recipes';

  it('01 - Testa se os botões estão sendo renderizados', async () => {
    const { history } = renderWithRouter(<App />);

    localStorage.setItem('favoriteRecipes', '[{"id":"52977","type":"meal","nationality":"Turkish","category":"Side","alcoholicOrNot":"","name":"Corba","image":"https://www.themealdb.com/images/media/meals/58oia61564916529.jpg"},{"id":"15997","type":"drink","nationality":"","category":"Ordinary Drink","alcoholicOrNot":"Optional alcohol","name":"GG","image":"https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg"}]');
    act(() => {
      history.push(favRecipesPath);
    });

    expect(screen.getByText('Meals')).toBeInTheDocument();
    expect(screen.getByText('Drinks')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();

    localStorage.clear();
  });

  it('02 - Testa se a pagina é renderizada sem favoritos', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(favRecipesPath);
    });

    expect(screen.queryByTestId('0-horizontal-image')).not.toBeInTheDocument();
  });

  it('03 - Testa se consegue deletar um favorito', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('favoriteRecipes', '[{"id":"53060","type":"meal","nationality":"Croatian","category":"Side","alcoholicOrNot":"","name":"Burek","image":"https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg"}]');

    act(() => {
      history.push(favRecipesPath);
    });

    const favButton = screen.getByTestId('0-horizontal-favorite-btn');
    userEvent.click(favButton);

    const favRecipeName = screen.queryByText('Burek');
    expect(favRecipeName).not.toBeInTheDocument();
  });

  it('04 - Testa se os filtros estao funcionando', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.clear();
    localStorage.setItem('favoriteRecipes', '[{"id":"53060","type":"meal","nationality":"Croatian","category":"Side","alcoholicOrNot":"","name":"Burek","image":"https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg"}]');

    act(() => {
      history.push(favRecipesPath);
    });

    const favRecipeName = screen.getByTestId('0-horizontal-top-text');
    expect(favRecipeName).toBeInTheDocument();

    const allFilterBtn = screen.getByTestId('filter-by-all-btn');
    userEvent.click(allFilterBtn);

    expect(favRecipeName).toBeInTheDocument();

    const mealFilterBtn = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(mealFilterBtn);

    expect(favRecipeName).toBeInTheDocument();

    const drinkFilterBtn = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(drinkFilterBtn);

    expect(favRecipeName).not.toBeInTheDocument();
  });
});
