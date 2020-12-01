import { TagService } from "./service";
import express, { Router, Request, Response } from "express";

export class TagController {
    private service: TagService;
    public readonly router: Router;

    constructor(service: TagService) {
        this.service = service;
        this.router = express.Router();

        this.router.get("/:id", (req, res) => this.getTagByID(req, res));
        this.router.get("/", (req, res) => this.getAllTags(req, res));

        this.router.delete("/:id", (req, res) => this.deleteTag(req, res));


        this.router.post("/", (req, res) => this.newTag(req, res));
    };

    private async getAllTags(req: Request, res: Response) {
        const allTags = await this.service.getAllTags();
        res.json({values: allTags.length, result: allTags});
    };

    private async newTag(req: Request, res: Response) {
        await this.service.newTag(req.body);
        res.json({message: "Tag added!"});
    };

    private async getTagByID(req: Request, res: Response) {
        const myTag = await this.service.getTagByID(req.params.id);
        res.json({result: myTag});
    };

    private async deleteTag(req: Request, res: Response) {
        await this.service.deleteTag(req.params.id);
        res.json({message: "Tag deleted!"});
    };
};
