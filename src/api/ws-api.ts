let wss: WebSocket

function closeHandler() {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  setTimeout(createChannel, 30000)
}

const openHandler = () => {}

const cleanUp = () => {
  wss?.removeEventListener('close', closeHandler)
  wss?.removeEventListener('open', openHandler)
}

function createChannel() {
  cleanUp()
  wss?.close()
  wss = new WebSocket('wss://serviceofexile.com/wsapi/')
  wss.addEventListener('close', closeHandler)
  wss.addEventListener('open', openHandler)
}

const wssApi = {
  startWs() {
    createChannel()
  },
  stop() {
    cleanUp()
    wss?.close()
  }
}

export default wssApi
