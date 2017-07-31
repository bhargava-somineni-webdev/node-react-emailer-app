module.exports = (req, res, next) => {
    //if user is not logged in, do not proceed to next stage
    //if logged in then proceed next from the middleware
    if (req.user.credits < 1) {
        return res.status(403).send({ error: "Not enough credits!" })
    }

    next();
}