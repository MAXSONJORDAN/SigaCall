const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');

let mainWindow;
let tray;

const server = require('./start');
const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 450,
        icon: __dirname + '/icon.png',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    mainWindow.loadFile('index.html');

    mainWindow.removeMenu();


    // Você pode abrir as DevTools automaticamente ao iniciar a aplicação se necessário
    // mainWindow.webContents.openDevTools();

    mainWindow.on('minimize', (event) => {
        event.preventDefault();
        mainWindow.hide();
    });

    mainWindow.on('close', (event) => {
        if (!app.isQuiting) {
            event.preventDefault();
            mainWindow.hide();
        }
        return false;
    });
};

app.whenReady().then(() => {
    createWindow();

    tray = new Tray(path.join(__dirname, 'path-to-your-icon.png'));

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show App',
            click: () => {
                mainWindow.show();
            },
        },
        {
            label: 'Quit',
            click: () => {
                app.isQuiting = true;
                app.quit();
            },
        },
    ]);

    tray.setToolTip('Your App Name');
    tray.setContextMenu(contextMenu);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
