import { MediaRepository } from '../repository';
import { MediaService } from '../service';
import { Database } from '../../../helpers/Database';
import { Media } from "../models";
import { Tag } from "../../tags/models";

class TestMediaRepository extends MediaRepository {
    constructor() {
        super({} as Database);
    };

    async save() {
        return {message: "Media added!"};
    };

    async findInCollection(): Promise<Media[]> {
        return new Promise((resolve, reject) => {
            resolve([{id: 1} as Media, {id: 2} as Media]);
        });
    };

    async findOne(m: Media): Promise<Media | null> {
        return new Promise((resolve, reject) => {
            resolve(m);
        });
    };

    async deleteOne(m: Media) {
        return {message: "Media deleted!"};
    };

    async updateOne(m: Media) {
        return {message: "Media updated!"};
    };

    async find(): Promise<Media[]> {
        return new Promise((resolve, reject) => {
            resolve([{id: 1} as Media, {id: 2} as Media]);
        });
    };
};

describe("MEDIA", () => {
    it("Add new Media item", async() => {
        const fakeRepository = new TestMediaRepository();
        const fakeService = new MediaService(fakeRepository);

        const media = {id: 12345} as Media;

        const result = await fakeService.newMedia(media);

        expect(result).toStrictEqual({message: "Media added!"});
    });

    it("Get all Media items", async() => {
        const fakeRepository = new TestMediaRepository();
        const fakeService = new MediaService(fakeRepository);

        const result = await fakeService.getAllMedia();

        expect(result.length).toBe(2);
    });

    it("Get Media item by ID", async() => {
        const fakeRepository = new TestMediaRepository();
        const fakeService = new MediaService(fakeRepository);

        const id = "123";
        const media = {id: 123};
        const result = await fakeService.getMediaByID(id);

        expect(result).toMatchObject(media);
    });

    it("Delete Media item by ID", async() => {
        const fakeRepository = new TestMediaRepository();
        const fakeService = new MediaService(fakeRepository);

        const id = "123";
        const result = await fakeService.deleteMedia(id);

        expect(result).toStrictEqual({message: "Media deleted!"});
    });

    it("Update Media item by ID", async() => {
        const fakeRepository = new TestMediaRepository();
        const fakeService = new MediaService(fakeRepository);

        const media = {id: 123} as Media;
        const result = await fakeService.updateMedia(media);

        expect(result).toStrictEqual({message: "Media updated!"});
    });

    it("Get all Media items tagged by ID tag", async() => {
        const fakeRepository = new TestMediaRepository();
        const fakeService = new MediaService(fakeRepository);

        const tag = "123";
        const result = await fakeService.getMediaByIDTag(tag);

        expect(result.length).toBe(2);
    });
});
