# A 站视频缓存

谁不想在遇到好视频的时候能够缓存下来呢？

**声明：** 本教程提供一种缓存视频的方法，意在方便离线也能观看，对于任何不当使用概不负责！

## 20200201 更新

新方法是通过页面脚本提取`m3u8`地址，然后直接使用下载器下载整合。原理并没有太大区别，只是工具更加高级，操作更为方便。

### 1. 页面脚本提取`m3u8`地址

用`F12`打开控制台，输入以下代码：

```js
var acdata = JSON.parse(window.videoInfo.currentVideoInfo.ksPlayJson)
  .adaptationSet.representation;
console.log(
  "Please copy m3u8 url below(max screen resolution):\n",
  acdata.pop().url
);
```

注：_参考了脚本[Acfun-hls](https://greasyfork.org/zh-CN/scripts/389607-acfun-hls)_

### 2. 使用下载器下载整合

下载[m3u8 downloader](https://github.com/nilaoda/N_m3u8DL-CLI/releases)，分别下载一个主程序和一个 dll 库文件。再下载[ffmpeg](https://ffmpeg.zeranoe.com/builds/win64/static/)，选最下面最新的进行解压，并把前面下载的两个文件拷贝到`bin`目录，双击运行主程序，输入第一步拷贝的链接粘贴即可下载，输出`.mp4`文件在当前目录的`Download`文件夹。

## 20190903 更新

A 站原先用硕鼠直接可以下载，现在只能下 m3u8 文件，需要再用对应下载器下载整合。而且是相对地址需要前缀,步骤如下

### 1. 使用硕鼠下载`.m3u8`文件

把 a 站视频网址输入到硕鼠官网，解析后下载`.m3u8`文件，放入`source`源文件夹。

### 2. 脚本批量添加前缀

首先用 network 查看一般的 xhr 视频片段请求的地址，取其前缀类似于

```sh
https://tx-video.acfun.cn/mediacloud/acfun/acfun_video/segment/
```

复制到`main.ts`，然后编译运行

**环境要求：** _nodejs,typescript_

```sh
tsc
node ./dist/main.js
```

程序会把`.m3u8`文件每个地址都加上这个前缀。结果输出在`target`目标文件夹。

### 3. 下载并整合

把修改后的文件拖入`m3u8下载器`(网上搜索)即可下载。输出文件在程序目录下的`output`文件夹里。最后用`FFpegm`整合成一个视频文件。

## References

1. [m3u8 downloader](https://github.com/nilaoda/N_m3u8DL-CLI/releases)
2. [ffmpeg](https://ffmpeg.zeranoe.com/builds/win64/static/)
3. [Acfun-hls](https://greasyfork.org/zh-CN/scripts/389607-acfun-hls)
