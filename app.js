const PORT = process.env.PORT || 3000
const https = require('https')
var fs = require('fs')
var express = require('express')
var path = require('path')

var app = express()



app.set('view engine', 'ejs')
app.use(express.static('views'))
app.use(express.static(__dirname +'/public'))
app.use("/public", express.static(path.join(__dirname, 'public')));


// Homepage
app.get('/', (req, res) => {
  res.render('home', {user: req.user})
})


// SETTING UP HTTPS
app.use(function (req, res, next) {
  if (req.secure) {
    next()
  } else {
    res.redirect('https://' + req.headers.host + req.url)
  }
})

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(PORT, () => {
  console.log('App server running on port %s', PORT)
})

module.exports = app
