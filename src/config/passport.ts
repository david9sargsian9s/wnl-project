import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';

// Serialize user for sessions
passport.serializeUser((user: any, done: any) => done(null, user));
passport.deserializeUser((obj: any, done: any) => done(null, obj));

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: "/auth/google/callback"
  },
  (accessToken: string, refreshToken: string, profile: any, done: any) => {
    // Here's the logic: we search for a user in the database by profile.id or create a new one
    return done(null, profile);
  }
));

// GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID || '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    callbackURL: "/auth/github/callback"
  },
  (accessToken: string, refreshToken: string, profile: any, done: any) => {
    // Similarly: we search for or create a user in the database
    return done(null, profile);
  }
));