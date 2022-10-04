module.exports = {
  env: {
      browser: true,
      es2021: true,
    },
    globals: {
      API: 'readonly',
    },
    plugins: ['simple-import-sort'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
    overrides: [
      // override "simple-import-sort" config
      {
        files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
        rules: {
          'simple-import-sort/imports': [
            'error',
            {
              groups: [
                // react等包放在首位.
                ['^react', '^@?\\w'],
                // 绝对路径导入.
                ['^(@|components)(/.*|$)'],
                // 其他文件夹下的文件
                ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                // 当前同级文件下的文件.
                ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                // 其他的导入.
                ['^\\u0000'],
                // 样式.
                ['^.+\\.?(css)$', '^.+\\.?(scss)$', '^.+\\.?(less)$'],
              ],
            },
          ],
        },
      },
    ],
  };