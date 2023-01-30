const { ipcMain } = require('electron')

module.exports = {
    /**
     * 监听事件触发访问设备蓝牙连接
     * @param {*} win 窗体对象 BrowserWindow
     */
    watchAndSelectBluetooth:(win)=> {
        // 访问设备API
        win.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
            event.preventDefault()
            if (deviceList && deviceList.length > 0) {
            console.log(deviceList);
            callback(deviceList[0].deviceId)
            } 
        })

        // Listen for a message from the renderer to get the response for the Bluetooth pairing.
        ipcMain.on('bluetooth-pairing-response', (event, response) => {
            bluetoothPinCallback(response)
        })

        win.webContents.session.setBluetoothPairingHandler((details, callback) => {
            bluetoothPinCallback = callback
            // Send a message to the renderer to prompt the user to confirm the pairing.
            win.webContents.send('bluetooth-pairing-request', details)
        });
    }
}