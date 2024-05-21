<template>
  <div class="pokenmons">
    <h1 class="text-center mb-4">Pokemon Management</h1>

    <v-row class="mb-3">
      <v-col cols="6" class="d-flex ga-2 algin-center">
        <v-label class="font-weight-medium pb-5">Sorted by: </v-label>
        <v-select :items="sortItems" v-model="sortedItem" />
      </v-col>

      <v-col cols="6" class="d-flex ga-2 algin-center">
        <v-label class="font-weight-medium pb-5">Type: </v-label>
        <v-select :items="typeItems" v-model="typedSelect" />
      </v-col>
    </v-row>

    <v-row class="mb-3">
      <v-col>
        <pokemon-table :pokemons="pokemons" @view="handleViewPokemon" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <pagination v-model="page" :pagination="pagination"/>
      </v-col>
    </v-row>

    <div v-visible="loading">
      <v-progress-circular
        class="loading"
        color="primary"
        indeterminate
      />
    </div>

    <pokemon-detail ref="pokemonDetailRef" :pokemon="pokemon" :types="pokemonTypes" />
  </div>

</template>

<script lang="ts" setup>
  // utilities
  import cloneDeep from 'lodash/cloneDeep';
  import { onMounted, computed, ref, watch } from 'vue';
  import { useRouter, useRoute } from 'vue-router';

  // Stores
  import { usePokemonsStore } from '../../store/pokemons';

  // Components
  import Pagination from '../../components/Pagination/Pagination.vue';
  import PokemonTable from './components/PokemonTable/PokemonTable.vue';
  import PokemonDetail, { PokemonDetailExpose, PokemonType } from './components/PokemonDetail/PokemonDetail.vue';

  // APIs
  import { getPokemon, getPokemonTypes } from '../../api/pokemon-api';

  // Constants
  import { SORT } from '../../constants/index';

  const route = useRoute();
  const router = useRouter();
  const pokemonsStore = usePokemonsStore();

  const page = ref<number>(1);
  const pokemon = ref<any>({});
  const loading = ref<boolean>(false);
  const pokemonTypes = ref<PokemonType[]>([]);
  const pokemonDetailRef = ref<PokemonDetailExpose>();

  const filters = computed(() => pokemonsStore.getFilter);
  const pokemons = computed(() => pokemonsStore.getItems);
  const pagination = computed(() => pokemonsStore.getPagination);

  const sortedItem = ref<string>('');
  const typedSelect = ref<string>('');

  const sortItems = computed(() => {
    return Object.keys(SORT).map(key => ({
      title: SORT[key].title,
      value: SORT[key].value,
    }));
  });

  const typeItems = computed(() => {
    return pokemonTypes.value.map((type) => ({
      title: type.name,
      value: type.id,
    }));
  });

  const setFilters = (filters) => {
    pokemonsStore.setFilters(filters);

    const query = {
      page: filters.page.number,
      sort: filters.sort,
      ...(filters.filter.type && { type: filters.filter.type }),
    }

    router.push({ query });
  }

  const getPokemonByFilter = async () => {
    try {
      loading.value = true;

      await pokemonsStore.getPokemons();
    } catch (error) {
      console.log('error', error.message);
    } finally {
      loading.value = false ;
    }
  };

  const handlePageChange = async ({ perPage, currentPage }) => {
    const updatedFilter = cloneDeep(filters.value);

    updatedFilter.page.size = perPage;
    updatedFilter.page.number = currentPage;

    setFilters(updatedFilter);

    await getPokemonByFilter()
  };

  const handleViewPokemon = async (id: string) => {
    try {
      loading.value = true;
      const pokemonDetail = await getPokemon(id);
      pokemon.value = pokemonDetail.data?.data;

      pokemonDetailRef.value?.show();
    } catch (error) {
      console.log('error', error.message);
    } finally {
      loading.value = false;
    }
  };

  watch(
    page,
    page => {
      const updatedFilter = cloneDeep(filters.value);

      updatedFilter.page.number = page;

      setFilters(updatedFilter);

      getPokemonByFilter();
    }
  );

  watch(
    sortedItem,
    sortedItem => {
      const updatedFilter = cloneDeep(filters.value);
      
      updatedFilter.sort = sortedItem;
      updatedFilter.page.number = 1;

      setFilters(updatedFilter);


      getPokemonByFilter();
    }
  );

  watch(
    typedSelect,
    typedSelect => {
      const updatedFilter = cloneDeep(filters.value);
      
      updatedFilter.filter.type = typedSelect;
      updatedFilter.page.number = 1;

      setFilters(updatedFilter);

      getPokemonByFilter();
    }
  )

  onMounted(async () => {
    const query = route.query;
    
    if (Object.keys(query).length) {
      const updatedFilter = cloneDeep(filters.value);

      if(query.sort) {
        updatedFilter.sort = query.sort;
      }
  
      if(query.page) {
        updatedFilter.page.number = Number(query.page);
      }
  
      if (query.type) {
        updatedFilter.filter.type = Number(query.type);
      }
  
      setFilters(updatedFilter);
    }

    sortedItem.value = filters.value?.sort;

    const [_, types] = await Promise.all([
      getPokemonByFilter(),
      getPokemonTypes(),
    ]);

    pokemonTypes.value = types.data?.data;
  });
</script>

<style lang="scss" scoped>
  @import './Pokemons.scss';
</style>