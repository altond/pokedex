const app = document.getElementById('root')

const container = document.createElement('div')
container.setAttribute('class', 'container')

getPokemonData('bulbasaur') //DEFAULT

function myFunction() {
  
  getPokemonData(document.getElementById('pokemon').value)

}

function getPokemonData(name) {

  var requestURL = "https://pokeapi.co/api/v2/pokemon/"  + name
  var request = new XMLHttpRequest()
  request.open('GET', requestURL, true)
  request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
    const card = document.createElement('div')
    card.setAttribute('class', 'card')

    const name = document.createElement('h1')
    var pokemonname = data.name.charAt(0).toUpperCase().concat(data.name.substring(1, data.name.length))
    name.textContent = pokemonname
    card.appendChild(name)

    const sprite = document.createElement('img')
    sprite.src = data.sprites.front_default
    sprite.width="200"
    sprite.height="200"
    card.appendChild(sprite)

    const abilitiesheader = document.createElement('h2')
    abilitiesheader.textContent = "Abilities"
    card.appendChild(abilitiesheader)

    var temp = document.createElement('ul')
    var abilities = ""
    for(var i in data.abilities)   {
        var abilityname = data.abilities[i].ability.name
        var res = abilityname.charAt(0).toUpperCase() + abilityname.substring(1, abilityname.length)
        abilities += res
        if (i < data.abilities.length-1) abilities += ", "
    }
    temp.textContent = abilities
    card.appendChild(temp)

    const statsheader = document.createElement('h2')
    statsheader.textContent = "Stats"
    card.appendChild(statsheader)

    //while(container.firstChild) {
    //  container.removeChild(container.firstChild);
    //}
    if (container.firstChild != null) container.removeChild(container.firstChild);
    container.appendChild(card)

    app.appendChild(container)
    

  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)
  }
}


request.send()
}