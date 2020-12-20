import { MediaService } from "./service";
import express, { Router, Request, Response } from "express";
import { request } from "http";

export class MediaController {
    private service: MediaService;
    public readonly router: Router;

    constructor(service: MediaService) {
        this.service = service;
        this.router = express.Router();

        //this.router.get("/rating/:value", (req, res) => this.greaterOrEqualRating(req, res));
        this.router.get("/:id", (req, res) => this.getMediaByID(req, res));
        this.router.get("/", (req, res) => this.getAllMedia(req, res));
        
        this.router.post("/", (req, res) => this.newMedia(req, res));
        this.router.post("/tags", (req, res) => this.getMediaByIDTag(req, res));
        this.router.post("/rate/:id", (req, res) => this.rateMedia(req, res));
        
        this.router.delete("/:id", (req, res) => this.deleteMedia(req, res));
        
        this.router.put("/:id", (req, res) => this.updateMedia(req, res));
    };

    private async getAllMedia(req: Request, res: Response) {
        const allMedia = await this.service.getAllMedia();
        res.json({result: allMedia});
    };

    private async getMediaByID(req: Request, res: Response) {
        const myMedia = await this.service.getMediaByID(req.params.id);
        res.json({result: myMedia});
    };

    private async newMedia(req: Request, res: Response) {
        await this.service.newMedia(req.body);
        res.json({message: "Media added!"});
    };

    private async deleteMedia(req: Request, res: Response) {
        await this.service.deleteMedia(req.params.id);
        res.json({message: "Media deleted!"});
    };

    private async updateMedia(req: Request, res: Response) {
        await this.service.updateMedia(req.body);
        res.json({message: "Media updated!"});
    };

    private async getMediaByIDTag(req: Request, res: Response) {
        if ((req.body.idtags) && (req.body.idtags.length > 0)) {
            const media = await this.service.getMediaByIDTag(req.body.idtags);
            res.json({result: media});
        } else {
            res.json({error: "Error retrieving media by ID tags: expected list of idtags"});
        };
    };

    private async rateMedia(req: Request, res: Response) {
        if ((req.body.rating) && (req.body.user)) {
            await this.service.rateMedia(req.params.id, req.body.user, req.body.rating);
            res.json({message: "Media rated!"});
        } else {
            res.json({error: "Error rating media: expected rating parameter in body"});
        };
    };

    /*private async greaterOrEqualRating(req: Request, res: Response) {
        const result = await this.service.greaterOrEqualRating(req.params.value);
        res.json({result: result});
    }*/
};
