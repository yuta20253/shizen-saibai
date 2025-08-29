/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // TypeScript用パーサー指定
  plugins: ['@typescript-eslint', 'prettier'], // プラグイン読み込み
  extends: [
    'next/core-web-vitals', // Next.js推奨ルール
    'plugin:@typescript-eslint/recommended', // TypeScript推奨ルール
    'plugin:prettier/recommended', // Prettierと競合しない設定
  ],
  rules: {
    'prettier/prettier': 'error', // Prettierの違反をエラーにする
  },
};
