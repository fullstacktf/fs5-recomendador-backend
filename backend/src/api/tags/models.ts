import { BaseModel } from "../../helpers/Database"

export interface Tag extends BaseModel {
    id: number;
    name: string;
    media: number[];
};
