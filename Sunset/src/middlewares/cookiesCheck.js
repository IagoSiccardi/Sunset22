module.exports = (req,res,next) => {
    if(req.cookies.userSunset){
        req.session.userLogin = req.cookies.userSunset
    }
    
    next()
}