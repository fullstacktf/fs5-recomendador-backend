import { Tag } from "./models";
import { Database } from "../../helpers/Database";
import { BaseRepository } from "../utils/BaseRepository"

export class TagRepository extends BaseRepository<Tag> {
    constructor(database: Database) {
        super(database, "tags");
    };
};
