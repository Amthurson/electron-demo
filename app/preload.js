const { contextBridge, ipcRenderer,ipcMain } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  bluetoothPairingRequest: (callback) => ipcRenderer.on('bluetooth-pairing-request', callback),
  bluetoothPairingResponse: (response) => ipcRenderer.send('bluetooth-pairing-response', response),
  recieveNotificationFromMain: (response) => ipcRenderer.send('recieveNotificationFromMain',response)
});

contextBridge.exposeInMainWorld('darkMode', {
    toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
    system: () => ipcRenderer.invoke('dark-mode:system')
})