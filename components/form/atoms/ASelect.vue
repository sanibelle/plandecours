<script setup lang="ts">
import type { SelectOption } from '@@/types/Forms/SelectOption';
import { useField } from 'vee-validate';
import { watch, computed, ref, onMounted } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Select an option',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: [String, Object],
    default: '',
  },
  options: {
    type: Array as () => SelectOption[],
    required: true,
    default: () => [],
  },
  modelValue: {
    type: [String, Number, null],
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

// VeeValidate integration with controlled initialization
const { value, errorMessage, handleBlur, setValue, meta, validate } = useField(
  props.name,
  props.rules,
  {
    validateOnValueUpdate: true,
  }
);

onMounted(async () => {
  if (props.modelValue !== undefined && props.modelValue !== null) {
    await setValue(props.modelValue);
  }
});

// Bidirectional sync with v-model
watch(
  () => props.modelValue,
  async (newVal) => {
    if (newVal !== value.value) {
      await setValue(newVal);
    }
  },
  { immediate: true }
);

// Keep the parent model updated
watch(value, (newVal) => {
  if (newVal !== props.modelValue) {
    emit('update:modelValue', newVal);
  }
});

const handleChange = async (event: Event): Promise<void> => {
  const target = event.target as HTMLSelectElement;
  const newValue: string = target.value;
  await setValue(newValue);
  emit('update:modelValue', newValue);
};

// Determine if the placeholder should be shown
const hasValue = computed(() => {
  return value.value !== undefined && value.value !== null && value.value !== '';
});
</script>

<template>
  <div class="select-wrapper" :class="{ 'is-disabled': disabled }">
    <select
      :id="id"
      :name="name"
      :value="value"
      :disabled="disabled"
      class="base-select"
      :class="{ error: errorMessage, 'has-value': hasValue }"
      @change="handleChange"
      @blur="handleBlur"
    >
      <option v-if="placeholder" value="" :disabled="meta.touched">
        {{ placeholder }}
      </option>
      <option
        v-for="({ value, label }, index) in options"
        :key="`${value}-option-${index}`"
        :value="value"
      >
        {{ label }}
      </option>
    </select>
    <div class="select-arrow">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        width="16"
        height="16"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.select-wrapper {
  position: relative;
  width: 100%;
}

.select-wrapper.is-disabled {
  opacity: 0.7;
}

.base-select {
  width: 100%;
  appearance: none;
  padding: 8px 12px;
  padding-right: 32px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.base-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.5);
}

.base-select.error {
  border-color: #ef4444;
}

.base-select:disabled {
  background-color: #f1f5f9;
  color: #64748b;
  cursor: not-allowed;
}

/* Custom arrow styling */
.select-arrow {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  color: #64748b;
}

.is-disabled .select-arrow {
  opacity: 0.5;
}

/* Fix for Firefox focus border */
@-moz-document url-prefix() {
  .base-select {
    text-indent: 0.01px;
    text-overflow: '';
    padding-right: 12px;
  }
}

/* Fix for IE10+ */
select::-ms-expand {
  display: none;
}
</style>
