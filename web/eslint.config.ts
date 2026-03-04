import anyConfig from 'eslint-config-any';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  ...anyConfig.vue,
  {
    files: ['**/*.vue', '**/*.ts', '**/*.tsx', '**/*.js', '**/*.mjs', '**/*.cjs', '**/*.jsx'],
    rules: {
      'import/namespace': 'off',
    },
    settings: {
      'import/ignore': ['^@phosphor-icons/vue$'],
    },
  },
  {
    files: ['**/StatsSection/StatsSection.vue'],
    rules: {
      'import/named': 'off',
      'import/default': 'off',
      'import/export': 'off',
    },
  },
]);
