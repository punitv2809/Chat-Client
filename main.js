const { app, BrowserWindow, ipcMain, Notification, Tray, Menu } = require('electron');
const path = require('path');

const isDev = !app.isPackaged;

let mainWin;  // <-- Declare the variable here
let tray = null;
let isQuiting;

function createWindow() {
    mainWin = new BrowserWindow({
        icon: 'image.png',
        title: 'chit-chat',
        width: 1200,
        height: 700,
        minWidth: 800,
        minHeight: 600,
        backgroundColor: 'white',
        frame: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    mainWin.loadFile('index.html');
}

if (isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    });
}

// Handle notifications
ipcMain.on('notify', (_, message) => {
    new Notification({ title: "Chat App", body: message, actions: {} }).show();
});

// Handle window minimize action
ipcMain.on('window-minimize', () => {
    mainWin.minimize();  // <-- Use mainWin here
});

// Handle window maximize-toggle action
ipcMain.on('window-maximize-toggle', () => {
    if (mainWin.isMaximized()) {
        mainWin.unmaximize();
    } else {
        mainWin.maximize();
    }
});

// Handle window close action
ipcMain.on('window-close', () => {
    if (!isQuiting) {
        // event.preventDefault();
        mainWin.hide();
        // event.returnValue = false;
    }
    // mainWin.close();
});

app.whenReady().then(() => {
    app.on('before-quit', function () {
        console.log("closing")
        isQuiting = true;
    });

    createWindow();
    tray = new Tray(path.join(__dirname, 'image.png'))
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'show app', click: () => {
                const notification = new Notification({
                    icon: 'image.png',
                    title: "Chat App",
                    body: 'some message',
                });
                notification.on('click', (e, args) => {
                    console.log(e, args)
                })
                notification.show();
                mainWin.show()
            }
        },
        {
            label: 'Quit', click: function () {
                isQuiting = true;
                app.quit();
            }
        },
        { label: 'Item1', type: 'radio' },
        { label: 'Item2', type: 'radio' },
        { label: 'Item3', type: 'radio', checked: true },
        { label: 'Item4', type: 'radio' }
    ])
    tray.setToolTip('Punit Verma [online]')
    tray.setContextMenu(contextMenu)
    tray.displayBalloon({ title: 'test', content: 'cool text' })
    tray.on('click', function () {
        mainWin.show()
    })
});
