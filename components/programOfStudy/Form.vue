<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Form } from 'vee-validate';
import type { SelectOption } from '~/types/Forms/SelectOption';
import { ProgramType } from '~/types/enum/ProgramType';

const { t } = useI18n();

const emit = defineEmits(['submit']);

// Form values
const programOfStudy = reactive({
  name: '',
  code: '',
  programType: '',
});

// Form submission state
const isSubmitting = ref(false);

// Handle form submission
const onSubmit = async (values: any) => {
  isSubmitting.value = true;

  try {
    // You can process form values here before emitting
    emit('submit', values);
  } catch (error) {
    console.error('Form submission error:', error);
  } finally {
    isSubmitting.value = false;
  }
};

const options: SelectOption[] = Object.entries(ProgramType)
  .filter(([key, value]) => typeof value === 'number')
  .map(([key, value]) => ({
    value,
    label: key,
  }));
</script>

<template>
  <div class="user-form">
    <h2 class="form-title">{{ t('title') }}</h2>
    <Form @submit="onSubmit" class="form-container">
      <FormATextInput
        name="name"
        :label="t('programName')"
        :minLength="2"
        :maxLength="50"
        v-model="programOfStudy.name"
        hint="Ex : Sciences humaines"
      />
      <FormATextInput
        name="programCode"
        :label="t('programCode')"
        :minLength="2"
        :maxLength="50"
        v-model="programOfStudy.code"
        hint="Ex : 300.A1"
      />
      {{ programOfStudy }}
      <FormASelectInput
        name="programType"
        :label="t('programType')"
        :required="true"
        :options="options"
        v-model="programOfStudy.programType"
      >
      </FormASelectInput>
      <ul>
        <li>Sanction</li>
        <li>MonthsDuration</li>
        <li>SpecificDurationHours</li>
        <li>TotalDurationHours : Dire que c'est le maximum possible</li>
        <li>PublishedOn</li>
        <li>SpecificUnits : Dire que c'est le maximum possible</li>
        <li>OptionnalUnits</li>
        <li>GeneralUnits</li>
        <li>ComplementaryUnits</li>
      </ul>

      <div class="form-actions">
        <button type="submit" class="submit-button" :disabled="isSubmitting">
          {{ isSubmitting ? 'Submitting...' : 'Submit' }}
        </button>
      </div>
    </Form>
  </div>
</template>

<i18n>
{
  "fr": {
    "title": "Programme d'étude",
    "programName": "Titre du programme",
    "programCode": "Code du programme",
    "programType": "Type de programme",
  }
}
</i18n>

<style scoped>
.user-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.form-title {
  margin-top: 0;
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 600;
  color: #1e293b;
  text-align: center;
}

.form-container {
  display: flex;
  flex-direction: column;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
}

.submit-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #3b82f6;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-button:hover {
  background-color: #2563eb;
}

.submit-button:disabled {
  background-color: #93c5fd;
  cursor: not-allowed;
}

.reset-button {
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background-color: white;
  color: #64748b;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reset-button:hover {
  background-color: #f8fafc;
  border-color: #cbd5e1;
}

.reset-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
