const { Notification,ipcMain } = require('electron')

const NOTIFICATION_TITLE = '通知'
const NOTIFICATION_BODY = 'Notification from the Renderer process. 点击查看'
const CLICK_MESSAGE = 'Bily: Bravo John! Reply when you arrived!'

module.exports = {
    /**
     * 显示通知并返回传递的信息
     * @param {*} title 通知标题 
     * @param {*} body 通知栏缩略内容
     * @param {*} clickMessage 通知传递的信息
     */
    showNotification:(title=NOTIFICATION_TITLE,body=NOTIFICATION_BODY,clickMessage=CLICK_MESSAGE)=> {
        const notification = new Notification({ title, body });
        notification.onclick = () => {
            ipcMain.handle('recieveNotificationFromMain',()=>{
                return clickMessage;
            });
        };
        notification.show();
    }
}