import { Request, Response } from "express";

class RenderController {
    async getMainPage(req : Request, res : Response) {
        try {

            const user = req.jwtUser || req.user || null;

            res.render('home', {
                    title : 'WNL - project',
                    pageStyles: [
                        '/css/home.css'
                    ],
                    user : user
                }
            );
        } catch (error : unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            res.status(400).json({ error : error })
        }
    }

    async getLoginPage(req : Request, res : Response) {
        try {

            res.render('login', {
                    title : 'WNL - login',
                    pageStyles: [
                        '/css/login.css'
                    ],
                }
            );
        } catch (error : unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            res.status(400).json({ error : error })
        }
    }

    async getRegPage(req : Request, res : Response) {
        try {

            res.render('register', {
                    title : 'WNL - register',
                    pageStyles: [
                        '/css/register.css'
                    ],
                }
            );
        } catch (error : unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            res.status(400).json({ error : error })
        }
    }

    async getProductsPage(req : Request, res : Response) {
        try {

            const user = req.jwtUser || req.user || null;

            res.render('products', {
                    title : 'WNL - products',
                    pageStyles: [
                        '/css/products.css'
                    ],
                    user : user
                }
            );
        } catch (error : unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            res.status(400).json({ error : error })
        }
    }

    async getRoadmapPage(req : Request, res : Response) {
        try {

            const user = req.jwtUser || req.user || null;

            res.render('roadmap', {
                    title : 'WNL - roadmap',
                    pageStyles: [
                        '/css/roadmap.css'
                    ],
                    user : user
                }
            );
        } catch (error : unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            res.status(400).json({ error : error })
        }
    }

    async getLicensePage(req : Request, res : Response) {
        try {
            const user = req.jwtUser || req.user || null;

            res.render('license', {
                    title : 'WNL - License Agreement',
                    pageStyles: [
                        '/css/license.css'
                    ],
                    user : user
                }
            );
        } catch (error : unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            res.status(400).json({ error : error })
        }
    }

    async getPrivacyPage(req : Request, res : Response) {
        try {
            const user = req.jwtUser || req.user || null;
        
            res.render('privacy', {
                    title : 'WNL - Privacy Policy',
                    pageStyles: [
                        '/css/privacy.css'
                    ],
                    user : user
                }
            );
        } catch (error : unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            res.status(400).json({ error : error })
        }
    }
}

export default RenderController;