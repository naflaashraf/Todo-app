const express = require('express')
const { createProjectCntrl,allProjectCntrl, singleProjectCntrl, updateProjectCntrl, deleteProjectCntrl } = require('../../controller/project/projectController')




const projectRoute = express.Router()
projectRoute.post('/create',createProjectCntrl)

projectRoute.get('/',allProjectCntrl)

projectRoute.get('/:projectid',singleProjectCntrl)

projectRoute.put('/:projectid',updateProjectCntrl)

projectRoute.delete('/:projectid',deleteProjectCntrl)

module.exports = projectRoute