const express = require('express')

const metricRouter = express.Router()

const {httpgetAllMetrics,
    httpgetMetric,
    httpCreateMetric,
    httpupdateMetric,
    httpdeleteMetric

} = require('../controllers/metricController')


metricRouter.get('/', httpgetAllMetrics)
metricRouter.get('/:id',httpgetMetric)
metricRouter.post('/',httpCreateMetric)
metricRouter.put('/:id', httpupdateMetric)
metricRouter.delete('/:id',httpdeleteMetric)


module.exports = metricRouter