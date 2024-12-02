import antfu from '@antfu/eslint-config';

export default antfu({
  type: 'app',
  typescript: true,
  formatters: true,
  stylistic: {
    indent: 2,
    semi: true,
    qoutes: 'double',
  },
  rules: {
    'no-console': ['warn'],
    'perfectionist/sort-imports': ['error', {
      internalPattern: ['@/.+'],
    }],
    'unicorn/filename-case': ['error', {
      case: 'kebabCase',
      ignore: ['README.md', 'src-tauri/.+'],
    }],
  },
  ignores: ['src-tauri/**'],
});
