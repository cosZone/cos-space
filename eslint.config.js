import eslintPluginAstro from 'eslint-plugin-astro';
import eslintPluginReactGoogleTranslate from 'eslint-plugin-react-google-translate';

export default [
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs['jsx-a11y-recommended'],
  {
    plugins: {
      'react-google-translate': eslintPluginReactGoogleTranslate,
    },
    rules: {},
  },
];
