// #region Imports
const restify = require('restify')
const morgan = require('morgan')
const { sendMessageEmbed: sendDiscordMessage } = require('./routes').discord
const bParser = require('body-parser')
// #endregion Imports

const server = restify.createServer()
server.use(morgan('combined'))
server.use(bParser.json())

const respond = (req, res, next) => {
  res.send('hello ' + req.params.name)
}

server.post('/discord', sendDiscordMessage)
const GH = require('./routes').github
server.post('/github', GH.postMethod)

server.get('/hello/:name', (req, res, next) => {
  res.send(200, req.params.name)
  return next()
})

server.head('/hello/:name', respond)

server.listen(8080, () => {
  console.log('%s listening at %s', server.name, server.url)
})
