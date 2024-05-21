<template>
  <v-dialog 
    persistent 
    z-index="2000"
    max-width="600" 
    v-model:model-value="isDialogShown"
  >
    <div>
      <v-card>
        <v-card-title>
          <span class="title">Pokemon {{ pokemon.name }} Information</span>
        </v-card-title>

        <v-card-text class="mt-4">
          <v-row>
            <v-col cols="6" class="py-0 d-flex align-center ga-1">
              <v-label class="font-weight-medium">HP: </v-label>
              <div>{{ pokemon.hp }}</div>
            </v-col>

            <v-col cols="6" class="py-0 d-flex align-center ga-1">
              <v-label class="font-weight-medium">Attack: </v-label>
              <div>{{ pokemon.attack }}</div>
            </v-col>

            <v-col cols="6" class="py-0 d-flex align-center ga-1">
              <v-label class="font-weight-medium">Defense: </v-label>
              <div>{{ pokemon.defense }}</div>
            </v-col>

            <v-col cols="6" class="py-0 d-flex align-center ga-1">
              <v-label class="font-weight-medium">Speed: </v-label>
              <div>{{ pokemon.speed }}</div>
            </v-col>

            <v-col cols="6" class="py-0 d-flex align-center ga-1">
              <v-label class="font-weight-medium">Generation: </v-label>
              <div>{{ pokemon.generation }}</div>
            </v-col>

            <v-col cols="6" class="py-0 d-flex align-center ga-1">
              <v-label class="font-weight-medium">Type 1: </v-label>
              <div>{{ getPokemonType(pokemon.type_1) }}</div>
            </v-col>

            <v-col v-if="pokemon.type_2" cols="6" class="py-0 d-flex align-center ga-1">
              <v-label class="font-weight-medium">Type 2: </v-label>
              <div>{{ getPokemonType(pokemon.type_2) }}</div>
            </v-col>

            <v-col cols="6" class="py-0 d-flex align-center ga-1">
              <v-label class="font-weight-medium">SP ATK: </v-label>
              <div>{{ pokemon.sp_atk }}</div>
            </v-col>

            <v-col cols="6" class="py-0 d-flex align-center ga-1">
              <v-label class="font-weight-medium">SP DEF: </v-label>
              <div>{{ pokemon.sp_def }}</div>
            </v-col>

            <v-col cols="6" class="py-0 d-flex align-center ga-1">
              <v-label class="font-weight-medium">Legendary: </v-label>
              <div>{{ Boolean(pokemon.legendary) ? 'LEGENDARY' : 'NO' }}</div>
            </v-col>

            <v-col cols="12" class="py-0 d-flex align-center justify-center ga-1">
              <img :src="pokemonImage" width="200" />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-text>
          <v-row>
            <v-col sm="12" class="text-right mb-3">
              <v-btn flat class="bg-lighterror text-error" @click="handleCloseClick">Close</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </v-dialog>
</template>

<script lang="ts" setup>
  // Utilities
  import { ref, computed } from 'vue';

  export type PokemonType = {
    id: number,
    name: string,
  };

  export type PokemonDetailProps = {
    pokemon: Object,
    types: Array<PokemonType>,
  };

  const props = defineProps<PokemonDetailProps>();

  export type PokemonDetailEvent = {
    (event: "hide"): void;
    (event: "show"): void;
  };

  const emits = defineEmits<PokemonDetailEvent>();

  export type PokemonDetailExpose = {
    hide(): void;
    show(): void;
  };

  defineExpose<PokemonDetailExpose>({
    show: () => (isDialogShown.value = true),
    hide: () => (isDialogShown.value = false),
  });

  const isDialogShown = ref<boolean>(false);

  const pokemonImage = computed<string>(() => {
    return `https://api.vandvietnam.com/api/pokemon-api/pokemons/${props.pokemon.id}/sprite`;
  });

  const getPokemonType = (id: number) => {
    return props.types.find((value) => value.id === id)?.name || 'Unknown';
  };

  const handleCloseClick = () => {
    isDialogShown.value = false;
  };
</script>

<style lang="scss" scoped>
  @import './PokemonDetail.scss';
</style>