import {} from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import session from 'express-session';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth';

const app = express();

mongoose.connect(process.env.MDB_URI);
const MongoStore = require('connect-mongo')(session);

app.use(cors());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FB_APP_ID,
  clientSecret: process.env.FB_SECRET,
  callbackURL: 'http://localhost:8888/auth/facebook/callback',
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ profileId: profile.id }, (err, user) => {
    if (err) return done(err);
    if (user) return done(null, user);
    const newUser = new User();
    newUser.profileId = profile.id;
    newUser.token = accessToken;
    newUser.save(() => done(null, newUser));
  });
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use('/auth/facebook', authRoutes);

app.listen(8888, () => console.log('back end up on port 8888'));
