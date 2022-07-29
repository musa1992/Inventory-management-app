const express = require('express')

const itemRouter = express.Router()

const { 
    httpgetAllItems,
    httpgetItem,
    httpcreateItem,
    httpupdateItem,
    httpdeleteItem
 } = require('../controllers/itemController')

 itemRouter.get('/',httpgetAllItems)
 itemRouter.get('/:id',httpgetItem)
 itemRouter.post('/',httpcreateItem)
 itemRouter.put('/:id',httpupdateItem)
 itemRouter.delete('/:id',httpdeleteItem)


 module.exports = itemRouter
 