module.exports = function(app) {
    delete app.models.administrador.validations.email;
    delete app.models.administrador.validations.username;
    // delete app.models.User.validations.realm;
};