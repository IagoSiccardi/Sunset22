module.exports= (req,res,next) => {

    if (req.session.userLogin) {

        if(req.session.userLogin.rol === "admin"){
           return next()

        }else {
            return res.redirect('/')
    }

    } else {
        return res.redirect('/')
    }
}