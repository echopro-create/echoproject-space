// .eslintrc.cjs
module.exports = {
  extends: ['next', 'next/core-web-vitals'],
  rules: {
    // апрещаем кракозябры
    'no-mojibake': 'error',
  },
  plugins: ['mojibake'],
};
