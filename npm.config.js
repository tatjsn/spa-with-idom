export default {
  build: {
    rollupOptions: {
      input: {
        main: './main.js',
      },
      output: {
        entryFileNames: () => '[name].js',
      },
    },
  },
};
