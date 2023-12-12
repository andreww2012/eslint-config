import {FileSystemIconLoader} from 'unplugin-icons/loaders';
import Icons from 'unplugin-icons/vite';

// ~WARNING~: if you want to override one of these aliases (in `alias` or `vite.resolve.alias`),
// REMOVE them from this list, otherwise you won't be able to
const NUXT_ALIASES_TO_REMOVE = ['@@', '~', '~~', 'assets', 'public'] as const;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  imports: {
    autoImport: false,
  },

  // Avoid adding user defined components `#components`
  components: {
    dirs: [],
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-typed-router',
    '@nuxtjs/google-fonts',
    'unplugin-icons/nuxt',
  ],

  googleFonts: {
    families: {
      Rubik: [400, 500],
    },
  },

  nuxtTypedRouter: {
    strict: true,
  },

  vite: {
    plugins: [
      Icons({
        customCollections: {
          custom: FileSystemIconLoader('./assets/icons', (svg) =>
            svg.replace(/^<svg /, '<svg fill="currentColor" '),
          ),
        },
      }),
    ],
  },

  hooks: {
    // Removes certain default aliases in the generated tsconfig
    // Source: https://github.com/nuxt/nuxt/issues/14816#issuecomment-1397366520
    'prepare:types': ({tsConfig}) => {
      for (const baseAlias of NUXT_ALIASES_TO_REMOVE) {
        [baseAlias, `${baseAlias}/*`].forEach((alias) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          delete tsConfig.compilerOptions?.paths[alias];
        });
      }
    },

    // Removes certain default aliases from vite aliases (yes, removing them
    // only from tsconfig is not enough - they will still be accessible)
    'vite:extendConfig': (config) => {
      const aliases = config.resolve?.alias;
      for (const baseAlias of NUXT_ALIASES_TO_REMOVE) {
        if (aliases && typeof aliases === 'object' && !Array.isArray(aliases)) {
          [baseAlias, `${baseAlias}/*`].forEach((alias) => {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete (aliases as Record<string, string>)[alias];
          });
        }
      }
    },

    // Avoid adding user code (only non-components) to `#imports`
    'imports:dirs': (param) => {
      param.length = 0;
    },
  },

  devtools: {
    enabled: true,
  },
});
