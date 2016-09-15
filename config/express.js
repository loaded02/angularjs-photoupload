/**
 * Created by moritz on 08.09.16.
 */
var config = require('./config'),
    http = require('http'),
    express = require('express'),
    morgan = require('morgan'), //logger
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'), //PUT, DELETE
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    flash = require('connect-flash'),
    passport = require('passport');

module.exports = function(db) {
    var app = express();

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    var mongoStore = new MongoStore({
        mongooseConnection: db.connection
    });

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret,
        store: mongoStore
    }));

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/users.server.routes.js')(app);
    require('../app/routes/photos.server.routes.js')(app);
    require('../app/routes/comments.server.routes.js')(app);

    app.use(express.static('./public'));
    app.use('/images', express.static('./images'));

    return app;
};
