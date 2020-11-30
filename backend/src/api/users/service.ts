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

    async updateUser(user: User) {
        const newUser = user;
        const idUser = newUser.id;

        return this.repository.updateOne({id: idUser}, newUser);
    };

    async deleteUser(id: string) {
        const numberID = Number(id);
        return this.repository.deleteOne({id: numberID})
    };
};
