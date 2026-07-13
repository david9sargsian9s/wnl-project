import { Request, Response, NextFunction } from 'express';
import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.TECHNICAL_ACCOUNT,
        pass: process.env.TECHNICAL_ACCOUNT_PASS,
    }
});

export const sendSupportQuery = (req: Request, res: Response, next: NextFunction): void => {
    
    const currentUser = (req as any).jwtUser || req.user;

    if (!currentUser) {
        res.status(401).send('Unauthorized access');
        return;
    }

    const { question } = req.body as { question?: string };

    if (!question || question.trim() === '') {
        res.status(400).send('Query cannot be empty');
        return;
    }
    const userIdentifier: string = currentUser.username || currentUser.email || 'Unknown User';

    const mailOptions: nodemailer.SendMailOptions = {
        from: `"WNL Core System" <${process.env.TECHNICAL_ACCOUNT}>`,
        to: process.env.TECHNICAL_ACCOUNT,
        subject: `[WNL System Query] New ticket from ${userIdentifier}`,
        text: `User: ${userIdentifier}\n\nQuestion:\n${question}`,
        html: `
            <div style="font-family: monospace; background-color: #060609; color: #e2e8f0; padding: 20px; border: 1px solid #00ff66;">
                <h2 style="color: #00e5ff; border-bottom: 1px solid rgba(0,255,102,0.2); padding-bottom: 10px;">// NEW_ARCHITECTURAL_QUERY</h2>
                <p style="margin: 15px 0;"><strong>Sender Node:</strong> <span style="color: #00ff66;">${userIdentifier}</span></p>
                <div style="background: rgba(255,255,255,0.03); padding: 15px; border-left: 3px solid #00ff66; color: #fff;">
                    ${question.replace(/\n/g, '<br>')}
                </div>
            </div>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Mail stream failure:', error);
            res.status(500).send('Transmission broken. Try again later.');
            return;
        }
        res.redirect('/roadmap?success=true');
    });
};