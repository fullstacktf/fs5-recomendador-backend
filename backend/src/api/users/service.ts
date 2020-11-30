import { User } from "./models";
import { UserRepository } from "./repository";

export class UserService {
    private repository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.repository = userRepository;
    };

    async getAllUsers() {
        return this.repository.findInCollection();
    };

    async getUserByID(id: string) {
        const numberID = Number(id);
        return this.repository.findOne({id: numberID});
    };
};
