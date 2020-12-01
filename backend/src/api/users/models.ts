import { BaseModel } from "../../helpers/Database";
import { RatingListItem } from "../media/models";

export interface User extends BaseModel {
    id: number;
    name: string;
    password: string;
    email: string;
    ratings: RatingListItem[];
};
