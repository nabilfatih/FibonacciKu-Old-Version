const { func } = require("assert-plus");

module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}