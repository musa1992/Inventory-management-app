const async = require('async')
const { body, validationResult} = require('express-validator')
const Category = require('../models/categoryModel')
const Item = require('../models/itemModel')

function httpgetAllCategories(req,res,next){
    Category.find()
    .sort([['name', 'ascending']])
    .exec(function(err,categories){
        if(err){ return next(err)}
        res.status(200).json(categories)
    })

}

function httpgetCategory(req,res,next){
    const ID = req.params.id
   async.parallel({
    category(callback){
        Category.findById(ID)
        .exec(callback)
    },
    category_items(callback){
        Item.find({'category': ID}, 'name')
        .exec(callback)
    }
   },function(err,results){
        if(err){ return next(err)}

        if(results.category === null){
            const err = new Error('Category Not Found')
            err.status(404)
            return next(err)

        }
        let result = {
            ...results.category,
            ...results.category_items,

        }
        res.status(200).json(result)
   })
}

const httpcreateCategory = [
    body('name', 'Category name required').trim().isLength({min:1}).escape(),
    body('description', 'Description cannot be empty').trim().isLength({min:1}).escape(),

    (req,res,next)=>{
        const errors = validationResult(req)
         const category = new Category({
            name: req.body.name,
            description: req.body.description
         })

         // add error handling  to return form to user if errors
         Category.findOne({'name': req.body.name})
         .exec(function(err,result){
            if(err){return next(err)}
            if(result){
                //redirect to the url of the result
                res.status(200).json('Category already exists')
            }else {
                category.save(function(err){
                    if(err){return next(err)}
                    res.status(201).json(category)
                })
            }
         })
    }

]

const httpupdateCategory = [
    body('name', 'Category name required').trim().isLength({min:1}).escape(),
    body('description', 'Description cannot be empty').trim().isLength({min:1}).escape(),

    (req,res,next)=>{
        const errors =validationResult(req)
        Category.findById(req.params.id).
        exec(function(err,category){
            if(err){ return next(err)}
            category.name = req.body.name || category.name
            category.description = req.body.description || category.description
            category.save(function(err){
                if(err){ return next(err)}
                res.status(200).json(category)
            })
        })


    }
]

function httpdeleteCategory(req,res,next){
    Category.deleteOne({_id: req.params.id}, function(err){
        if(err) {return next(err)}

        res.status(200).json({message: "Deleted Succesfully"})
    })
    
}


module.exports = {
    httpgetAllCategories,
    httpgetCategory,
    httpcreateCategory,
    httpupdateCategory,
    httpdeleteCategory
}