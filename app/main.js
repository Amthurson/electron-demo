const { app, BrowserWindow } = require('electron')
const path = require('path')
const { watchOpenBrowserView } = require('./functions/broswerWinAndView.js');
const { showNotification } = require('./functions/notification.js');
const { setTray } = require('./functions/tray');
const { watchDarkModeSwitch } = require('./functions/theme')

const entry = path.join(__dirname, 'index.html')
const icon = path.join(__dirname,'assets/icon.ico')
const os = require('os');
const { watchAndSelectBluetooth } = require('./functions/bluetooth.js');

// 创建主程序窗口
const createWindow = () => {
  const win = new BrowserWindow({
    x: 0,
    left: 0,
    width: 1000,
    height: 1000,
    transparent: true,
    frame:false,
    useContentSize: true,
    icon,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile(entry);
  win.setRepresentedFilename(os.homedir())
  win.setDocumentEdited(true);
  return win;
}


app.whenReady().then(() => {
  // 创建主窗体
  const win = createWindow();
  // 设置任务栏菜单 Tray
  setTray(icon,win);
  
  // 监听事件触发访问设备蓝牙连接
  watchAndSelectBluetooth(win);

  // 监听管理窗口及页面打开
  watchOpenBrowserView(icon);

  // 系统消息提示
  showNotification();

  // 监听暗黑模式切换
  watchDarkModeSwitch()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})