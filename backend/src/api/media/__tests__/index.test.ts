import { MediaRepository } from '../repository';
import { MediaService } from '../service';
import { Database } from '../../../helpers/Database';
import { Media, TagListItem } from "../models";

class TestMediaRepository extends MediaRepository {
    constructor() {
        super({} as Database);
    };

    async save(model: any) {
        if (model.title === "error") {
            return Promise.reject("Error saving media");
        } else {
            return Promise.resolve("Media saved!");
        };
    };

    async findInCollection(): Promise<Media[]> {
        return Promise.resolve([{id: 1} as Media, {id: 2} as Media])
    };

    async findOne(query: any): Promise<Media | null> {
        if (query.id === 123) {
            return Promise.resolve({id: 123, title: "fake media"} as Media);
        } else {
            return Promise.reject("Error finding media");
        };
    };

    async deleteOne(query: any) {
        if (query.id === 123) {
            return Promise.resolve("Media deleted successfully");
        } else {
            return Promise.reject("Error deleting media");
        };
    };

    async updateOne(m: Media) {
        if (m.id === 123) {
            return Promise.resolve("Media updated successfully")
        } else {
            return Promise.reject("Error updating media")
        };
    };

    async find(query: any): Promise<Media[]> {
        if (query["tags.id"] === 1000) {
            const fakeTagItem = [{id: 123, name: "fake tag"} as TagListItem];
            return Promise.resolve([{id: 123, tags: fakeTagItem} as Media, {id: 234, tags: fakeTagItem} as Media]);
        } else {
            return Promise.reject("Error retrieving media by ID tag")
        };
    };
};

describe("MEDIA", () => {
    it("Should save a media item correctly without errors", async() => {
        const fakeRepository = new TestMediaRepository();
        const media = {id: 12345, title: "media title"} as Media;
        const sut = new MediaService(fakeRepository);
        
        const result = await sut.newMedia(media);

        expect(result).toStrictEqual({message: "Media added!"});
    });

    it("Should send an error when database is down", async() => {
        const fakeRepository = new TestMediaRepository();
        const media = {id: 12345, title: "error"} as Media;
        const sut = new MediaService(fakeRepository);
        
        const result = await sut.newMedia(media);

        expect(result).toStrictEqual({message: "Error adding media"});
    });

    it("Should return all media items", async() => {
        const fakeRepository = new TestMediaRepository();
        const sut = new MediaService(fakeRepository);

        const result = await sut.getAllMedia();

        expect(result.nResults).toBeGreaterThan(1);
    });

    it("Should return a media item by ID", async() => {
        const fakeRepository = new TestMediaRepository();
        const mediaTestID = "123";
        const sut = new MediaService(fakeRepository);

        const result = await sut.getMediaByID(mediaTestID);

        expect(result).toStrictEqual({id: 123, title: "fake media"});
    });

    it("Should return an error when retrieving a media item by ID", async() => {
        const fakeRepository = new TestMediaRepository();
        const mediaTestID = "456";
        const sut = new MediaService(fakeRepository);

        const result = await sut.getMediaByID(mediaTestID);

        expect(result).toMatchObject({message: "Error retrieving media"});
    });

    it("Should delete a media item by ID", async() => {
        const fakeRepository = new TestMediaRepository();
        const mediaTestID = "123";
        const sut = new MediaService(fakeRepository);

        const result = await sut.deleteMedia(mediaTestID);

        expect(result).toStrictEqual({message: "Media deleted"});
    });

    it("Should return an error when deleting a media item by ID", async() => {
        const fakeRepository = new TestMediaRepository();
        const mediaTestID = "456";
        const sut = new MediaService(fakeRepository);

        const result = await sut.deleteMedia(mediaTestID);

        expect(result).toStrictEqual({message: "Error deleting media"});
    });

    it("Should update media item by ID", async() => {
        const fakeRepository = new TestMediaRepository();
        const media = {id: 123, title: "title"} as Media;
        const sut = new MediaService(fakeRepository);

        const result = await sut.updateMedia(media);

        expect(result).toStrictEqual({message: "Media updated"});
    });

    it("Should return an error when updating media item by ID", async() => {
        const fakeRepository = new TestMediaRepository();
        const media = {id: 456, title: "title"} as Media;
        const sut = new MediaService(fakeRepository);

        const result = await sut.updateMedia(media);

        expect(result).toStrictEqual({message: "Error updating media"});
    });

    it("Should return all media items tagged by ID tag", async() => {
        const fakeRepository = new TestMediaRepository();
        const tagsIDs = ["1000", ];
        const sut = new MediaService(fakeRepository);

        const result = await sut.getMediaByIDTag(tagsIDs);

        expect(result.nResults).toBe(2);
    });

    it("Should return an error when retrieving all media items tagged by ID tag", async() => {
        const fakeRepository = new TestMediaRepository();
        const tagsIDs = ["999",];
        const sut = new MediaService(fakeRepository);

        const result = await sut.getMediaByIDTag(tagsIDs);

        expect(result).toStrictEqual({message: "Error retrieving media by ID tag"});
    });
});
