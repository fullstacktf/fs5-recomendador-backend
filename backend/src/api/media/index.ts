import { Database } from "../../helpers/Database";
import { MediaRepository } from "./repository";
import { MediaService } from "./service";
import { MediaController } from "./controller";


export const generateMediaRouter = (database: Database) => {
    const mediaRepository = new MediaRepository(database);
    const mediaService = new MediaService(mediaRepository);
    const mediaRouter = new MediaController(mediaService);
    
    return mediaRouter.router;
};
