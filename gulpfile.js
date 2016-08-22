var gulp = require('gulp');
var watch = require('gulp-watch');
var del = require('del');                // 删除插件
var less = require('gulp-less');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var htmlmin = require('gulp-htmlmin');
var babel = require("gulp-babel");
var runSequence = require('gulp-run-sequence'); // 改变任务优先级
var cache = require('gulp-cache');         // 缓存插件，使图片仅更新缓存中不一样的图片
var stripDebug = require('gulp-strip-debug'); 
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');

// 图片压缩优化
gulp.task('imageBuild', function() {
    return gulp.src('./dev/img/**/*.{png,jpg,gif,ico,svg}')
        .pipe(cache(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        })))
        .pipe(gulp.dest('dist/img/'));
});

//拷贝字体
gulp.task('fontsBuild', function() {
	return gulp.src('./dev/fonts/*').pipe(gulp.dest('dist/fonts/'));
});

//监控文件变化
gulp.task('watch',function(){
	gulp.watch('./dev/**/*',['dev']);
})

/*实时预览*/
gulp.task('server',function(){
	connect.server({
		root:'dev',    //设置文件根目录
		port:'8080',	//设置端口
		livereload:true //动态加载
	})
})

/*默认任务*/
gulp.task('default',['server','watch']);

/*js压缩、ES6转换ES5、文件名生成md5版本戳*/
gulp.task('jsBuildMin',function(){
	return gulp.src(['./dev/js/*.js','!./dev/js/jquery.min.js','!./dev/js/vue.min.js'])
  .pipe(babel({
      presets: ['es2015']
    }))
  .pipe(stripDebug())
  .pipe(uglify())
	.pipe(rev())
	.pipe(gulp.dest('./dist/js/'))
	.pipe(rev.manifest())
  .pipe(gulp.dest('./rev/js'));
})

gulp.task('jsBuildCopy', function() {
  return gulp.src(['./dev/js/jquery.min.js','./dev/js/vue.min.js'])
  .pipe(stripDebug())
  .pipe(uglify())
  .pipe(gulp.dest('./dist/js'));
});
/*less转css编译 压缩 文件名生成md5版本戳*/

gulp.task('cssBuild',function(){
	return gulp.src('./dev/css/style-index.less')
	.pipe(less())
	.pipe(minifycss())
	.pipe(rev())
	.pipe(gulp.dest('dist/css/'))
	.pipe(rev.manifest())
  .pipe(gulp.dest('./rev/css'));
})

gulp.task('cssDev',function(){
  return gulp.src('./dev/css/style-index.less')
  .pipe(less())
  .pipe(gulp.dest('dev/css/'));
}) 

// 替换html里的js和css链接，压缩html
gulp.task('rev',function(){
  return gulp.src(['rev/**/*.json','./dev/*.html'])
    .pipe(revCollector())
    .pipe(htmlmin({
      removeComments: true,        // 去除注释
      collapseWhitespace: true,    // 去除空格 
      minifyJS: true,              // 优化行内JS
      minifyCSS: true             // 优化行内样式
    }))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('htmlDev', ['cssDev'],function () {
  return gulp.src('dev/*.html')
  .pipe(connect.reload());
});

//删除生产目录的旧文件
gulp.task('cleanBuild', function() {
    return del(['dist/**/*', '!dist','!dist/img','!dist/img/**/*.{jpg,png,gif,ico,svg}']);
});

//开发任务
gulp.task('dev', function() {
    runSequence('cssDev','htmlDev')
});

//输出到生产目录（上线发布目录）
gulp.task('build', function() {
    runSequence('cleanBuild',[ "cssBuild", "imageBuild" , "fontsBuild" ,'jsBuildCopy', "jsBuildMin"], 'rev')
});

