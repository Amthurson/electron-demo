const { Tray, Menu } = require('electron')

const MENU_SETTINGS = [
    { label: '功能分组一', type: 'separator' },
    { label: '渗透模式', type: 'radio' },
    { label: 'debug模式', type: 'radio', checked: true },
    { label: '控制面板', type: 'submenu', 
        submenu: [
            { label: '主从设置', type: 'normal' },
            { label: '云同步', type: 'normal' },
        ] 
    },
    { label: '展开', type: 'normal', role: 'window' },
    { label: '退出', type: 'normal', role: 'quit' },
]

module.exports = {
    /**
     * 显示通知并返回传递的信息
     * @param {*} win 窗体对象 BrowserWindow
     * @param {*} icon 任务栏图标 BrowserWindow
     */
    setTray:(icon,win)=> {
         // Tray Icon
        const tray = new Tray(icon)

        const contextMenu = Menu.buildFromTemplate(MENU_SETTINGS)

        tray.setToolTip('Ledeng');
        tray.on('double-click',()=>{
            win.show();
        })
        tray.setContextMenu(contextMenu)
    }
}