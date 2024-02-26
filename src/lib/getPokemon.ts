
export default async function getPokemon() {
    try {
        const randomNumber = Math.floor(Math.random()*(459)+1).toString()
        const data = await fetch("https://pokeapi.co/api/v2/pokemon/"+randomNumber)
        const linkData = await data.json()
        if(Object.keys(linkData).length === 0) {
            throw new Error("Object is null")
        }
        const linkName = linkData.name
        const linkImg = linkData.sprites.other.dream_world.front_default
        if(linkName && linkImg) {
            return {id: randomNumber, name: linkName, img: linkImg}
        }
    }
    catch(error) {
        return error
    }
}