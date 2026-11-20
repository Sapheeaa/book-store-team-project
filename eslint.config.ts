import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
  // 1. Что не проверяет ESLint
  globalIgnores(['dist', 'coverage', 'node_modules', 'package-lock.json', '.husky']),

  // 2. Базовые правила ESLint для JS/TS
  js.configs.recommended,

  // 3. Правила TS - это массив конфигов
  tseslint.configs.recommended,

  // 4. TS сам проверяет неопределённые глобальные переменные или типы без предварительного объявления
  {
    files: ['**/*.{ts,mts,cts}'],
    rules: { 'no-undef': 'off' },
  },

  // 5. Код приложения: браузерное окружение + собственные правила проекта
  {
    files: ['src/**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: { globals: globals.browser },
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  // 6. Тесты, конфиги и скрипты исполняются в своем глобальном окружении Node
  {
    files: [
      '**/*.test.{ts,mts}',
      '**/*.spec.{ts,mts}',
      'tests/**/*.{ts,mts}',
      '**/*.config.{ts,mts,js,mjs}',
      'scripts/**/*.{ts,mts}',
    ],
    languageOptions: { globals: globals.node },
    rules: {
      'no-console': 'off',
    },
  },

  // 7. В последнюю очередь отключаем форматирование у ESLint (за форматирование отвечает Prettier)
  eslintConfigPrettier,
]);
