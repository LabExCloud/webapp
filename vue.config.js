const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: "src/apps/auth/main.js",
    student: "src/apps/student/main.js",
    teacher: "src/apps/teacher/main.js",
  }
})
