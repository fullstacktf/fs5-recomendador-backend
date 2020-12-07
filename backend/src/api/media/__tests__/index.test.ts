import { MediaRepository } from '../repository';
import { MediaService } from '../service';
import { Database } from '../../../helpers/Database';
import { Media } from "../models";

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
    }
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
});
