// Utilities
import { defineStore, StateTree } from 'pinia';

// APIs
import { getAllPokemon } from '../api/pokemon-api';

// Constants
import { SORT } from '../constants/index';

export type PokemonsState = {
  filters: Object;
  items: Array<any>;
  pagination: Pagination;

};

export type PokemonsGetters = {
  getFilter(state: StateTree): Object;
  getItems(state: StateTree): Array<any>;
  getPagination(state: StateTree): Pagination;
};

export type CategoriesActions = {
  getPokemons(): Promise<void>;
  setFilters(filter): Promise<void>;
};

export const usePokemonsStore = defineStore<"pokemons", PokemonsState, PokemonsGetters, CategoriesActions>(
  "pokemons",
  {
    state: () => ({
      items: [],
      filters: {
        filter: {},
        page: {
          number: 0,
          size: 10,
        },

        sort: SORT.number.value,
      },
      pagination: {},
    }),

    getters: {
      getItems: (state) => state.items,

      getPagination: (state) => state.pagination,

      getFilter: (state) => state.filters
    },

    actions: {
      async setFilters(filter) {
        this.filters = {
          ...this.filters,
          ...filter,
        }
      },

      async getPokemons() {
        const response = await getAllPokemon(this.filters);

        // this.items = Pokemon.build(response.data?.data);
        this.items = response.data?.data;
        this.pagination = response.data?.meta;
      },
    }
  }
)