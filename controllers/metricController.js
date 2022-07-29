
const Metric = require('../models/metricModel')

const { body, validationResult} = require('express-validator')


function httpgetAllMetrics(req,res,next){
    Metric.find()
    .exec(function(err,metrics){
        if(err){ return next(err)}

        res.status(200).json(metrics)
    })
}

function httpgetMetric(req,res,next){
    const ID = req.params.id

    Metric.findById(ID)
    .exec(function(err,metric){
        if(err) {return next(err)}

        res.status(200).json(metric)
    })
}

function httpCreateMetric(req,res,next){
    body('name', 'Name is required').trim().isLength({min:1}).escape()
    body('abbreviation', 'Abbreviation is required').trim().isLength({max:5}).escape()

    const errors = validationResult(req)
    
    const metric = new Metric({
        name: req.body.name,
        abbreviation: req.body.abbreviation
    })

    //add error handling to return form to user if not filled well

    Metric.findOne({'name': req.body.name})
    .exec(function(err,result){
        if(err) { return next(err)}

        if(result){
            // means existing metric // redirect to existing resource
            res.status(200).json({message: 'Metric already exists'})
        }else{
            metric.save(function(err){
                if(err) {return next(err)}
                res.status(201).json(metric)
            })
        }
    })
}

function httpupdateMetric(req,res,next){
    body('name', 'Name is required').trim().isLength({min:1}).escape()
    body('abbreviation', 'Abbreviation is required').trim().isLength({max:5}).escape()

    const errors = validationResult(req)
    // if errors return fomr to user for correction

    Metric.findById(req.params.id)
    .exec(function(err,metric){
        if(err){ return next(err)}
        metric.name = req.body.name || metric.name
        metric.abbreviation = req.body.abbreviation || metric.abbreviation
        metric.save(function(err){
            if(err){ return next(err)}
            res.status(200).json(metric)
        })
    })
}

function httpdeleteMetric(req,res,next){
    Metric.deleteOne({_id: req.params.id}, function(err){
        if(err){ return next(err)}
        res.status(200).json({message: 'Succesfully deleted metric'})
    })
}




module.exports = {
    httpgetAllMetrics,
    httpgetMetric,
    httpCreateMetric,
    httpupdateMetric,
    httpdeleteMetric
}