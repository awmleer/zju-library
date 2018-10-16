# 浙图

检索和收藏浙江大学图书馆中的书目。

![homepage](screenShots/homepage.png)

👽欢迎提交PR和issue！

## 架构说明

这是一个基于ionic框架的hybrid app

接口主要来自于：

1. 浙大图书馆的API
2. 豆瓣开放API
3. 通过leanCloud搭建的后端


## 命令&脚本说明

### 环境配置

```bash
$ yarn global add ionic cordova
$ yarn install
```

或者

```bash
$ npm install -g ionic cordova
$ npm install
```

### 开始开发

```bash
$ ionic serve
```

### 打包app

```bash
# Android
$ ionic cordova build android --release --prod
$ ./signApk.sh
# iOS
$ ionic cordova build ios --prod
```


### 上传apk

```bash
$ qshell -m fput zjulibrary apk/zjuLibraryLatest.apk apk/zjuLibraryx.x.x.apk true
```


注：

由于*浙大图书馆*为商标，无法上架App Store，所以只能取名为*浙图*。
