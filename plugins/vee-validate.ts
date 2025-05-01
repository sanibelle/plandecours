// plugins/vee-validate.js
import { defineRule, configure } from 'vee-validate';
import {
  required,
  email,
  min,
  max,
  regex,
  max_value,
  min_value,
  numeric,
  integer,
} from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';

export default defineNuxtPlugin(() => {
  // Define global validation rules
  defineRule('required', required);
  defineRule('email', email);
  defineRule('min', min);
  defineRule('max', max);
  defineRule('regex', regex);
  defineRule('max_value', max_value);
  defineRule('min_value', min_value);
  defineRule('numeric', numeric);
  defineRule('integer', integer);

  // Exemple de custom rule
  defineRule('date', (value: any) => {
    // Skip validation if field is empty (required will handle this)
    if (!value) {
      return true;
    }
    if (value instanceof Date) {
      return false;
    }
    return true;
  });

  // Configure VeeValidate globally
  configure({
    generateMessage: localize({
      fr: {
        messages: {
          required: 'Ce champ est requis',
          email: 'Veuillez saisir une adresse e-mail valide',
          min: 'Ce champ doit contenir au moins {length} caractères',
          max: 'Ce champ ne doit pas dépasser {length} caractères',
          regex: 'Le format de ce champ est invalide',
          max_value: 'La valeur ne doit pas dépasser {max}',
          min_value: 'La valeur doit être au moins {min}',
          numeric: 'Ce champ doit être un nombre',
          integer: 'Ce champ doit être un nombre entier',
        },
      },
    }),
  });
});
