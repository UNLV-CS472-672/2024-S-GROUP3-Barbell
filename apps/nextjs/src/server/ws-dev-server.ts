import { applyWSSHandler } from '@trpc/server/adapters/ws'
import { WebSocketServer } from 'ws'

import { appRouter, createWssContext } from '@acme/api'

const wss = new WebSocketServer({
  port: 3001,
})

const handler = applyWSSHandler({ wss, router: appRouter, createContext: createWssContext })

console.log('Starting WebSocket Server...')

wss.on('listening', () => {
  console.log('WebSocket Server listening')
})

wss.on('connection', (ws) => {
  console.log(`➕➕ Connection (${wss.clients.size})`)
  ws.once('close', () => {
    console.log(`➖➖ Connection (${wss.clients.size})`)
  })
})

console.log('✅ WebSocket Server listening on ws://localhost:3001')

process.on('SIGTERM', (signal) => {
  console.log('SIGTERM', signal)
  handler.broadcastReconnectNotification()
  wss.close()
  process.exit()
})
