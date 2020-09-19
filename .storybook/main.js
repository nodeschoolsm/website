module.exports = {
  stories: ["../components/**/*.book.js"],
  addons: ["@storybook/addon-essentials"],
  webpackFinal: (config) => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            test: /\.css1$/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  importLoaders: 1
                }
              },
              "postcss-loader"
            ]
          }
        ]
      }
    }
  }
}
