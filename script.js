
const pokeBtn = document.getElementById("search-button")
const hp = document.getElementById("hp")
const attack = document.getElementById("attack")
const defense = document.getElementById("defense")
const spAttack = document.getElementById("special-attack")
const spDefense = document.getElementById("special-defense")
const speed = document.getElementById("speed")
const left = document.getElementById("left-arrow")
const right = document.getElementById("right-arrow")
const pokeName = document.getElementById("pokemon-name")
const pokeId = document.getElementById("pokemon-id")
const pokeHeight = document.getElementById("height")
const pokeWeight = document.getElementById("weight")



 pokeBtn.addEventListener('click', () => {
    const pokeInput = document.getElementById("search-input")
    const url = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokeInput.value.toLowerCase()}`
    console.log(url);
    if (pokeInput.value === '') {
        alert("Pokémon not found")
    }
    else {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                img(data)
                generalData(data)
                type(data)
                tableData(data)
                
                
            })
            .catch(err => {
                handleerror(err)
                console.log(err);
            })

    }
})
const sprite = document.createElement('img');

const img = (data) => {
    
    const pokiImg = document.getElementById("pokemon-image")
    if (pokiImg) pokiImg.remove()
    const frontImgUrl = data.sprites.front_default;
    const backImgUrl = data.sprites.back_default;
    const backShineImgUrl = data.sprites.back_shiny;
    const frontShineImgUrl = data.sprites.front_shiny;

    const secondSection = document.getElementById('section2')
    
    sprite.id = 'sprite'
    sprite.src = frontImgUrl
    console.log(sprite.src);
    const spriteSet = secondSection.children[1]
    secondSection.insertBefore(sprite, spriteSet)


    
    
    sprite.src = data.sprites.front_default

    
    
        left.addEventListener('click', () => {
            
            if (sprite.src === frontImgUrl || sprite.src === frontShineImgUrl) {
                sprite.src = backImgUrl
            }
            else if (sprite.src === backImgUrl || sprite.src === backShineImgUrl) {
                sprite.src = frontImgUrl
            }
            
        })
        right.addEventListener('click', () => {
            
            if (sprite.src === frontImgUrl) {
                sprite.src = frontShineImgUrl
            }
            else if (sprite.src === backImgUrl ) {
                sprite.src = backShineImgUrl
            }
        })
    

    



}


const type = (data) => {
    const types = document.getElementById("types")
    types.innerHTML = ``

    for (let i = 0; i < data.types.length; i++) {
        const pokiType = document.createElement("p")

        pokiType.textContent = data.types[i].type.name

        types.appendChild(pokiType)
    }

    
}

const tableData = (data) => {
    hp.innerText = data.stats[0].base_stat
    attack.innerText = data.stats[1].base_stat
    defense.innerText = data.stats[2].base_stat
    spAttack.innerText = data.stats[3].base_stat
    spDefense.innerText = data.stats[4].base_stat
    speed.innerText = data.stats[5].base_stat
}

const generalData = (data) => {
    pokeName.innerText = data.name.toUpperCase();
    pokeId.innerText = `${data.id}`
    pokeHeight.innerText = data.height;
    pokeWeight.innerText = data.weight
}

const handleerror = (err) => {
    
        alert('Pokémon not found')
        return
    
}