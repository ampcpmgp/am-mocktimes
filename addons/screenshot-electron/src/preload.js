const ipc = require('electron').ipcRenderer

window.onerror = error => {
  ipc.send('errorInWindow', error)
}
