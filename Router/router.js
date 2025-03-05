const express = require('express')
const router = new express.Router()
const userController=require('../Controller/userController')
const projectController=require('../Controller/projectController')
const jwtMiddleware=require('../middlewares/jwtMiddleware')
const multerMiddleware=require('../middlewares/multerMiddleware')



router.post('/register',userController.registerController)
router.post('/login',userController.loginController)
router.post('/add-project',jwtMiddleware,multerMiddleware.single('projectImg'),projectController.addProjectController)
router.get('/get-home-projects',projectController.getHomeProjectController)
router.get('/get-all-projects',jwtMiddleware,projectController.getAllProjectController)
router.get('/get-user-projects',jwtMiddleware,projectController.getUserProjectController)
router.put('/edit/project/:pid',jwtMiddleware,multerMiddleware.single('projectImg'),projectController.updateProjectController)
router.delete('/remove/project/:id',jwtMiddleware,projectController.removeProjectController)
router.put('/edit/profile',jwtMiddleware,multerMiddleware.single('profilePic'),userController.updateProfileController)





module.exports=router