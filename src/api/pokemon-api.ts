// Utilities
import { httpInstance } from "./http";

export const getAllPokemon = (params) => httpInstance.get('/pokemons', {
  params
});

export const getPokemon = (id: string) => httpInstance.get(`/pokemons/${id}`);

export const getPokemonTypes = () => httpInstance.get('/types');

export const getPokemonSprite = (id: string) => httpInstance.get(`/pokemons/${id}/sprite`);