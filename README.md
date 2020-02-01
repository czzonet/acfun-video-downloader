# A 站视频下载

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
