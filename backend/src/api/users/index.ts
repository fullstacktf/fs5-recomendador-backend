import { Database } from "../../helpers/Database";
import { UserRepository } from "./repository";
import { UserService } from "./service";
import { UserController } from "./controller";


export const generateUserRouter = (database: Database) => {
    const userRepository = new UserRepository(database);
    const userService = new UserService(userRepository);
    const userRouter = new UserController(userService);
    
    return userRouter.router;
};
