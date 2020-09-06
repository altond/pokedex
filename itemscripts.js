const app = document.getElementById('root')

const container = document.createElement('div')
container.setAttribute('class', 'container')

addPokemonNames()
getPokemonData(1) //DEFAULT, 1 = bulbasaur

function myFunction() {
  
  getPokemonData(document.getElementById('pokemon').value)

}

function getPokemonData(name) {
  var requestURL = "https://pokeapi.co/api/v2/item/" + name;
  var request = new XMLHttpRequest()
  request.open('GET', requestURL, true)
  request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {

    const card = document.createElement('div')
    card.setAttribute('class', 'card')

    const nameheader = document.createElement('h1')
    for(var i = 0; i < data.names.length; i++)  {
        if(data.names[i].language.name == "en") {
            nameheader.textContent = data.names[i].name;
            break;
        }
    }
    
    card.appendChild(nameheader)
    

    const sprite = document.createElement('img')
    sprite.src = data.sprites.default
    sprite.width="300"
    sprite.height="300"
    card.appendChild(sprite)

    const typeheader = document.createElement('h2')
    typeheader.textContent = "Description"
    card.appendChild(typeheader)
    const types = document.createElement('ul')
    for(var i = 0; i < data.flavor_text_entries.length; i++)  {
        if(data.flavor_text_entries[i].language.name == "en") {
            //types.textContent = data.flavor_text_entries[i].text;
            var temp = document.createElement('li');
            var string = "";
            string += gameformat(data.flavor_text_entries[i].version_group.name) + ": ";
            string += data.flavor_text_entries[i].text;
            temp.appendChild(document.createTextNode(string));//data.flavor_text_entries[i].version_group.name + " " + data.flavor_text_entries[i].text));
            types.appendChild(temp);
        }
    }
    //types.textContent = data.effect_entries[0].effect//getTypes(data.types)
    card.appendChild(types)

/*    const abilitiesheader = document.createElement('h2')
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
 */ 
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

function gameformat(str)    {
    res = (str.replace(/\b\w/g, l => l.toUpperCase())).replace(/-/g, " ");
    if (res.split(" ").length - 1 < 2)  {
        res = res.replace(" ","/");
    }
    else    {
        if(res.includes("2"))   { res = res.substring(0,7) + "/" + res.substring(7+1) }
        if(res.includes("Ultra"))   { res = res.substring(0,9) + "/" + res.substring(9+1) }
    }
    
    return res;
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

  var requestURL = "https://pokeapi.co/api/v2/item/?offset=0&limit=954"//  + name
  var request = new XMLHttpRequest()
  request.open('GET', requestURL, true)
  request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {

    var select = document.getElementById("pokemon");
    for(var i = 0; i < data.results.length; i++) {
        var option = document.createElement('option');
        option.value = data.results[i].name;//i+1;
        //option.value = Pokemon[i].toLowerCase().replace(" ","-").replace(/[.;]/gi, '').replace("♀",'-f').replace("♂",'-m');
        option.text = data.results[i].name;
        select.add(option)
    }
    

  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)
  }
}


request.send()
}

  

