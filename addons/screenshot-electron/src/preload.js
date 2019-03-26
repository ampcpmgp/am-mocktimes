const ipc = require('electron').ipcRenderer

window.onerror = (error, url, line) => {
  ipc.send('errorInWindow', error)
}
