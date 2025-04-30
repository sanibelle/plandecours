// plugins/vee-validate.js
import { defineRule, configure } from 'vee-validate';
import { required, email, min, max, regex } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';

export default defineNuxtPlugin(() => {
  // Define global validation rules
  defineRule('required', required);
  defineRule('email', email);
  defineRule('min', min);
  defineRule('max', max);
  defineRule('regex', regex);

  // Exemple de custom rule
  //   defineRule('password', (value) => {
  //     if (!value || !value.length) {
  //       return true; // Skip validation if field is empty (required will handle this)
  //     }

  //     // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  //     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  //     if (!passwordRegex.test(value)) {
  //       return false;
  //     }

  //     return true;
  //   });

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
        },
      },
    }),
  });
});
