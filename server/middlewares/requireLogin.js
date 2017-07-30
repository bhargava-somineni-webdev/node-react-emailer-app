module.exports = (req, res, next) => {
    //if user is not logged in, do not proceed to next stage
    //if logged in then proceed next from the middleware
    if (!req.user) {
        return res.status(401).send({ error: "You must login" })
    }

    next();
}