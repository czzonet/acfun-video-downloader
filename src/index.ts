// ==UserScript==
// @name         A 站视频缓存 视频链接解析
// @namespace 	 czzonet
// @version      1.0.26
// @description  谁不想在遇到好视频的时候能够缓存下来呢？
// @author       czzonet
// @include      *://www.acfun.cn/v/ac*
// @include      *://www.acfun.cn/bangumi/aa*
// @exclude      *://*.eggvod.cn/*
// @connect      www.acfun.cn
// @license      MIT License
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
  // 插入到标题
  let descriptionElement = document.getElementsByClassName(
    "video-description clearfix"
  )[0];
  // 创建一个按钮节点
  let oButNode = nodeButton('获取链接')

  oButNode.onclick = function () {
    let links = getlink();
    for (let index = 0; index < links.length; index++) {
      const element = links[index];

      descriptionElement.appendChild(nodeText(`【${element.qualityType}】`));
      descriptionElement.appendChild(nodeText(element.url));
    }
  };
  descriptionElement.appendChild(oButNode);
};

// type Target = {
//   pagrInfo:any
// }

// type MyWindow = typeof that& Target

// 解析链接
function getlink() {
  // 获取当前window

  let pageWindow = this.window as any
  // 视频链接的json对象
  let acdata = JSON.parse(pageWindow.pageInfo.currentVideoInfo.ksPlayJson)
    .adaptationSet.representation;
  console.log(
    "Please copy m3u8 url below(max screen resolution):\n复制以下m3u8链接（最高清晰度）:\n",
    acdata.pop().url
  );

  return acdata;
}

// 创建一个文字节点
function nodeText(text: string) {
  let textNode = document.createElement("div");
  textNode.innerText = text;

  return textNode;
}
// 创建一个按钮节点
function nodeButton(text: string) {
  let oButNode = document.createElement("input");
  oButNode.type = "button";
  oButNode.value = text;
  oButNode.style.margin = '10px'
  oButNode.style.borderWidth = '1px'
  oButNode.style.paddingTop = '5px'
  oButNode.style.paddingBottom = '5px'
  oButNode.style.paddingLeft = '10px'
  oButNode.style.paddingRight = '10px'
  oButNode.style.backgroundColor = '#5e64ff'
  oButNode.style.color = "#fff";
  oButNode.style.fontSize = "12px";
  oButNode.style.lineHeight = "1.5";
  oButNode.style.borderRadius = "3px";
  oButNode.style.borderColor = "#444bff";
  oButNode.style.display = "block";
  oButNode.style.cursor = "pointer";

  return oButNode;
}
