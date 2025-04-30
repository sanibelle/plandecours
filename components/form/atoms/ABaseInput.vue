<script setup lang="ts">
/**
 * Base input component with VeeValidate integration
 *
 * This component synchronizes the VeeValidate field state with v-model
 * while maintaining proper validation state tracking.
 */
import { useField } from 'vee-validate';
import { watch } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: [String, Object],
    default: '',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const { value, errorMessage, handleBlur, setValue } = useField(props.name, props.rules, {
  initialValue: props.modelValue,
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== value.value) {
      setValue(newValue);
    }
  }
);

// Directly emit value changes to parent
const updateValue = (e: Event) => emit('update:modelValue', (e.target as HTMLInputElement).value);
</script>

<template>
  <input
    :id="id"
    :value="value"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    class="base-input"
    :class="{ error: errorMessage }"
    @input="updateValue"
    @blur="handleBlur"
  />
</template>

<style scoped>
.base-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s ease;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.5);
  }
  &:disabled {
    background-color: #f1f5f9;
    cursor: not-allowed;
  }
  .base-input.error {
    border-color: #ef4444;
  }
}
</style>
