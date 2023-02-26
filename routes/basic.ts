import { Application } from "express";
import { createNewLogger } from '../settings/logger';

const logger = createNewLogger('ROUTES');

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

}