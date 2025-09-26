/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint','import','unused-imports','tailwindcss'],
  extends: ['next/core-web-vitals','plugin:@typescript-eslint/recommended','plugin:tailwindcss/recommended'],
  rules: {
    'unused-imports/no-unused-imports': 'error',
    'import/order': ['error', { 'alphabetize': { 'order': 'asc', 'caseInsensitive': true }, 'newlines-between': 'always' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'tailwindcss/no-custom-classname': 'off'
  },
  settings: { tailwindcss: { callees: ['twMerge'], config: 'tailwind.config.mjs' } }
}
