const async = require('async')
const { body, validationResult } = require('express-validator')
const Metric = require('../models/metricModel')
const Category = require('../models/categoryModel')
const Item = require('../models/itemModel')


function httpgetAllItems(req,res,next){
    Item.find({},'name description')
    .sort({'name': 1})
    .populate('metric_unit')
    .populate('category')
    .exec(function(err,items){
        if(err) { return next(err)}
        res.status(200).json(items)
    })
}

function httpgetItem(req,res,next){
    Item.findById(req.params.id, function(err, item){
        if (err){ return next(err)}
        res.json(item)
    })
}

function httpcreateItem(req,res,next){
    body('name', 'name of item is require').trim().escape()
    body('description', 'description is required').trim().escape()
    body('category').trim().escape()
    body('metric_unit').trim().escape()

    const errors = validationResult(req)
    // handle errors return form it has erros to user

    const item = new Item({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            metric_unit: req.body.metric
        })

    Item.findOne({'name': req.body.name})
    .exec(function(err,result){
        if(err){ return next(err)}
        if(result){
            //it exists redirect to existing item page
        }else{
            item.save(function(err){
                if(err){ return next(err)}

                res.status(201).json(item)
            })
        }
    })

}

function httpupdateItem(req,res,next){
    body('name', 'name of item is require').trim().escape()
    body('description', 'description is required').trim().escape()
    body('category').trim().escape()
    body('metric_unit').trim().escape()

    const errors = validationResult(req)

    Item.findById(req.params.id)
    .exec(function(err,item){
        if(err){ next(err)}

        item.name = req.body.name || item.name
        item.description = req.body.description || item.description
        item.category = req.body.category || item.category
        item.metric_unit = req.body.metric || item.metric_unit
        item._id = req.params.id

        item.save(function(err){
            if(err){ return next(err)}
            res.status(200).json(item)
        })
    })
}

function httpdeleteItem(req,res,next){
    Item.deleteOne({_id: req.params.id},function(err){
        if(err) {return next(err)}
        res.json({message: 'Deleted item'})
    })
}



module.exports = {
    httpgetAllItems,
    httpgetItem,
    httpcreateItem,
    httpupdateItem,
    httpdeleteItem
}