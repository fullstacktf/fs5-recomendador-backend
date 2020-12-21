import { UserService } from "./service";
import express, { Router, Request, Response } from "express";

export class UserController {
    private service: UserService;
    public readonly router: Router;

    constructor(service: UserService) {
        this.service = service;
        this.router = express.Router();

        this.router.get("/:id", (req, res) => this.getUserByID(req, res));
        this.router.get("/", (req, res) => this.getAllUsers(req, res));
        
        this.router.delete("/:id", (req, res) => this.deleteUser(req, res));
        
        this.router.put("/:id", (req, res) => this.updateUser(req, res));
        
        this.router.post("/login", (req, res) => this.login(req, res));
        this.router.post("/", (req, res) => this.newUser(req, res));
        this.router.post("/:id", (req, res) => this.setFavouriteTags(req, res));
    };

    private async getAllUsers(req: Request, res: Response) {
        const allUsers = await this.service.getAllUsers();
        res.json({result: allUsers});
    };

    private async getUserByID(req: Request, res: Response) {
        const myUser = await this.service.getUserByID(req.params.id);
        res.json({result: myUser});
    };

    private async updateUser(req: Request, res: Response) {
        await this.service.updateUser(req.body);
        res.json({message: "User updated!"});
    };

    private async deleteUser(req: Request, res: Response) {
        await this.service.deleteUser(req.params.id);
        res.json({message: "User deleted!"});
    };

    private async newUser(req: Request, res: Response) {
        await this.service.newUser(req.body);
        res.json({message: "User added!"});
    };

    private async setFavouriteTags(req: Request, res: Response) {
        const userID = req.params.id;
        const tags = req.body.tags;

        await this.service.setFavouriteTags(userID, tags);
        res.json({message: "Favourite Tags setted!"});
    };

    private async login(req: Request, res: Response) {
        const email = req.body.email;
        const password = req.body.password;

        const isCorrect = await this.service.login(email, password);

        if (isCorrect) {
            switch (isCorrect.message) {
                case "Password correct":
                    res.json({check: true});
                    break;
                default:
                    res.json({check: false});
                    break;
            };
        } else {
            res.json({check: false});
        };
    };
};
