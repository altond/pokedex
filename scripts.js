const app = document.getElementById('root')

const container = document.createElement('div')
container.setAttribute('class', 'container')

addPokemonNames()
getPokemonData(1) //DEFAULT, 1 = bulbasaur

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

    const nameheader = document.createElement('h1')
    nameheader.textContent = Pokemon[name-1];
    card.appendChild(nameheader)
//    const div = document.getElementById('card');
//    div.appendChild(nameheader);

    const sprite = document.createElement('img')
    sprite.src = data.sprites.front_default
    sprite.width="300"
    sprite.height="300"
    card.appendChild(sprite)

    const typeheader = document.createElement('h2')
    typeheader.textContent = "Type"
    card.appendChild(typeheader)
    const types = document.createElement('ul')
    types.textContent = getTypes(data.types)
    card.appendChild(types)

    const abilitiesheader = document.createElement('h2')
    abilitiesheader.textContent = "Abilities"
    card.appendChild(abilitiesheader)
    var abilitieslist = document.createElement('ul')
    abilitieslist.textContent = getAbilities(data.abilities)
    card.appendChild(abilitieslist)

    const movesheader = document.createElement('h2')
    movesheader.textContent = "Moves"
    card.appendChild(movesheader)
    var moveslist = document.createElement('ul')
    moveslist.textContent = getMoves(data.moves)
    card.appendChild(moveslist)

    const statsheader = document.createElement('h2')
    statsheader.textContent = "Base Stats"
    card.appendChild(statsheader)
    addStats(data.stats, card)
  
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

function getMoves(movesarr) {
  var moveslistcontent = "";
  for(var i in movesarr)  {
      var movename = movesarr[i].move.name
      moveslistcontent += format(movename)
      if (i < movesarr.length-1) moveslistcontent += ", "
  }
  return moveslistcontent;
}

function format(str) {
  res = (str.replace(/\b\w/g, l => l.toUpperCase())).replace("-", " ")
  return res
}

function getAbilities(abilitiesarr) {
  var abilitieslistcontent = "";
  for(var i in abilitiesarr)   {
      var abilityname = abilitiesarr[i].ability.name
      var res = format(abilityname);
      abilitieslistcontent += res
      if (i < abilitiesarr.length-1) abilitieslistcontent += ", "
  }
  return abilitieslistcontent;
}

function addStats(statsarr, card) {
  const hp = document.createElement('p')
  hp.textContent = "HP: " + statsarr[5].base_stat
  card.appendChild(hp)

  const attack = document.createElement('p')
  attack.textContent = "Attack: " + statsarr[4].base_stat
  card.appendChild(attack)

  const defense = document.createElement('p')
  defense.textContent = "Defense: " + statsarr[3].base_stat
  card.appendChild(defense)

  const specattack = document.createElement('p')
  specattack.textContent = "Special Attack: " + statsarr[2].base_stat
  card.appendChild(specattack)

  const specdefense = document.createElement('p')
  specdefense.textContent = "Special Defense: " + statsarr[1].base_stat
  card.appendChild(specdefense)

  const speed = document.createElement('p')
  speed.textContent = "Speed: " + statsarr[0].base_stat
  card.appendChild(speed)
}

function getTypes(typesarr) {
  var res = "\t";
  for(var i in typesarr) {
    var type = typesarr[i].type.name
    res += type.charAt(0).toUpperCase() + type.substring(1, type.length)
    if (i < typesarr.length-1) res += " / "
  }
  return res;
}

function addPokemonNames()  {
  var select = document.getElementById("pokemon")
  for(var i = 0; i < Pokemon.length; i++) {
    var option = document.createElement('option');
    option.value = i+1;
    //option.value = Pokemon[i].toLowerCase().replace(" ","-").replace(/[.;]/gi, '').replace("♀",'-f').replace("♂",'-m');
    option.text = i+1 + ": " + Pokemon[i]
    select.add(option)
  }

}