import { BaseModel } from "../../helpers/Database";

interface TagListItem {
    id: number;
    name: string;
};

interface RatingListItem {
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
    tags: TagListItem[];
    ratings: RatingListItem[];
    rating: number;
};
