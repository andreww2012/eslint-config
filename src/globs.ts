export const GLOB_SRC_EXT = '?([cm])[jt]s?(x)';
export const GLOB_SRC = '**/*.?([cm])[jt]s?(x)';

export const GLOB_CONFIG_FILES = [`**/*.config.${GLOB_SRC_EXT}`, `**/.*rc.${GLOB_SRC_EXT}`];

export const GLOB_TS = '**/*.?([cm])ts';
export const GLOB_TSX = '**/*.?([cm])tsx';
export const GLOB_VUE = '**/*.vue';
