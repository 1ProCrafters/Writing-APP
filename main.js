const { app, BrowserWindow, Menu, shell } = require("electron");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    fullscreen: false,
    titleBarStyle: "hiddenInset",
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile("index.html");

  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  const menu = Menu.buildFromTemplate([
    {
      label: "",
      submenu: [
        { label: "Refresh", role: "reload", accelerator: "Cmd+R" },
        { label: "About", role: "about" },
        { label: "Quit", click: () => app.quit(), accelerator: "Cmd+Q" }
      ]
    },
    {
      label: "Edit",
      submenu: [
        { label: "Select All", role: "selectall", accelerator: "Cmd+A" },
        { label: "Copy", role: "copy", accelerator: "Cmd+C" },
        { label: "Cut", role: "cut", accelerator: "Cmd+X" },
        { label: "Paste", role: "paste", accelerator: "Cmd+V" }
      ]
    },
    {
      label: "Help",
      submenu: [
        { label: "Docs", click: () => shell.openExternal("https://github.com/laheshk/writtte") },
        { label: "Developer", click: () => shell.openExternal("http://madebylahesh.com") }
      ]
    }
  ]);

  Menu.setApplicationMenu(menu);
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});

