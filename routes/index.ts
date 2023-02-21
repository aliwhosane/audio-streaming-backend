import { Application } from "express";
import { attachApplicationRoutes } from "./basic";

export function configureRoutes(app: Application): void {
    attachApplicationRoutes(app);
}