import { Router } from 'express';
import { sendSupportQuery } from '../controller/supportController';
import getAccessFromCheck from '../middlewares/getAccessToken';

const router = Router();

router.post('/support/ask', getAccessFromCheck, sendSupportQuery);

export default router;