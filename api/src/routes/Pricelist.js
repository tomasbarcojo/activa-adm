const server = require('express').Router()
const authenticate = require('../utils/Auth')
const { getPriceLists, createPriceList } = require('../controllers/Pricelist')

server.get('/', authenticate, getPriceLists)

server.post('/createpricelist', authenticate, createPriceList)

// server.get('/logout', userLogout)

// server.post('/login', loginUser)

// server.get('/:id', authenticate, getOneUser)

// server.put('/editUser/:id', /*authenticate,*/ modifyUser)

// server.delete('/deleteUser/:id', /*authenticate,*/ deleteUser)

module.exports = server