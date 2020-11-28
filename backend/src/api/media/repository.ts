import { Media } from "./models";
import { Database } from "../../helpers/Database";
import { BaseRepository } from "../utils/BaseRepository"

export class MediaRepository extends BaseRepository<Media> {
    constructor(database: Database) {
        super(database, "media");
    };
};
