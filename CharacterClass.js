class CharacterClass {
    #name
    #species
    #episodeCount
    #image
    #gender

    constructor(name, species, episodeCount, image, gender) {
        this.#name = name
        this.#species = species
        this.#episodeCount = episodeCount
        this.#image = image
        this.#gender = gender
    }

    get name() {
        return this.#name
    }

    set name(newName) {
        this.#name = newName
    }

    get species() {
        return this.#species
    }

    set species(newSpecies) {
        this.#species = newSpecies
    }

    get episodeCount() {
        return this.#episodeCount
    }

    set episodeCount(newEpisodeCount) {
        this.#episodeCount = newEpisodeCount
    }

    get image() {
        return this.#image
    }

    set image(newImage) {
        this.#image = newImage
    }

    get gender() {
        return this.#gender
    }
}
