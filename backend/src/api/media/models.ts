import { BaseModel } from "../../helpers/Database";

interface TagList {
    id: number;
    name: string;
};

interface RatingList {
    id: number;
    rating: number;
};

export interface Media extends BaseModel {
    id: number;
    title: string;
    subtitle: string;
    original_language: string;
    original_title: string;
    overview: string;
    release_date: string;
    runtime: number;
    tags: TagList[];
    ratings: RatingList[];
    rating: number;
};
