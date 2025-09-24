// .eslint-plugin-mojibake.js
module.exports = {
  rules: {
    'no-mojibake': {
      create: function (context) {
        return {
          Program: function (node) {
            const src = context.getSourceCode().text;
            if (/|С/.test(src)) {
              context.report({ node, message: 'бнаружен мусор в кодировке (mojibake)' });
            }
          },
        };
      },
    },
  },
};
