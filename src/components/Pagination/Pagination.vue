<template>
  <v-pagination color="primary" rounded="circle" :length="length" :total-visible="5" :model-value="page" @update:model-value="handleModelValueChange" />
</template>

<script lang="ts" setup>
// Utilities
import { computed } from "vue";

export type PaginationProps = {
  pagination: Pagination;
};

export type PageChangeEventData = {
  perPage: number;
  currentPage: number;
};

export type PaginationEvents = {
  (event: "page-change", data: PageChangeEventData): void;
};

const props = defineProps<PaginationProps>();

const emit = defineEmits<PaginationEvents>();

const page = computed(() => {
  const offset = props.pagination?.current_page ?? 0;
  const limit = props.pagination?.per_page || 10;

  return offset / limit + 1;
});

const length = computed(() => {
  const total = props.pagination?.total || 0;
  const limit = props.pagination?.per_page || 10;

  return Math.ceil(total / limit) ?? 1;
});

const handleModelValueChange = (value: number) => {
  const perPage = props.pagination?.per_page || 10;

  emit("page-change", {
    perPage,
    currentPage: value,
  });
};
</script>

<style lang="scss" scoped>
  @import './Pagination.scss';
</style>
