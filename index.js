'use strict';
const electron = require('electron');
const Menu = electron.Menu;
const app = electron.app;

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;
let settingsWindow;
let aboutWindow;

function onClosed() {
 // dereference the window
 // for multiple windows store them in an array
 mainWindow = null;
}

function createMainWindow() {
 const win = new electron.BrowserWindow({
  alwaysOnTop: true,
  frame: false,
  height: 50,
  icon: __dirname + '/icon.icns',
  resizable: false,
  transparent: true,
  width: 170
 });

 win.loadURL(`file://${__dirname}/app/timer/index.html`);
 win.on('closed', onClosed);

 // // open dev tools
 // let contents = win.webContents
 // contents.openDevTools({
 //  mode: "detach"
 // });

 return win;
}

function createAboutWindow() {
 const win = new electron.BrowserWindow({
  resizable: false,
  maximizable: false,
  minimizable: false,
  width: 450,
  height: 350,
  show: false
 });

 win.loadURL(`file://${__dirname}/app/about/index.html`);

 win.on('close', (e) => {
  /* the user only tried to close the window */
  e.preventDefault();
  win.hide();
 });
 return win;
}


function createSettingsWindow() {
 const win = new electron.BrowserWindow({
  resizable: false,
  maximizable: false,
  width: 450,
  height: 350,
  show: false
 });

 win.loadURL(`file://${__dirname}/app/settings/index.html`);

 win.on('close', (e) => {
  /* the user only tried to close the window */
  e.preventDefault();
  win.hide();
 });
 return win;
}



app.on('window-all-closed', () => {
 if (process.platform !== 'darwin') {
  app.quit();
 }
});

app.on('activate', () => {
 if (!mainWindow) {
  mainWindow = createMainWindow();
 }
});

app.on('ready', () => {
 mainWindow = createMainWindow();
 settingsWindow = createSettingsWindow();
 aboutWindow = createAboutWindow();
 const menuTemplate = [{
  label: 'Simple Mob Timer',
  submenu: [{
   label: 'Settings',
   click: () => {
    settingsWindow.show();
   }
  }, {
   type: 'separator'
  }, {
   label: 'About',
   click: () => {
    aboutWindow.show();
   }
  }, {
   label: 'Quit',
   click: () => {
    app.quit();
   }
  }]
 }];
 const menu = Menu.buildFromTemplate(menuTemplate);
 Menu.setApplicationMenu(menu);
});
