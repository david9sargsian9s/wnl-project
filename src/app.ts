export {};
import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import 'dotenv/config';
import session from 'express-session';

import passport from 'passport';
// Load the strategy settings file (the one we wrote in the previous step)
import './config/passport';

import usersRouter from './routes/users';
import authRouter from './routes/auth';
import productRouter from './routes/events';
import  apiRouter from './routes/api';

import { UserModel } from './model/userModel';
import { tokenModel } from './model/tokenModel';
import { EventModel } from './model/EventModel';

import UserService from './service/User.service';
import EventService from './service/Event.service';
import AuthService from './service/Auth.service';

import { IModels } from "./types/models";

import path from 'path';


const app = express();

app.set('trust proxy', true);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


interface IAppLocals {
  model: IModels;

  services: {
    users: UserService;
    products: EventService;
    auth: AuthService;
  };
}

declare module "express-serve-static-core" {
  interface Locals extends IAppLocals {}
}

app.locals.model = {
  users : UserModel,
  products : EventModel,
  token : tokenModel,
}

app.locals.services = {
  users : new UserService(app.locals.model),
  products : new EventService(app.locals.model),
  auth : new AuthService(app.locals.model),
}

const connect : any = process.env.ATLAS_URL;
mongoose.connect(connect);

app.use(session({
  secret: process.env.SESSION_SECRET || 'wnl_core_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    maxAge: 24 * 60 * 60 * 1000
  }
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.user = req.user || null;
  next();
});

app.use('/', usersRouter);
app.use('/auth', authRouter);
app.use('/', productRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req : Request, res : Response, next : NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction): void {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  const status = err.status || 500;
  res.status(status);

  if (status === 404) {
    return res.render('404');
  }

  res.render('error');
});

export default app;
