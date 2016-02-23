// Menu class for creating native menus that
// can be used as application menus
// This module is a main process
// module that can be used in a render
// process via the remote module
const remote = require('electron').remote;
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
      }
    ]
  },
  {
    label: 'Help',
    role: 'help',
    submenu: [
      {
        label: 'Version 0.0.1-Alpha',
        enabled: 'FALSE'
      },
      {
        type: 'separator'
      },
      {
        label: 'Frequently Asked Questions',
        // Toggle FAQ Modal
        click: function() {
          $('#faq').modal('toggle');
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Report Issue',
        click: function() { require('electron').shell.openExternal('https://github.com/kalpetros/hawkpass-desktop/issues') }
      },
      {
        type: 'separator'
      },
      {
        label: 'About Hawkpass',
        // Toggle About Modal
        click: function() {
          $('#about').modal('toggle');
        }
      }
    ]
  },
];

var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);