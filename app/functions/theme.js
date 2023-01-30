const { ipcMain, nativeTheme } = require('electron')

module.exports = {
    /**
     * 监听暗黑模式切换
     */
    watchDarkModeSwitch:()=> {
        // 暗黑模式切换
        ipcMain.handle('dark-mode:toggle', () => {
            if (nativeTheme.shouldUseDarkColors) {
                nativeTheme.themeSource = 'light'
            } else {
                nativeTheme.themeSource = 'dark'
            }
            return nativeTheme.shouldUseDarkColors
        })

        ipcMain.handle('dark-mode:system', () => {
            nativeTheme.themeSource = 'system'
        })
    }
}