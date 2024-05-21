<template>
  <v-table>
    <thead>
      <th class="text-subtitle-1 font-weight-bold">Number</th>
      <th class="text-subtitle-1 font-weight-bold">Name</th>
      <th class="text-subtitle-1 font-weight-bold">HP</th>
      <th class="text-subtitle-1 font-weight-bold">Attack</th>
      <th class="text-subtitle-1 font-weight-bold">Defense</th>
      <th class="text-subtitle-1 font-weight-bold">Speed</th>
      <th class="text-subtitle-1 font-weight-bold">Generation</th>
      <th class="text-subtitle-1 font-weight-bold">Actions</th>
    </thead>

    <tbody>
      <template v-if="hasPokemon">
        <tr v-for="pokemon in pokemons" :key="pokemon.id">
          <td class="text-subtitle-1 text-center">#{{ pokemon.number }}</td>

          <td>
            <div class="py-4">
              <span class="text-subtitle-1 d-block text-center">{{ pokemon.name }}</span>
            </div>
          </td>

          <td>
            <div class="py-4">
              <span class="text-subtitle-1 d-block text-center">{{ pokemon.hp }}</span>
            </div>
          </td>

          <td>
            <div class="py-4">
              <span class="text-subtitle-1 d-block text-center">{{ pokemon.attack }}</span>
            </div>
          </td>

          <td>
            <div class="py-4">
              <span class="text-subtitle-1 d-block text-center">{{ pokemon.defense }}</span>
            </div>
          </td>

          <td>
            <div class="py-4">
              <span class="text-subtitle-1 d-block text-center">{{ pokemon.speed }}</span>
            </div>
          </td>

          <td>
            <div class="py-4">
              <span class="text-subtitle-1 d-block text-center">{{ pokemon.generation }}</span>
            </div>
          </td>

          <td>
            <div class="d-flex align-center justify-center">
              <v-tooltip text="View">
                <template v-slot:activator="{ props }">
                  <v-btn icon flat v-bind="props" @click="emits('view', pokemon.id)">
                    <EyeIcon size="20" stroke-width="1.5" class="text-primary" />
                  </v-btn>
                </template>
              </v-tooltip>
            </div>
          </td>
        </tr>
      </template>

      <template v-else>
        <tr>
          <td colspan="8" class="text-center text-subtitle-1">No data</td>
        </tr>
      </template>
    </tbody>
  </v-table>
</template>

<script lang="ts" setup>
  // Utilities
  import { computed } from 'vue';

  export type PokemonTableProps = {
    pokemons: Array<any>;
  };

  const props = defineProps<PokemonTableProps>();

  export type PokemonTableEmits = {
    (event: 'view', pokemonId: string): void;
  }

  const emits = defineEmits<PokemonTableEmits>();

  const hasPokemon = computed(() => props.pokemons.length);
</script>

<style lang="scss" scoped>
  @import './Pokemontable.scss';
</style>