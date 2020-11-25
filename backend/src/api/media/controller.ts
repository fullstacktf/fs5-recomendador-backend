import { MediaService } from "./service";
import express, { Router, Request, Response } from "express";

export class MediaController {
    private service: MediaService;
    public readonly router: Router;

    constructor(service: MediaService) {
        this.service = service;
        this.router = express.Router();

        console.log("you are here");
        //this.router.get("/rating/:value", (req, res) => this.greaterOrEqualRating(req, res));
        this.router.get("/:id", (req, res) => this.getMediaByID(req, res));
        this.router.get("/", (req, res) => this.getAllMedia(req, res));
        
        this.router.post("/", (req, res) => this.newMedia(req, res));
        
        this.router.delete("/:id", (req, res) => this.deleteMedia(req, res));
        
        this.router.put("/:id", (req, res) => this.updateMedia(req, res));
    };

    private async getAllMedia(req: Request, res: Response) {
        const allMedia = await this.service.getAllMedia();
        res.json({values: allMedia.length, result: allMedia});
    };

    private async getMediaByID(req: Request, res: Response) {
        const miMedia = await this.service.getMediaByID(req.params.id);
        res.json({result: miMedia});
    };

    private async newMedia(req: Request, res: Response) {
        await this.service.newMedia(req.body);
        res.json({message: "Media added!"});
    };

    private async deleteMedia(req: Request, res: Response) {
        this.service.deleteMedia(req.params.id);
        res.json({message: "Media deleted!"});
    };

    private async updateMedia(req: Request, res: Response) {
        this.service.updateMedia(req.body);
        res.json({message: "Media updated!"});
    }

    /*private async greaterOrEqualRating(req: Request, res: Response) {
        const result = await this.service.greaterOrEqualRating(req.params.value);
        res.json({result: result});
    }*/
};
