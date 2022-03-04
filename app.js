if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const Joi = require('joi');
const catchAsync = require('./utils/catchAsync');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2');
const FacebookStrategy = require('passport-facebook');
const User = require('./models/user');
const form = require('./controllers/kontak');
const expressSanitizer = require('express-sanitizer');

const MongoDBStore = require("connect-mongo");
const mongoSanitize = require('express-mongo-sanitize');

const userRoutes = require('./routes/users');
const berandaRoutes = require('./routes/berandas');
const matapelajaranRoutes = require('./routes/mata-pelajaran');
const tentangRoutes = require('./routes/tentang');
const kontakRoutes = require('./routes/kontak');
const profilRoutes = require('./routes/profil');
const pengaturanRoutes = require('./routes/pengaturan');
const kebijakanRoutes = require('./routes/kebijakan');
const syaratRoutes = require('./routes/syarat');
const { isLoggedOut } = require('./middleware');


const dbUrl = 'mongodb://localhost:27017/fibonacciku';
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
});

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(expressSanitizer());
app.use(mongoSanitize({
    replaceWith: '_'
}));

const secret = process.env.SECRET || 'thisshouldbeabettersecret!';

const store = MongoDBStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret
    }
});

store.on("error", function(e) {
    console.log("SESSION STORE ERROR")
})

const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
        maxAge: 1000 * 60 * 60 * 24 * 3
    }
}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

const config = {
    GoogleClientID: process.env.GOOGLE_CLIENT_ID,
    GoogleClientSECRET: process.env.GOOGLE_CLIENT_SECRET,
    GitHubClientID: process.env.GITHUB_CLIENT_ID,
    GitHubClientSECRET: process.env.GITHUB_CLIENT_SECRET,
    FacebookClientID: process.env.FACEBOOK_CLIENT_ID,
    FacebookClientSECRET: process.env.FACEBOOK_CLIENT_SECRET,
};

const google_auth = {
    callbackURL: '/auth/google/callback',
    clientID: config.GoogleClientID,
    clientSecret: config.GoogleClientSECRET
}

const github_auth = {
    callbackURL: '/auth/github/callback',
    clientID: config.GitHubClientID,
    clientSecret: config.GitHubClientSECRET
}

const facebook_auth = {
    callbackURL: '/auth/facebook/callback',
    clientID: config.FacebookClientID,
    clientSecret: config.FacebookClientSECRET
}

passport.serializeUser((User, done) => {
    done(null, User.id);
})
passport.deserializeUser((id, done) => {
    User.findById(id).then((User) => {
        done(null, User);
    })
})

passport.use(new GoogleStrategy(google_auth, (accessToken, refreshToken, profile, done) => {
    // console.log('Google Profile');
    // console.log(profile);
    User.findOneAndUpdate(
        { email: profile._json.email },
        { $set: { googleID: profile.id, isVerified: true, emailToken: null}},
        { returnDocument: true }
    ).then((currentUser) => {
        if(currentUser) {
            // console.log('user is ' + currentUser)
            done(null, currentUser)
        } else {
            new User({
                googleID: profile.id,
                email: profile._json.email,
                isVerified: true,
                emailToken: null,
                username: profile._json.given_name.toLowerCase() + profile._json.family_name.toLowerCase(),
                nama: profile.displayName,
                avatar: profile._json.picture
            }).save().then((newUser) => {
                // console.log('new user created: ' + newUser)
                done(null, newUser)
            })
        }
    })
}));

passport.use(new GitHubStrategy(github_auth, (accessToken, refreshToken, profile, done) => {
    // console.log('GitHub Profile');
    // console.log(profile);
    User.findOneAndUpdate(
        { username: profile.username },
        { $set: {githubID: profile.id, isVerified: true, emailToken: null, link: {github: profile.username}}},
        { returnDocument: true }
    ).then((currentUser) => {
        if(currentUser) {
            // console.log('user is ' + currentUser)
            done(null, currentUser)
        } else {
            new User({
                githubID: profile.id,
                email: profile._json.email,
                isVerified: true,
                emailToken: null,
                username: profile.username,
                nama: profile.displayName,
                avatar: profile._json.avatar_url,
                link: {
                    github: profile.username
                }
            }).save().then((newUser) => {
                // console.log('new user created: ' + newUser)
                done(null, newUser)
            })
        }
    })
}))

//not finished yet
passport.use(new FacebookStrategy(facebook_auth, (accessToken, refreshToken, profile, done) => {
    console.log('Facebook Profile');
    console.log(profile);
    User.findOneAndUpdate(
        { email: profile._json['email'] },
        { $set: {googleID: profile.id, isVerified: true, emailToken: null }},
        { returnDocument: true }
    ).then((currentUser) => {
        if(currentUser) {
            console.log('user is ' + currentUser)
            done(null, currentUser)
        } else {
            new User({
                facebookID: profile.id,
                email: profile._json['email'],
                isVerified: true,
                emailToken: null,
                username: profile.username,
                nama: profile.displayName,
                avatar: profile._json['avatar_url']
            }).save().then((newUser) => {
                console.log('new user created: ' + newUser)
                done(null, newUser)
            })
        }
    })
}))

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    console.log(req.session);
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', userRoutes);

app.use('/beranda', berandaRoutes);

app.use('/mata-pelajaran', matapelajaranRoutes);

app.use('/tentang', tentangRoutes);

// contact form
app.post('/', catchAsync(form.forms));
app.use('/kontak', kontakRoutes);

app.use('/fibo', profilRoutes);

app.use('/pengaturan', pengaturanRoutes);

app.use('/kebijakan-privasi', kebijakanRoutes);

app.use('/syarat-ketentuan', syaratRoutes);

app.get('/', isLoggedOut, (req, res) => {
    res.render('index', {
        user: req.user
    })
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found :(', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if(!err.message) err.message = 'Oh No! Something went wrong!'
    res.status(statusCode).render('error', { err, user:req.user })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
});