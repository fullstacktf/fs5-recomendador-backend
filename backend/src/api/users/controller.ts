import { UserService } from "./service";
import express, { Router, Request, Response } from "express";

export class UserController {
    private service: UserService;
    public readonly router: Router;

    constructor(service: UserService) {
        this.service = service;
        this.router = express.Router();

        //this.router.get("/rating/:value", (req, res) => this.greaterOrEqualRating(req, res));
        //this.router.get("/tags/:id", (req, res) => this.getMediaByIDTag(req, res));
        //this.router.get("/:id", (req, res) => this.getMediaByID(req, res));
        this.router.get("/", (req, res) => this.getAllUsers(req, res));
        
        //this.router.post("/", (req, res) => this.newMedia(req, res));
        
        //this.router.delete("/:id", (req, res) => this.deleteMedia(req, res));
        
        //this.router.put("/:id", (req, res) => this.updateMedia(req, res));
    };

    private async getAllUsers(req: Request, res: Response) {
        const allUsers = await this.service.getAllUsers();
        res.json({values: allUsers.length, result: allUsers});
    };
};
