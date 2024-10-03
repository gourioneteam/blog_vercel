// passport-config.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

// Configure Passport
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user || !(await user.comparePassword(password))) {
        return done(null, false, { message: 'Invalid username or password' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
