import path from "path";

const rootPath = __dirname;

const config = {
    rootPath,
   mongoose: {
     db: 'mongodb://localhost/forum',
   },
  publicPath: path.join(rootPath, 'public'),
};

export default config;