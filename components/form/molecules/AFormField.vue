<script setup>
import { useField } from 'vee-validate';

const props = defineProps({
  id: {
    type: String,
    required: false,
    default: () => `input-${Math.random().toString(36).slice(2, 11)}`,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '',
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
  required: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: [String, Object, Function],
    default: '',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  hint: {
    type: String,
    default: '',
  },
});

defineEmits(['update:modelValue']);

// Get the error message from VeeValidate
const { errorMessage } = useField(props.name);
</script>

<template>
  <div class="form-field">
    <FormAtomsABaseLabel :for-id="id" :required="required" v-if="label">
      {{ label }}
    </FormAtomsABaseLabel>
    <FormAtomsABaseInput
      :id="id"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :rules="rules"
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
    <FormAtomsAErrorMessage :message="errorMessage" />
    <p v-if="hint" class="hint-text">{{ hint }}</p>
  </div>
</template>

<style scoped>
.form-field {
  margin-bottom: 16px;
}

.hint-text {
  margin-top: 4px;
  font-size: 12px;
  color: #64748b;
}
</style>
