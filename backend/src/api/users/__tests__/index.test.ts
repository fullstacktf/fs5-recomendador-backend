import { UserRepository } from '../repository';
import { UserService } from '../service';
import { Database } from '../../../helpers/Database';
import { User } from "../models";

class TestUserRepository extends UserRepository {
    constructor() {
        super({} as Database);
    };

    async save(model: any) {
        if (model.name === "error") {
            return Promise.reject("Error saving user");
        } else {
            return Promise.resolve("user saved!");
        };
    };

    async findInCollection(): Promise<User[]> {
        return Promise.resolve([{id: 1} as User, {id: 2} as User]);
    };
};

describe("USERS", () => {
    it("Should save a user correctly without errors", async() => {
        const fakeRepository = new TestUserRepository();
        const user = {id: 12345, name: "user name"} as User;
        const sut = new UserService(fakeRepository);
        
        const result = await sut.newUser(user);

        expect(result).toStrictEqual({message: "User added!"});
    });

    it("Should send an error when database is down", async() => {
        const fakeRepository = new TestUserRepository();
        const user = {id: 12345, name: "error"} as User;
        const sut = new UserService(fakeRepository);
        
        const result = await sut.newUser(user);

        expect(result).toStrictEqual({message: "Error adding user"});
    });

    it("Should return all users", async() => {
        const fakeRepository = new TestUserRepository();
        const sut = new UserService(fakeRepository);

        const result = await sut.getAllUsers();

        expect(result.nResults).toBeGreaterThan(1);
    });
});
