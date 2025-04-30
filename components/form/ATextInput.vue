<script setup>
import { ref, computed, watch } from 'vue';

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
  minLength: {
    type: Number,
    default: null,
  },
  maxLength: {
    type: Number,
    default: null,
  },
  pattern: {
    type: String,
    default: null,
  },
  modelValue: {
    type: String,
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

  if (props.minLength !== null) {
    rules.push(`min:${props.minLength}`);
  }

  if (props.maxLength !== null) {
    rules.push(`max:${props.maxLength}`);
  }

  if (props.pattern) {
    rules.push(`regex:${props.pattern}`);
  }

  return rules.join('|');
});

// Update the value
const updateValue = (value) => {
  inputValue.value = value;
  emit('update:modelValue', value);
};
</script>

<template>
  <FormMoleculesAFormField
    :name="name"
    :label="label"
    type="text"
    :placeholder="placeholder"
    :disabled="disabled"
    :required="required"
    :rules="validationRules"
    :hint="hint"
    :modelValue="inputValue"
    @update:modelValue="updateValue"
  />
</template>
