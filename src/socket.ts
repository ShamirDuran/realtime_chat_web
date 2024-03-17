import { DefaultEventsMap } from '@socket.io/component-emitter'
import { io, Socket } from 'socket.io-client'

// please note that the types are reversed
let socket: Socket<DefaultEventsMap, DefaultEventsMap>

const connectSocket = (uid: string) => {
  socket = io('http://localhost:3001', {
    query: {
      uid,
    },
  })
}

export { socket, connectSocket }
