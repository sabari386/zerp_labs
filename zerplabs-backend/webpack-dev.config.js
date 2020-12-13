const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');
const exec = require('child_process').exec;

const {
  NODE_ENV = 'development',
} = process.env;
module.exports = {
  entry: './src/server/index.ts',
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
        ]
      }
    ]
  },
  externals: [ nodeExternals() ],
  watch: NODE_ENV === 'development',
  plugins: [
    /* new WebpackShellPlugin({
      //onBuildEnd: ['npm run:dev']
      onBuildStart: ['echo "hello world"'], 
      onBuildEnd: ['echo "goodbye world"'] 
    }) */
    {
        apply: (compiler) => {
          compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
            exec('env-cmd -f ./environments/.env.development nodemon build/index.js', (err, stdout, stderr) => {
              if (stdout) process.stdout.write(stdout);
              if (stderr) process.stderr.write(stderr);
            });
          });
        }
      }
  ]
}