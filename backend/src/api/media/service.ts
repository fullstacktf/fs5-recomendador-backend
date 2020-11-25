import { MediaRepository } from "./repository";

export class MediaService {
    private repository: MediaRepository;

    constructor(mediaRepository: MediaRepository) {
        this.repository = mediaRepository;
    };

    async allMedia() {
        return this.repository.findAll();
    }
};
