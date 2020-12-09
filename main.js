const { app, BrowserWindow, Menu } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile('dist/index.html');
}

function createMenu() {
  const template = [
    {
      label: 'Hawkpass',
      submenu: [
        {
          role: 'quit',
        },
      ],
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Repository',
          click: async () => {
            const { shell } = require('electron');
            await shell.openExternal('https://github.com/kalpetros/hawkpass');
          },
        },
        { type: 'separator' },
        {
          label: 'Report Issue...',
          click: async () => {
            const { shell } = require('electron');
            await shell.openExternal(
              'https://github.com/kalpetros/hawkpass/issues/new'
            );
          },
        },
        { type: 'separator' },
        {
          label: "What's New...",
          click: async () => {
            const { shell } = require('electron');
            await shell.openExternal(
              'https://github.com/kalpetros/hawkpass/releases'
            );
          },
        },
        { type: 'separator' },
        {
          label: `Version ${app.getVersion()}`,
        },
      ],
    },
  ];
  const menu = new Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createWindow();
  createMenu();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
