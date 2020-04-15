// ==UserScript==
// @name         A 站视频缓存 视频链接解析
// @namespace 	 czzonet
// @version      1.0.13
// @description  谁不想在遇到好视频的时候能够缓存下来呢？
// @author       czzonet
// @include      *://www.acfun.cn/v/ac*
// @include      *://www.acfun.cn/bangumi/aa*
// @exclude      *://*.eggvod.cn/*
// @connect      www.acfun.cn
// @license      GPL License
// @grant        GM_download
// @grant        GM_openInTab
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        unsafeWindow
// @grant        GM_setClipboard
// @grant        GM_getResourceURL
// @grant        GM_getResourceText
// ==/UserScript==

// 等待页面加载完毕
window.onload = function () {
  //1创建一个按钮节点
  var oButNode = document.createElement("input");
  oButNode.type = "button";
  oButNode.value = "获取链接";
  oButNode.onclick = function () {
    console.log("onclick");
    getlink();
  };
  document
    .getElementsByClassName("video-description clearfix")[0]
    .appendChild(oButNode);
};

function getlink() {
  // 获取当前window
  let pageWindow = this.window;
  console.log("this.window", pageWindow);
  // 视频链接的json对象
  var acdata = JSON.parse(pageWindow.pageInfo.currentVideoInfo.ksPlayJson)
    .adaptationSet.representation;
  console.log(
    "Please copy m3u8 url below(max screen resolution):\n复制以下m3u8链接（最高清晰度）:\n",
    acdata.pop().url
  );
}
