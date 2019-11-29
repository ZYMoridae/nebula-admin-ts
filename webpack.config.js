const path = require("path");
// var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve("nebula_admin"),
    publicPath: "/"
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  devServer: {
    // contentBase: path.join(__dirname, './src'),
    // watchContentBase: true,
    inline: true,
    port: 3000,
    hot: true,
    compress: true,
    https: false,
    historyApiFallback: true,
    proxy: {
      // '/api': 'http://ec2-13-54-77-173.ap-southeast-2.compute.amazonaws.com:8080',
      "/api": "http://localhost:8080"
    }
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json", ".jsx", ".css"]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2017", "react"],
          plugins: ["transform-object-rest-spread"]
        }
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 25000
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/"
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[hash].[ext]"
          }
        }
      }
    ]
  }
  // plugins: [
  //   new HtmlWebpackPlugin()
  // ]

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  // externals: {
  //     "react": "React",
  //     "react-dom": "ReactDOM"
  // }
};
