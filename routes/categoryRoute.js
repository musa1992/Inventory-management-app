var express = require('express');
var categoryRouter = express.Router();

const {httpgetAllCategories, 
        httpgetCategory, 
        httpcreateCategory,
        httpupdateCategory,
        httpdeleteCategory} = require('../controllers/categoryController')



categoryRouter.get('/',httpgetAllCategories)
categoryRouter.get('/:id',httpgetCategory)
categoryRouter.post('/',httpcreateCategory)
categoryRouter.put('/:id', httpupdateCategory)
categoryRouter.delete('/:id', httpdeleteCategory)

module.exports = categoryRouter;
