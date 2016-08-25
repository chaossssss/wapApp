var path = require('path');
var fs = require('fs');

var gulp = require('gulp');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var replace = require('gulp-str-replace');
var yargs = require('yargs').argv;
var browserSync = require('browser-sync');

/* 基础路径 */
var paths = {
  css       :  "src/css/",
  less      :  "src/less/",
  js        :  "src/js/",
  img       :  "src/images/",
  template  :  "src/template/", 
  build     :  "dist",
  src       :  "src" 
}

// var resProxy = "项目的真实路径";
// var prefix = "项目的真实路径"+jsonObj.name;
var resProxy = "";  //代理服务器
var prefix = "";  //前缀

// if(DEBUGGER) {
//     resProxy = "http://localhost:8080/build";
//     prefix = "http://localhost:8080/build";
// }

//清理所有压缩文件
gulp.task('clean',function(){
	gulp.src(paths.build)
		.pipe(clean());
});

//压缩html
gulp.task('build:html',function(){
	gulp.src(paths.src+'/**/*.html')
    .pipe(replace({
          original : {
            resProxy : /\@{3}RESPREFIX\@{3}/g,
            prefix : /\@{3}PREFIX\@{3}/g
          },
          target : {
            resProxy : resProxy,
            prefix : prefix
          }
      }))
		.pipe(gulp.dest(paths.build))
		.pipe(browserSync.reload({stream: true}));
});

//压缩js
gulp.task('build:js',function(){
	gulp.src(paths.js+'**/*.js')
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(rename(function (path) {
            path.basename += '.min';
        }))
        .pipe(sourcemaps.write('./'))
    .pipe(replace({
            original : {
              resProxy : /\@{3}RESPREFIX\@{3}/g,
              prefix : /\@{3}PREFIX\@{3}/g
            },
            target : {
              resProxy : resProxy,
              prefix : prefix
            }
        }))   
		.pipe(gulp.dest(paths.build+'/js'))
		.pipe(browserSync.reload({stream: true}));
});

//压缩css
gulp.task('build:css',function(){
	gulp.src(path.css+'**/*.css')
		.pipe(sourcemaps.init())
		.pipe(postcss([autoprefixer({browsers:['last 2 versions']})]))
		.pipe(minifyCSS())
		.pipe(rename(function (path) {
            path.basename += '.min';
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(replace({
              original : {
                resProxy : /\@{3}RESPREFIX\@{3}/g,
                prefix : /\@{3}PREFIX\@{3}/g
              },
              target : {
                resProxy : resProxy,
                prefix : prefix
              }
          }))
        .pipe(gulp.dest(paths.build+'/css'))
        .pipe(browserSync.reload({stream: true}));
});

// 压缩图片
gulp.task('build:images', function () {
    gulp.src(paths.img+'**/*.?(png|jpg|gif)')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(paths.build+'/images'))
        .pipe(browserSync.reload({stream: true}));
});

//生成候选版本
gulp.task('release',['build:js','build:css','build:images','build:html']);

gulp.task('watch',['release'],function(){
	gulp.watch(paths.css+'**/*.css',['build:css']);
	gulp.watch(paths.js+'**/*.js',['build:js']);
	gulp.watch(paths.img+'**/*.?(png|jpg|gif)',['build:images']);
	gulp.watch(paths.src+'**/*.html',['build:html']);
});

//服务器配置
gulp.task('server', function () {
    yargs.p = yargs.p || 8080;
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        ui: {
            port: yargs.p + 1,
            weinre: {
                port: yargs.p + 2
            }
        },
        port: yargs.p,
        startPath: '/'
    });
});

// 参数说明
//  -w: 实时监听
//  -s: 启动服务器
//  -p: 服务器启动端口，默认8080
// 	-ws: 开发，浏览器实时显示
gulp.task('default', ['release'], function () {
    if (yargs.s) {
        gulp.start('server');
    }

    if (yargs.w) {
        gulp.start('watch');
    }
});



