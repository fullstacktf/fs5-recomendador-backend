import { MediaService } from "./service";
import express, { Router, Request, Response } from "express";

export class MediaController {
    private service: MediaService;
    public readonly router: Router;

    constructor(service: MediaService) {
        this.service = service;
        this.router = express.Router();

        console.log("you are here");
        this.router.get("/", this.selectAllMedia);
    };

    private async selectAllMedia(req: Request, res: Response) {
        res.json({message: "you are in selectAllMedia"});
        await this.service.allMedia();
    }
};
