

var hasFetchBeenClicked = false
/*
click listener for the fetch button which will call the /characters endpoint from app.js
to retrieve the data from the rick and morty api and then call the buildCharacerCards function with that data
*/
document.getElementById('fetchButton').addEventListener('click', async () => {
    console.log("FETCH BUTTON CLICKED")
    if(!hasFetchBeenClicked){ //Only allow this api call to happen once
        try {
            const response = await fetch('http://localhost:3000/characters')
            if (!response.ok) {
    
                throw new Error(`http error status ${response.status}`)
    
            }
    
            const data = await response.json()
            buildCharacterCards(data)
    
            const nextPageButton = document.getElementById('nextPageButton')
            nextPageButton.style.display = 'block'
            nextPageButton.disabled = false
    
        } catch (error) {
    
            console.log('fetch error')
    
        }
        hasFetchBeenClicked = true
    }
})

/*
click listener for the next page button which will call the /more-characters endpoint from app.js
to retrieve the data from the rick and morty api and then call the buildCharacerCards function with that data
*/
document.getElementById('nextPageButton').addEventListener('click', async () => {
    try {
        const response = await fetch(`http://localhost:3000/more-characters`)
        if (!response.ok) {
            throw new Error(`http error status ${response.status}`)
        }

        const data = await response.json()
        buildCharacterCards(data)
        
    } catch (error) {
        console.log('fetch error', error)
    }
});

/*
function for building character cards for each character based on the data beeing given to it
*/
function buildCharacterCards(data) {
    //first, build the character class with the data
    const namesArr = []
    const speciesArr = []
    const episodesArr = []
    const imageArr = []
    const genderArr = []
    const characterArr = []

    data.results.forEach(characterData => {
        namesArr.push(characterData.name)
        speciesArr.push(characterData.species)
        episodesArr.push(characterData.episode.length)
        imageArr.push(characterData.image)
        genderArr.push(characterData.gender)
    })

    for (let i = 0; i < namesArr.length; i++) {
        characterArr.push(new CharacterClass(namesArr[i], speciesArr[i], episodesArr[i], imageArr[i], genderArr[i]))
    }

    /*
    for each CharacterClass created above, build a card with several child elements,
    attach it to the svgContainer in the index.html file in order to visually represent the data fetched
    */
    characterArr.forEach(character => {
        const cardContainer = document.createElement('div')
        cardContainer.classList.add('card')

        const imgElement = document.createElement('img')
        imgElement.src = character.image
        imgElement.alt = 'Character image'
        imgElement.width = 170
        imgElement.height = 170

        const h1name = document.createElement('h1')
        h1name.classList.add('nameText')
        h1name.innerText = character.name

        const h3species = document.createElement('h3')
        if(character.species=="Human"){
            if(character.gender=="Male"){
                h3species.innerText = `Species: ${character.species} 🙍‍♂️`
            }
            else{
                h3species.innerText = `Species: ${character.species} 🙍`
            }
        }
        else if(character.species=="Alien"){
            h3species.innerText = `Species: ${character.species} 👽`
        }
        else if(character.species=="Animal"){
            h3species.innerText = `Species: ${character.species} 🐶`
        }
        else{
            if(character.gender=="Male"){
                h3species.innerText = `Species: ${character.species} 🙍‍♂️👽`
            }
            else{
                h3species.innerText = `Species: ${character.species} 🙍👽`
            }
        }

        const h3gender = document.createElement('h3')
        h3gender.innerText = `Gender: ${character.gender}`
        
        const h3episodeCount = document.createElement('h3')
        h3episodeCount.innerText = `Appeared in ${character.episodeCount} episodes`

        cardContainer.appendChild(imgElement)
        cardContainer.appendChild(h1name)
        cardContainer.appendChild(h3species)
        cardContainer.appendChild(h3gender)
        cardContainer.appendChild(h3episodeCount)

        document.getElementById('svgContainer').appendChild(cardContainer)
    })
}




