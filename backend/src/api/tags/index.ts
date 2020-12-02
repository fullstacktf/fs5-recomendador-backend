import { Database } from "../../helpers/Database";
import { TagRepository } from "./repository";
import { TagService } from "./service";
import { TagController } from "./controller";

export const generateTagRouter = (database: Database) => {
    const tagRepository = new TagRepository(database);
    const tagService = new TagService(tagRepository);
    const tagRouter = new TagController(tagService);
    
    return tagRouter.router;
};
