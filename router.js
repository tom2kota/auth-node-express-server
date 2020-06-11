const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function (app) {
    app.get('/', requireAuth, function (req, res) {
        res.send({hi: 'there'});
    });
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
        app.get('/test', function (req, res, next) {
        res.send(['XXX', 'ZZZ', '777', '... test response data from: router.js']);
        console.log('req.body:', req.body);
    })
}
