import { User } from "./models";
import { Database } from "../../helpers/Database";
import { BaseRepository } from "../utils/BaseRepository"

export class MediaRepository extends BaseRepository<User> {
    constructor(database: Database) {
        super(database, "users");
    };
};
