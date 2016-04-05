module.exports = function (grunt) {
  //定义各种模块的参数，每一个成员项对应一个同名模块
  grunt.initConfig({
    //读取package.json的内容，形成个json数据
    pkg: grunt.file.readJSON('package.json'),
    //压缩js
    uglify:{
      //文件头部输出信息
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        //如果设为true，就表示下面文件名的占位符（即*号）都要扩展成具体的文件名。
        expand: true,
        //相对路径,需要处理的文件所在的目录
  			cwd: 'js/',
        //不包含某个js,某个文件夹下的js
  			src: ['**/*.js', '!**/*.min.js'],
        //表示处理后的文件名或所在目录
  			dest: 'js_min/',
        //处理后的文件后缀名
        ext:'.min.js'
      }
    },
    //压缩css
    cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        //美化代码
        beautify: {
          //中文ascii化，非常有用！防止中文乱码的神配置
          ascii_only: true
        }
      },
      build: {
        expand: true,
        cwd: 'stylesheets/',
        src: ['**/*.css'],
        dest: 'css_min/',
        ext:'.min.css'
      }
    },
    //编译sass
    compass: {
      options: {
        //美化代码
        beautify: {
          //中文ascii化，非常有用！防止中文乱码的神配置
          ascii_only: true
        }
      },
      build: {
        options: {
          sassDir: 'sass',
          cssDir: 'stylesheets'
        }
      },
      dev: {
        options: {
          sassDir: 'sass',
          cssDir: 'stylesheets',
          watch: true
        }
      }
    }
  });
  //加载完成任务所需的模块
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //定义具体的任务。第一个参数为任务名，第二个参数是一个数组， 表示该任务需要依次使用的模块。
  grunt.registerTask('default', [ 'uglify', 'compass:build', 'cssmin']);
  grunt.registerTask('sasswatch', [ 'compass:dev']);
}
