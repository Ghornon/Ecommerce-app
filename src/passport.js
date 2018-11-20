import passport from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;

passport.use(new LocalStrategy());
