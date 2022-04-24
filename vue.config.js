const { defineConfig } = require('@vue/cli-service')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin({
        languages: ['cpp', 'c', 'python'],
      }),
    ],
  },
  pages: {
    index: "src/apps/auth/main.js",
    student: "src/apps/student/main.js",
    teacher: "src/apps/teacher/main.js",
  }
})
