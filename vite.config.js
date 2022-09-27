import { resolve } from 'path';

export default {
  root: './app',
  build: {
    rollupOptions: {
      input: {
        index: './app/index.html',
        foo: './app/foo.html',
        bar: './app/bar.html',
      },
    },
  },
};
