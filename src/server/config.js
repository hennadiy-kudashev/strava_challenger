module.exports = {
    secret: process.env.SECRET,
    mongoUrl: process.env.MONGOLAB_URI,
    port: process.env.PORT || 3000
};