// 切换主题色
document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
    const isDarkMode = await window.darkMode.toggle()
    document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})
  
document.getElementById('reset-to-system').addEventListener('click', async () => {
    await window.darkMode.system()
    document.getElementById('theme-source').innerHTML = 'System'
});

// 打开BrowserView
const openUrlBtnEles = document.getElementsByClassName('open-url');
if(openUrlBtnEles.length>0) {
    for(let i=0;i<openUrlBtnEles.length;i++) {
        openUrlBtnEles[i].addEventListener('click',(e)=>{
            e.preventDefault();
            const url = e.target.attributes.url.value;
            window.browserView.open(url);
        })
    }
}

// 接收main的通知信息内容
(async () => {
    const result = await window.electronAPI.recieveNotificationFromMain()
    console.log(result);
})()

// 蓝牙
document.getElementById('clickme').addEventListener('click',testIt)
async function testIt() {
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true
    });
    document.getElementById('device-name').innerHTML = device.name || `ID: ${device.id}`
    // if(device.length>0) {
    //     const devicesListEle = document.getElementById('device-list');
    //     device.forEach((item)=>{
    //         const itemEle = document.createElement('div');
    //         itemEle.className = 'item';
    //         itemEle.innerHTML = `Device Name: ${item.name} - ID: ${item.id}`;
    //         devicesListEle.append(itemEle);
    //     })
    // }
}
  
window.electronAPI.bluetoothPairingRequest((event, details) => {
    const response = {}

    switch (details.pairingKind) {
        case 'confirm': {
        response.confirmed = confirm(`Do you want to connect to device ${details.deviceId}?`)
        break
        }
        case 'confirmPin': {
        response.confirmed = confirm(`Does the pin ${details.pin} match the pin displayed on device ${details.deviceId}?`)
        break
        }
        case 'providePin': {
        const pin = prompt(`Please provide a pin for ${details.deviceId}.`)
        if (pin) {
            response.pin = pin
            response.confirmed = true
        } else {
            response.confirmed = false
        }
        }
    }

    window.electronAPI.bluetoothPairingResponse(response)
})