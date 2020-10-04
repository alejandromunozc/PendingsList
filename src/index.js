const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const app = express();
require('./lib/connectDB');
require('./lib/passport');

const { config } = require('./config/index');
const pages = require('./routes/pages.routes');
const task = require('./routes/task.routes');
const user = require('./routes/user.routes');

app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', hbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/hbs-helpers')
}));
app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Globals
app.use((req, res, next) => {
    res.locals.msg_success = req.flash('msg_success');
    res.locals.msg_error = req.flash('msg_error');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
})

app.get('/', (req, res) => {
    res.render('index');
})

app.use(pages);
app.use(task);
app.use(user);

app.listen(config.port, () => {
    console.log(`listening http://localhost:${config.port}`);
});