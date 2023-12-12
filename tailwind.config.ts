import type {Config} from 'tailwindcss';
// import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

const config: Partial<Config> = {
  content: [
    // TODO
  ],

  theme: {
    extend: {
      // ...
    },
  },

  plugins: [
    // https://github.com/tailwindlabs/tailwindcss/discussions/2213
    plugin(({addUtilities}) => {
      addUtilities({'.overflow-anywhere': {overflowWrap: 'anywhere'}});
    }),

    // Fixes https://github.com/tailwindlabs/tailwindcss/discussions/7044
    plugin(({matchUtilities, theme}) => {
      matchUtilities(
        {
          invert: (value) => {
            const cssFilterValue = [
              'var(--tw-blur,)',
              'var(--tw-brightness,)',
              'var(--tw-contrast,)',
              'var(--tw-grayscale,)',
              'var(--tw-hue-rotate,)',
              'var(--tw-invert,)',
              'var(--tw-saturate,)',
              'var(--tw-sepia,)',
              'var(--tw-drop-shadow,)',
            ].join(' ');

            return {
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              '--tw-invert': `invert(${value})`,
              filter: cssFilterValue,
            };
          },
        },
        {values: theme('invert')},
      );
    }),
  ],
};

export default config;
