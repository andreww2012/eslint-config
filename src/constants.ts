/* Error levels */

export const ERROR = 2 as const;
export const WARNING = 1 as const;
export const OFF = 0 as const;

/* Globs */

export const GLOB_JS_TS_EXTENSION = '?([cm])[jt]s?(x)';
export const GLOB_JS_TS = `**/*.${GLOB_JS_TS_EXTENSION}`;

export const GLOB_CONFIG_FILES = [
  `**/*.config.${GLOB_JS_TS_EXTENSION}`,
  `**/.*rc.${GLOB_JS_TS_EXTENSION}`,
];

export const GLOB_TS = '**/*.?([cm])ts';
export const GLOB_TSX = '**/*.?([cm])tsx';

export const GLOB_VUE = '**/*.vue';
