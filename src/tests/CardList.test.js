import { render, screen } from '@testing-library/react'
import React from 'react'

import '@testing-library/jest-dom'
import PokemonList from '../components/PokemonList'
import PokemonInfoProvider from '../contexts/PokemonInfoProvider'
/**
 * @jest-environment jsdom
*/

import { useSearchParams } from 'react-router-dom';

// Create a mock implementation for useSearchParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(),
}));

test('PokemonList renders the specified number of cards', async () => {
  useSearchParams.mockReturnValue([{ get: jest.fn() }, jest.fn()]);

  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue({
      id: 1,
      sprites: {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
      },
      name: "bulbasaur",
    }),
  }).mockReturnValueOnce({
    json: jest.fn().mockResolvedValue({
      results: [
        {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
        }]
    }),
  })
  render(
    <PokemonInfoProvider>
      <PokemonList />
    </PokemonInfoProvider>
  )

  let pokemonCards = await screen.findAllByTestId('pokemon-card');

  expect(pokemonCards.length).toBe(1);
})