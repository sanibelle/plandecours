<script setup>
const { t } = useI18n();
defineI18nRoute({
  paths: {
    fr: '/administrationnnn',
  },
});
</script>

<template>
  <p>test</p>
  <div>{{ t('test') }}</div>
  <div>{{ $t('test') }}</div>
</template>

<i18n lang="json">
{
  "fr": {
    "test": "Bienvenue sur notre sitaeae"
  }
}
</i18n>
