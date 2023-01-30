const { BrowserWindow, BrowserView,ipcMain } = require('electron')
const path = require('path');

var winList =[];

module.exports = {
  addBrowserWinAndView,
  watchOpenBrowserView
}

/**
  * 创建新窗口并打开链接
  * @param {*} icon 窗口icon
  * @param {*} url 链接
  * @returns 
  */
function addBrowserWinAndView (icon,url) {
  const tabWin = new BrowserWindow({
    useContentSize: true,
    icon,
    x:0,
    y:0,
    width: 1220,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  const view = new BrowserView();
  view.webContents.loadURL(url);
  view.setAutoResize({
    width:true,
    height:true
  });
  view.setBounds({ x: 0, y: 0, width: 1220, height: 1080 });
  tabWin.addBrowserView(view);
  tabWin.focus();
  return tabWin;
}

/**
 * 进程中的窗口列表
 * @param {*} icon 
*/
function watchOpenBrowserView (icon) {
  // 监听事件
  ipcMain.handle('browser-view:open', (event,url) => {
      // 判断是否已打开
      const host = url.split('#')[0].split('?')[0];
      const curWinIndex = winList.findIndex(v=>v.host === host);
      if(curWinIndex!==-1) {
        const curWin = winList[curWinIndex];
        // 已打开过但已被销毁
        if(!curWin.tabWin.isDestroyed()) {
          // 已打开的，前置窗口即可
            curWin.tabWin.focus();
            return;
        }
        // 清除记录
        winList.splice(curWinIndex,1);
      }
      // 创建窗体并记录入列
      const tabWin = addBrowserWinAndView(icon,url);
      winList.push({tabWin,host});
  });
}