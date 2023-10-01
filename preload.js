const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld('electron', {
    notificationApi: {
        notify: (message) => {
            console.log("outgoing notification", message)
            ipcRenderer.send('notify', message);
        }
    },
    windowApi: {
        minimize: () => {
            ipcRenderer.send('window-minimize');
        },
        toggleMaximize: () => {
            ipcRenderer.send('window-maximize-toggle');
        },
        close: () => {
            ipcRenderer.send('window-close');
        }
    }
});
