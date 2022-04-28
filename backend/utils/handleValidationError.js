const handleValidationError = (err, res) => {
    let errors = Object.values(err.response.data) + "."
    let fields = Object.values(err.errors).map(el => el.path);
    let code = 400;

        res.status(code).send(errors)
  
 }
 
 module.exports = handleValidationError;