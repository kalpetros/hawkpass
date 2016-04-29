// Menu class for creating native menus that
// can be used as application menus
// This module is a main process
// module that can be used in a render
// process via the remote module
const remote = require('electron').remote;
const shell = require('electron').shell;
const ipcRenderer = require('electron').ipcRenderer;
const Menu = remote.Menu;

var template = [
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.reload();
        }
      },
      {
        label: 'Toggle Full Screen',
        accelerator: (function() {
          if (process.platform == 'darwin')
            return 'Ctrl+Command+F';
          else
            return 'F11';
        })(),
        click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        }
      }
    ]
  },
  {
    label: 'Help',
    role: 'help',
    submenu: [
      {
        label: 'View Licence',
        // Show the licence
        click: function() {
          shell.openExternal('https://github.com/kalpetros/hawkpass-desktop/blob/master/LICENSE');
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Frequently Asked Questions',
        // Load FAQ page
        click: function() {
          ipcRenderer.send('show-faq');
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Report Issue',
        click: function() {
          shell.openExternal('https://github.com/kalpetros/hawkpass-desktop/issues');
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'About Hawkpass',
        // Load About page
        click: function() {
          ipcRenderer.send('show-about');
        }
      },
      {
        label: 'Version 1.0.0-alpha.6',
        enabled: 'FALSE'
      }
    ]
  },
];

var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
