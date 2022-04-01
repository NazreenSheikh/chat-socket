const express = require('express')
const path = require('path')
const app = express()
const http = require('http')
const server = http.createServer(app)
const PORT = 5000
const { Server } = require('socket.io')
const io = new Server(server)
// io.on('connection', (socket) => {
//   socket.broadcast.emit('hi')
// })
io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })
})

app.use('/static', express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
  res.send('Hello World')
})
server.listen(PORT, () => {
  console.log('Server is running on port: ' + PORT)
})
