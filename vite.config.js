import { resolve } from 'path';

export default {
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, './index.html'),
        foo: resolve(__dirname, './foo.html'),
        bar: resolve(__dirname, './bar.html'),
      },
    },
  },
};
