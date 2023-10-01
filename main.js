const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');

const isDev = !app.isPackaged;

let mainWin;  // <-- Declare the variable here

function createWindow() {
    mainWin = new BrowserWindow({
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
    new Notification({ title: "Chat App", body: message }).show();
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
    mainWin.close();
});

app.whenReady().then(createWindow);
