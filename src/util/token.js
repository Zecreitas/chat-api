const jwt = require('jsonwebtoken');

const checktoken = async (token, id, key) => jwt.verify(token, key, (err, decoded) => {
    if (err) {
        return false
    }
    if (decoded.id != id) {
        return false
    }
    return true 
});


const setToken = async (id, key) => {
    console.log(id);
    if(id){ 
        return jwt.sing({ id }, key, { expiresIn: 28800 })
    }
};

module.exports = {
    checktoken,
    setToken,
}