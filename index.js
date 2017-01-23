'use strict';
const electron = require('electron');

const app = electron.app;

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

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
  resizable: false,
  transparent: true,
  width: 170
 });

 win.loadURL(`file://${__dirname}/views/main.html`);
 win.on('closed', onClosed);

 // open dev tools
 let contents = win.webContents
 contents.openDevTools({
  mode: "detach"
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
});
