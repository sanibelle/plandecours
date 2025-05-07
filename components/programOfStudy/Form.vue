<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Form, useForm } from 'vee-validate';
import type { SelectOption } from '~/types/forms/SelectOption';
import { ProgramType } from '~/types/enum/ProgramType';
import type { ProgramOfStudy } from '~/types/ministerial/ProgramOfStudy';
import { FormAUnitInput } from '#components';

const { t } = useI18n();

const emit = defineEmits(['submit']);

// Form values
const programOfStudy = reactive<Partial<ProgramOfStudy>>({
  specificUnits: {},
  optionnalUnits: {},
  complementaryUnits: {
    wholeUnit: 6,
  },
  generalUnits: {
    denominator: 3,
    numerator: 2,
    wholeUnit: 16,
  },
});
const { handleSubmit, errors, isSubmitting } = useForm<ProgramOfStudy>({
  validateOnMount: false,
});

const onSubmit = handleSubmit(async (e: any) => {
  e.preventDefault(); // Prevent default form submission
  console.log("🚀 ~ onSubmit ~ values:", e)
  // isSubmitting.value = true;

  // try {
  //   // You can process form values here before emitting
  //   emit('submit', e);
  // } catch (error) {
  //   console.error('Form submission error:', error);
  // } finally {
  //   isSubmitting.value = false;
  // }
});

const options: SelectOption[] = Object.entries(ProgramType)
  .filter(([key, value]) => typeof value === 'number')
  .map(([key, value]) => ({
    value,
    label: key,
  }));
</script>

<template>
  <div class="user-form">
    {{ errors }}
    <hr>
    {{ programOfStudy }}
    <h2 class="form-title">{{ t('title') }}</h2>
    <form @submit="onSubmit" class="form-container">
      <FormATextInput name="name" :label="t('programName')" :placeholder="t('programNamePlaceholder')" :min="2"
        :max="50" v-model="programOfStudy.name" :required="true" />
      <FormATextInput name="code" :label="t('programCode')" placeholder="Ex : 300.A1" :min="20" :max="50"
        :required="true" v-model="programOfStudy.code" />
      <FormASelectInput name="programType" :placeholder="t('programTypePlaceholder')" :label="t('programType')"
        :required="true" :options="options" v-model="programOfStudy.programType" />
      <FormANumberInput name="monthsDuration" :label="t('monthsDuration')" :min="0"
        v-model="programOfStudy.monthsDuration" :required="true" />
      <FormANumberInput name="specificDurationHours" :label="t('specificDurationHours')" :min="0"
        v-model="programOfStudy.specificDurationHours" :hint="t('specificDurationHoursHint')" :required="true" />
      <FormANumberInput name="totalDurationHours" :label="t('totalDurationHours')" :min="0"
        v-model="programOfStudy.totalDurationHours" :hint="t('totalDurationHoursHint')" :required="true" />
      <FormADateInput name="publishedOn" :label="t('publishedOn')" :hint="t('publishedOnHint')"
        v-model="programOfStudy.publishedOn" :required="true" />
      <FormAUnitInput name="specificUnits" :label="t('specificUnits')" v-model="programOfStudy.specificUnits"
        :required="true" :hint="t('specificUnitsHint')" />
      <FormAUnitInput name="optionnalUnits" :label="t('optionnalUnits')" v-model="programOfStudy.optionnalUnits"
        :required="true" :hint="t('optionnalUnitsHint')" />
      <FormAUnitInput name="generalUnits" :label="t('generalUnits')" v-model="programOfStudy.generalUnits"
        :required="true" />
      <FormAUnitInput name="complementaryUnits" :label="t('complementaryUnits')"
        v-model="programOfStudy.complementaryUnits" />
      <FormMoleculesASubmitButton :isSubmiting="isSubmitting" />
      <input type="submit" value="aaa">
    </form>
  </div>
</template>

<i18n>
{
  "fr": {
    "title": "Programme d'étude",
    "programName": "Titre du programme",
    "programCode": "Code du programme",
    "programType": "Type de programme",
    "programTypePlaceholder":"Sélectionner un type de programme",
    "programNamePlaceholder":"Ex : Sciences humaines",
    "monthsDuration": "Durée en mois",
    "totalDurationHours": "Durée totale en heures",
    "specificDurationHours": "Durée spécifique en heures",
    "specificDurationHoursHint": "Nombre d'heures spécifiques au programme",
    "totalDurationHoursHint": "Nombre d'heures spécifiques au programme et à la formation générale",
    "publishedOn": "Publié le",
    "publishedOnHint": "Date de publication du programme",
    "specificUnits": "Unités obligatoires spécifiques au programme",
    "optionnalUnits": "Unités optionnelles spécifiques au programme",
    "generalUnits": "Unités des cours généraux (ex: philosophie, français)",
    "complementaryUnits": "Unités des complémentaires",
    "specificUnitsHint": "Indiquer le nombre d'unités maximales",
    "optionnalUnitsHint": "Indiquer le nombre d'unités maximales",
  }
}
</i18n>

<style scoped>
.user-form {
  padding: 0.5rem;
}

.form-title {
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 600;
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
</style>
