import { Application } from "express";
import { Authenticator } from "../middleware/auth";
import { UserController } from "../modules/user/user_controller";
import { createNewLogger } from '../settings/logger';

const logger = createNewLogger('ROUTES');
const userController = new UserController();
const auth = new Authenticator();

export function attachApplicationRoutes(app: Application){
    app.use((req, res, next)=> {
        next();
    });

    app.get('/stories');
    app.get('/stories/:tag');
    app.get('/stories/artist/:artist');
    app.get('/stories/favorites');
    app.get('/stories/trending');
    app.get('stories/genre/:genre');
    app.get('stories/playlist/:playlist');

    app.post('stories/tag/add');
    app.post('stories/tag/remove');
    app.post('stories/categories/add');
    app.post('stories/categories/remove');
    app.post('stories/favorites');
    app.post('playlist/create');
    app.post('playlist/remove');
    app.post('playlist/add');

    app.post('/users/signup', userController.signUp);
    app.post('/users/login', userController.login);
    app.get('/users/token',[auth.isAuthorized], userController.validateToken);
    app.get('/users/detail',[auth.isAuthorized], userController.details);

}