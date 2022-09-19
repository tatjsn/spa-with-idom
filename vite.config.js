import { resolve } from 'path';

export default {
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, './index.html'),
        sw: resolve(__dirname, './sw.js'),
      },
      output: {
        // Path of sw.js must be stable at root
        entryFileNames: (chunk) => {
          if (chunk.name === 'sw') return 'sw.js';
          return 'assets/[name].[hash].js';
        }
      },
    },
  },
};
