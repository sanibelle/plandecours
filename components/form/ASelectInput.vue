<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { SelectOption } from '~/types/Forms/SelectOption';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  hint: {
    type: String,
    default: '',
  },
  options: {
    type: Array<SelectOption>,
    required: true,
    default: () => [],
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

// Create a local input value
const inputValue = ref(props.modelValue);

// Watch for changes in the modelValue prop
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== inputValue.value) {
      inputValue.value = newVal;
    }
  }
);

// Computed validation rules based on props
const validationRules = computed(() => {
  const rules = [];
  if (props.required) {
    rules.push('required');
  }
  return rules.join('|');
});

// Update the value
const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <FormMoleculesASelectField
    :name="name"
    :label="label"
    type="text"
    :placeholder="placeholder"
    :disabled="disabled"
    :required="required"
    :rules="validationRules"
    :hint="hint"
    :modelValue="inputValue"
    :options="options"
    @update:modelValue="updateValue"
  />
</template>
