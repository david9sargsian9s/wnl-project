import express from 'express';
import passport from 'passport'; // Import the passport itself
import AuthController from '../controller/AuthController';
import getAccessFromCheck from '../middlewares/getAccessToken';
import getRefreshFromCheck from '../middlewares/getRefreshToken';

const router = express.Router();
const auth = new AuthController();

/* YOUR EXISTING ROUTES */
router.post('/login', auth.getToken);
router.get("/get", getAccessFromCheck, auth.getUser);
router.get('/getAccess', getRefreshFromCheck, auth.getNewAccessToken);
router.get("/clear", auth.clearCookie);

/* --- NEW ROUTES FOR OAUTH --- */

// The "Continue with Google/GitHub" buttons will lead to these links
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));
router.get('/github', passport.authenticate('github', { scope: ['user:email'], session: false }));

// These are the callback routes where Google/GitHub returns the user. We pass control to your controller.
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/login', session: false }), auth.oauthCallback);
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/auth/login', session: false }), auth.oauthCallback);

export default router;