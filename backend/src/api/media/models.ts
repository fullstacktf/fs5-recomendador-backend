import { BaseModel } from "../../helpers/Database";

export interface Media extends BaseModel {
    id: number;
    title: string;
    subtitle: string;
};
