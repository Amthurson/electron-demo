const { Tray, Menu } = require('electron')

const MENU_SETTINGS = [
    { type: 'separator' },
    { label: '渗透模式', type: 'radio' },
    { label: 'debug模式', type: 'radio', checked: true },
    { type: 'separator' },
    { label: '控制面板', type: 'submenu', 
        submenu: [
            { label: '主从设置', type: 'normal' },
            { label: '云同步', type: 'normal' },
        ] 
    },
    { label: '展开', type: 'normal', role: 'unhide' },
    { label: '托盘', type: 'normal', role: 'minimize'},
    { label: '退出', type: 'normal', role: 'quit' },
]

module.exports = {
    /**
     * 显示通知并返回传递的信息
     * @param {*} win 窗体对象 BrowserWindow
     * @param {*} icon 任务栏图标 img
     */
    setTray:(icon,win)=> {
         // Tray Icon
        const tray = new Tray(icon)
        const hideBtn = MENU_SETTINGS.find(v=>v.label==='托盘');
        hideBtn.click = ()=>{
            win.hide();
        }
        const showBtn = MENU_SETTINGS.find(v=>v.label==='展开');
        showBtn.click = ()=>{
            win.show();
        }
        const contextMenu = Menu.buildFromTemplate(MENU_SETTINGS)

        tray.setToolTip('Ledeng');
        tray.on('double-click',()=>{
            win.show();
        })
        tray.setContextMenu(contextMenu);
    }
}