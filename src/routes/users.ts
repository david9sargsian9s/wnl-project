import express from 'express';
import UserController from '../controller/UserController';
import getAccessFromCheck from '../middlewares/getAccessToken';
import { checkPermission } from '../middlewares/ckeckPermission';
import RenderController from '../controller/RenderController';
import { optionalAuth } from '../middlewares/OptionalAuth';
import { noCache } from '../middlewares/noCache';
var router = express.Router();

const user = new UserController();
const render = new RenderController();

/* POST user. */
router.post('/api/users', user.createUser);

/* PATCH user info. */
router.patch('/api/users/:id', getAccessFromCheck, checkPermission('update', 'user', true), user.updateUser);


/* DELETE user info. */
router.delete('/api/users/:id', getAccessFromCheck, checkPermission('delete', 'user', true), user.deleteUser);


// RENDER PAGES

/* GET home page. */
router.get('/', noCache, optionalAuth, render.getMainPage);

/* GET login page. */
router.get('/auth/login', render.getLoginPage);

/* GET register page. */
router.get('/auth/register', render.getRegPage);

/* GET roadmap page. */
router.get('/roadmap', optionalAuth, render.getRoadmapPage);

/* GET products page. */
router.get('/products', optionalAuth, render.getProductsPage);

/* GET license page. */
router.get('/license', optionalAuth, render.getLicensePage);

/* GET privacy page. */
router.get('/privacy', optionalAuth, render.getPrivacyPage);

/* GET WLite page. */
router.get('/products/wlite', optionalAuth, render.getWLite);

export default router;
