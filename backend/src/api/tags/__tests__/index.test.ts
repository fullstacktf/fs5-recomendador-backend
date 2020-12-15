import { TagRepository } from '../repository';
import { TagService } from '../service';
import { Database } from '../../../helpers/Database';
import { Tag } from "../models";

class TestTagRepository extends TagRepository {
    constructor() {
        super({} as Database);
    };

    async save(model: any) {
        if (model.name === "error") {
            return Promise.reject("Error saving tag");
        } else {
            return Promise.resolve("Tag saved!");
        };
    };

    async findInCollection(): Promise<Tag[]> {
        return Promise.resolve([{id: 1, name: "tag 1"} as Tag, {id: 2, name: "tag 2"} as Tag])
    };

    async findOne(query: any): Promise<Tag | null> {
        if (query.id === 123) {
            return Promise.resolve({id: 123, name: "fake tag"} as Tag);
        } else {
            return Promise.reject("Error finding tag");
        };
    };

    async deleteOne(query: any) {
        if (query.id === 123) {
            return Promise.resolve("Tag deleted successfully");
        } else {
            return Promise.reject("Error deleting tag");
        };
    };

    async updateOne(t: Tag) {
        if (t.id === 123) {
            return Promise.resolve("Tag updated successfully")
        } else {
            return Promise.reject("Error updating tag")
        };
    };
};

describe("TAGS", () => {
    it("Should save a tag item correctly without errors", async() => {
        const fakeRepository = new TestTagRepository();
        const tag = {id: 12345, name: "tag title"} as Tag;
        const sut = new TagService(fakeRepository);
        
        const result = await sut.newTag(tag);

        expect(result).toStrictEqual({message: "Tag added!"});
    });

    it("Should send an error when database is down", async() => {
        const fakeRepository = new TestTagRepository();
        const tag = {id: 12345, name: "error"} as Tag;
        const sut = new TagService(fakeRepository);
        
        const result = await sut.newTag(tag);

        expect(result).toStrictEqual({message: "Error adding tag"});
    });

    it("Should return all tags items", async() => {
        const fakeRepository = new TestTagRepository();
        const sut = new TagService(fakeRepository);

        const result = await sut.getAllTags();

        expect(result.nResults).toBeGreaterThan(1);
    });

    it("Should return a tag item by ID", async() => {
        const fakeRepository = new TestTagRepository();
        const tagTestID = "123";
        const sut = new TagService(fakeRepository);

        const result = await sut.getTagByID(tagTestID);

        expect(result).toStrictEqual({id: 123, name: "fake tag"});
    });

    it("Should return an error when retrieving a tag item by ID", async() => {
        const fakeRepository = new TestTagRepository();
        const tagTestID = "456";
        const sut = new TagService(fakeRepository);

        const result = await sut.getTagByID(tagTestID);

        expect(result).toMatchObject({message: "Error retrieving tag"});
    });

    it("Should delete a tag item by ID", async() => {
        const fakeRepository = new TestTagRepository();
        const tagTestID = "123";
        const sut = new TagService(fakeRepository);

        const result = await sut.deleteTag(tagTestID);

        expect(result).toStrictEqual({message: "Tag deleted"});
    });

    it("Should return an error when deleting a tag item by ID", async() => {
        const fakeRepository = new TestTagRepository();
        const tagTestID = "456";
        const sut = new TagService(fakeRepository);

        const result = await sut.deleteTag(tagTestID);

        expect(result).toStrictEqual({message: "Error deleting tag"});
    });
});
