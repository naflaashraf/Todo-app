const express = require('express')
const { registerUserCntrl, userLoginCntrl, userProfileCntrl, userUpdateCntrl, userDeleteCntrl, userLogoutCntrl } = require('../../controller/user/userController')


const usersRoute = express.Router()

usersRoute.post('/register',registerUserCntrl)
usersRoute.post('/login',userLoginCntrl)
usersRoute.get('/profile',userProfileCntrl)
usersRoute.put('/',userUpdateCntrl)
usersRoute.delete('/',userDeleteCntrl)
usersRoute.post('/logout', userLogoutCntrl);

module.exports = usersRoute;