module.exports = {
    env: {
        node: true,
        browser: true,
        es2021: true,
        jest: true
    },
    parser: 'vue-eslint-parser',
    extends: [
        'plugin:vue/vue3-essential',
        'plugin:vue/vue3-recommended',
        'airbnb-base',
        'plugin:vue/vue3-strongly-recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        './.eslintrc-auto-import.json', //在这里配置生成的JSON文件 需要和vite.config.ts文件保持一致
    ],
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
            extensions: ['.jsx', '.ts', '.tsx']
        },
        'import/resolver': {
            alias: {
                map: [['@', './src']],
                extensions: ['.jsx', '.ts', '.tsx']
            },
            node: {
                extensions: ['.jsx', '.ts', '.tsx', '.css']
            },
            typescript: {
                alwaysTryTypes: true,
                project: '@'
            }
        }
    },
    globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        ref: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
        defineOptions: 'readonly'
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: '@typescript-eslint/parser',
        ecmaFeatures: {
            jsx: true,
        },
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json', './vite-config.ts'],
        extraFileExtensions: ['.vue']
    },
    plugins: [
        'vue',
        '@typescript-eslint',
        'prettier',
        'simple-import-sort'
    ],
    rules: {
        'vue/no-v-html': 'off',
        'vue/multi-word-component-names': 'off',
        'no-console': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'prefer-promise-reject-errors': 'off',
        'linebreak-style': 'off', // 回车换行风格
        'no-trailing-spaces': 1, // 禁用行尾空格
        'no-param-reassign': 'off', // 禁止对函数参数再赋值
        'import/prefer-default-export': 'off',
        'no-restricted-globals': 'off',
        // 禁止不必要的转义字符
        'no-useless-escape': 0,
        "camelcase": 0,//不检查属性驼峰风格
        'object-curly-newline': 'off', // 不强制花括号内换行
        'arrow-body-style': 'off', // 箭头函数不强制以用块体（用花括号表示）
        'import/named': 'off', // 停用 import/named 校验
        'no-unused-expressions': 'off', // 禁止使用未使用的表达式
        'max-len': ['error', {code: 120}],
        'comma-dangle': ["error", "never"], // 禁止末尾使用的逗号
        'import/extensions': [
            'error',
            'always',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never'
            }
        ],
        // 默认不能使用一元运算符++和--
        'no-plusplus': [
            'error',
            {
                allowForLoopAfterthoughts: true
            }
        ],
        "sort-imports": "off",
        "import/order": "off",
        'import/no-cycle': 'off',
        'no-underscore-dangle': 'off',
        'prefer-object-spread': 'off',
        'arrow-parens': [2, 'as-needed', {requireForBlockBody: false}],
        'no-async-promise-executor': 'off',
        'vue/no-multi-spaces': 'error', // 不允许有多余的空格
        'vue/html-end-tags': 'error',
        'vue/no-spaces-around-equal-signs-in-attribute': ['error'],
        'vue/html-closing-bracket-newline': [
            'error',
            {
                // 多行 html 结束符需要换行
                singleline: 'never',
                multiline: 'always'
            }
        ],
        "vue/max-attributes-per-line": ["error", {
            "singleline": {
                "max": 1
            },
            "multiline": {
                "max": 1
            }
        }],
        'vue/html-indent': [
            'error',
            2,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: []
            }
        ],
        'vue/html-closing-bracket-spacing': [
            'error',
            {
                startTag: 'never',
                endTag: 'never',
                selfClosingTag: 'always'
            }
        ],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'simple-import-sort/imports': 'error',
        "import/first": "error",
        'import/no-extraneous-dependencies': 'off',
        "import/newline-after-import": "error",
        "import/no-duplicates": "error",
        "simple-import-sort/exports": "error",
        /**
         * 对未使用的参数使用“_”进行标识，防止某些情况下出现警告
         */
        '@typescript-eslint/no-unused-vars': ['warn', {argsIgnorePattern: '_', varsIgnorePattern: '_'}],
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'semi',
                    requireLast: true
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: true
                }
            }
        ]
    },
    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
            env: {
                jest: true
            },
        }
    ]
}
