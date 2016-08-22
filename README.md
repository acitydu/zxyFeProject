# zxyFeProject
###zxy前端项目Gulp工作流

- *适用于多页面的非SPA前端项目*
- *dev为开发目录，dist为生产目录*
- *SPA项目建议使用Vue.js的官方构建方式构建，---》》》* <a href="http://vuejs.org.cn/guide/installation.html">vuejs命令行安装</a>

###zxy前端公共样式库（常用样式和less方法提取）、js库（封装了常用方法）
- **css、js、fonts文件夹为ZXY前端Lib文件，长期更新**

##安装
1.预备环境：nodejs 

2.全局安装 Gulp：

``` npm install gulp -g ```

3.进入根目录执行：

```npm install```

4.开发：

根目录执行 ``` gulp ```

访问： http://localhost:8080

5.输出到生产目录dist

根目录执行 ``` gulp build ```

##功能
1.html压缩、自动更新带md5版本戳的文件链接

2.less编译、css压缩、文件名生成md5版本戳

3.ES6转ES5、js压缩、文件名生成md5版本戳

4.删除生产目录的旧文件、输出到生产目录

5.livereload修改文件后浏览器实时刷新
    
##扩展资料
1.less：<a href="http://www.bootcss.com/p/lesscss/">文档</a>

2.ES6: <a href="http://es6.ruanyifeng.com/">文档</a>