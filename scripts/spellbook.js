let difficultyFilter = 30;


function generateMySpellbook() {
    const content = document.querySelector("#content");
    const bookTitle = document.createElement("h2");
    bookTitle.id = "mySpellbookTitle"
    bookTitle.innerText = "Mon Grimoire";
    //tricksTitle.classList.add('do-not-display');
    const divSpellbook = document.createElement("div");
    //divTricks.classList.add('do-not-display');
    divSpellbook.id = "mySpellbook";
    
            // On rattache la balise article a la section Fiches
            content.appendChild(bookTitle);
            content.appendChild(divSpellbook);
}



function generateTricks(tricks) {
    const searchArea = document.querySelector("#searchArea");
    const tricksTitle = document.createElement("h2");
    const tricksDiv = document.createElement("div");
    tricksTitle.innerText = "TOURS DE MAGIE";

    tricksTitle.id = "myTricksTitle";
    tricksDiv.id = "myTricksDiv";

    for (let y = 0 ; y < tricks.length ; y++) {
        const trick = tricks[y];

        // Création d’une balise dédiée à un sortilège
        const trickCard = document.createElement("article");
        trickCard.classList.add("notsaved");
        trickCard.classList.add("card-effect");
        
        const nameTrick = document.createElement("h3");
        nameTrick.innerHTML = `${trick.name}`;

        const descriptionTrick = document.createElement("p");
        descriptionTrick.classList.add("description-spell");
        descriptionTrick.innerHTML = `${trick.description}`;

        // On rattache la balise article a la section Fiches
            searchArea.appendChild(tricksTitle);
            searchArea.appendChild(tricksDiv)

            tricksDiv.appendChild(trickCard);
            trickCard.appendChild(nameTrick);
            trickCard.appendChild(descriptionTrick);
    }
    }


function generateSpells(spells) {
    const searchArea = document.querySelector("#searchArea");
    const spellsTitle = document.createElement("h2");
    const spellsDiv = document.createElement("div");
    spellsTitle.innerText = "SORTILÈGES";

    spellsTitle.id = "mySpellsTitle";
    spellsDiv.id = "mySpellsDiv";

for (let i = 0 ; i < spells.length ; i++) {
    const spell = spells[i];

    // Création d’une balise dédiée à un sortilège
    const spellCard = document.createElement("article");
    spellCard.classList.add("notsaved");
    spellCard.classList.add("card-effect");
    
    const nameSpell = document.createElement("h3");
    nameSpell.innerHTML = `${spell.name} ${spell.isForbidden ? `<i class="fa-solid fa-book-skull"></i>` : ''}`;

    const formulaSpell = document.createElement("p");
    formulaSpell.classList.add("formula");
    formulaSpell.innerHTML = spell.formula;

    const ritualSpell = document.createElement("p");
    ritualSpell.innerHTML = `${spell.isRitual ? `RITUEL` : ''}`
    ritualSpell.classList.add("ritual");

    const headerSpell = document.createElement("p");
    headerSpell.classList.add("header");
    headerSpell.innerHTML =   `<strong>Difficulté</strong>:&nbsp;${spell.difficulty > 0 ? `+${spell.difficulty}` : `${spell.difficulty}`} |   
                                <strong>Durée</strong>:&nbsp;${spell.duration}<br>
                                <strong>Portée</strong>:&nbsp;${spell.range} | 
                                <strong>Résistance</strong>:&nbsp;${spell.resistance} <br>
                                <strong>R+</strong>:&nbsp;${spell.success}`;

    const descriptionSpell = document.createElement("p");
    descriptionSpell.classList.add("description");
    descriptionSpell.innerHTML = `${spell.description}`;



    // On rattache la balise article a la section Fiches
        searchArea.appendChild(spellsTitle);
        searchArea.appendChild(spellsDiv);

        spellsDiv.appendChild(spellCard);

		spellCard.appendChild(nameSpell);
        spellCard.appendChild(formulaSpell);
        if (ritualSpell.innerHTML !== null) {
            spellCard.appendChild(ritualSpell);
        }
        spellCard.appendChild(headerSpell);
        spellCard.appendChild(descriptionSpell);

}
}

function lockingCard() {
const cards = document.querySelectorAll(".notsaved");

	for (let i = 0; i < cards.length; i++) {
		cards[i].addEventListener("click", function(event) {
            const clonedElement = cards[i].cloneNode(true);
            clonedElement.classList.add("card-effect");
            clonedElement.classList.remove("notsaved")
            const mySpellbook = document.getElementById("mySpellbook")
            mySpellbook.appendChild(clonedElement);

            clonedElement.addEventListener("click", function(event) {
                clonedElement.remove();
            })

        });   
	}
}


function userTypeFiltering() {
    
    document.getElementById('selectType').addEventListener("change", function(event) {
        theFilter();
    });
}


function userFiltering() {
    const userSearch = document.getElementById('userSearch');
    userSearch.addEventListener("input", function(event) {
        theFilter();
    });
}

function userDifficultyFiltering() {
    let difficulty = document.getElementById('difficultyOfSpell');
    let labelDifficulty = document.getElementById('labelDifficulty');
    

    difficulty.addEventListener("input", function(event) {

        switch (difficulty.value) {
            case '0': 
            labelDifficulty.innerText = `Difficulté max. : -20 `;
            difficultyFilter = -20;
            break;

            case '10': 
            labelDifficulty.innerText = `Difficulté max. : -10 `; 
            difficultyFilter = -10;
            break;

            case '20': 
            labelDifficulty.innerText = `Difficulté max. : 0`; 
            difficultyFilter = 0;
            break;

            case '30': 
            labelDifficulty.innerText = `Difficulté max. : +10 `; 
            difficultyFilter = 10;
            break;

            case '40': 
            labelDifficulty.innerText = `Difficulté max. : +20 `;
            difficultyFilter = 20;
            break;

            case '50': 
            labelDifficulty.innerText = `Difficulté max. : +30 `; 
            difficultyFilter = 30;
            break;
        }

        theFilter();

        
    });
    
}


function theFilter() {

    let magicType = document.getElementById('selectType').value ;
    data = userSearch.value.toLowerCase();

const filteredTricks = tricks.filter(function (trick) {
    return trick.alt.includes(data) || trick.name.toLowerCase().includes(data) || trick.description.toLowerCase().includes(data) ;
});

const filteredSpells = spells.filter(function (spell) {
    return spell.alt.includes(data) || spell.name.toLowerCase().includes(data) || spell.description.toLowerCase().includes(data) || spell.formula.toLowerCase().includes(data) || spell.difficulty <= difficultyFilter ;
});

    // Initialize filteredAgainTricks and filteredAgainSpells
    let filteredAgainTricks = filteredTricks;
    let filteredAgainSpells = filteredSpells;

if (magicType !== 'Tous') {
    filteredAgainTricks = filteredTricks.filter(trick => trick.type.includes(magicType));
    filteredAgainSpells = filteredSpells.filter(spell => spell.type.includes(magicType));
}

    document.querySelector("#searchArea").innerHTML = "";
    generateTricks(filteredAgainTricks);
    generateSpells(filteredAgainSpells);
    
    lockingCard();  

    if (document.querySelector("#myTricksDiv")) {
        display9articles('displayedTricks','#myTricksDiv .notsaved', 'myTricksDiv','tricks');
        displayTricks();
    }
    if (document.querySelector("#mySpellsDiv")) {
        display9articles('displayedSpells','#mySpellsDiv .notsaved', 'mySpellsDiv','spells');
        displaySpells();
    } 
}


function spellbookOnly() {
    let spellbookOnly= document.getElementById("spellbookOnly");
    
    spellbookOnly.addEventListener("change", function(event) {
        
        if (spellbookOnly.checked) {
            document.querySelector("#searchArea").innerHTML = "";
        }      
        else {
            document.querySelector("#searchArea").innerHTML = "";
            theFilter();
        }
    });
}


function noSpellbook() {
    let noSpellbook = document.getElementById("noSpellbook");
    let mySpellbookTitle = document.getElementById("mySpellbookTitle")
    let mySpellbook = document.getElementById("mySpellbook")
    
    noSpellbook.addEventListener("change", function(event) {
        
        if (noSpellbook.checked) {
            mySpellbook.classList.add("do-not-display");
            mySpellbookTitle.classList.add("do-not-display");
        } else {
            mySpellbook.classList.remove("do-not-display");
            mySpellbookTitle.classList.remove("do-not-display");
        }
    });
}

function displayTricksAndSpells() {
    
    let checkSpells = document.getElementById("checkSpells");
    let checkTricks = document.getElementById("checkTricks");

    checkTricks.addEventListener("change", function(event) {
        displayTricks(); 
    });

    checkSpells.addEventListener("change", function(event) {
        displaySpells();
    });
}


function displayTricks() {
    let checkTricks = document.getElementById("checkTricks");
    let myTricksDiv = document.querySelector("#myTricksDiv");
    let myTricksTitle = document.querySelector("#myTricksTitle");
    let button = document.getElementById('buttonArrow-tricks');
    if (!checkTricks.checked) {
        myTricksDiv.classList.add("do-not-display");
        myTricksTitle.classList.add("do-not-display");
        button.classList.add('do-not-display');
    } else {
        myTricksDiv.classList.remove("do-not-display");
        myTricksTitle.classList.remove("do-not-display");
        button.classList.remove('do-not-display');
    }
}

function displaySpells() {
    
    let checkSpells = document.getElementById("checkSpells");
    let mySpellsDiv = document.querySelector("#mySpellsDiv");
    let mySpellsTitle = document.querySelector("#mySpellsTitle");
    let button = document.getElementById('buttonArrow-spells');
    if (!checkSpells.checked) {
        mySpellsDiv.classList.add("do-not-display");
        mySpellsTitle.classList.add("do-not-display");
        button.classList.add('do-not-display');
    } else {
        mySpellsDiv.classList.remove("do-not-display");
        mySpellsTitle.classList.remove("do-not-display");
        button.classList.remove('do-not-display');
    }
}


function initialisationWeb() {

    let baliseAtouts = document.getElementById("listeAtouts")
    baliseAtouts.innerHTML = ""

    let baliseEquipement = document.getElementById("listeEquipement")
    baliseEquipement.innerHTML = ""

    let baliseGrimoireTours = document.getElementById("listeGrimoireTours")
    baliseGrimoireTours.innerHTML = ""

    let baliseGrimoireSortileges = document.getElementById("listeGrimoireSortileges")
    baliseGrimoireSortileges.innerHTML = ""

    let baliseTableGrimoire = document.getElementById("tableGrimoire")
    let baliseGrimoireh2 = document.querySelector("#tableGrimoire h2")
    let baliseGrimoireDiv = document.querySelector("#tableGrimoire div")
    baliseGrimoireTours.classList.add("do-not-display")
    baliseGrimoireSortileges.classList.add("do-not-display")
    baliseTableGrimoire.classList.add("do-not-display")
    baliseGrimoireh2.classList.add("do-not-display")
    baliseGrimoireDiv.classList.add("do-not-display")
}



function takeScreenshotWeb() {
    document.getElementById('save').addEventListener('click', function(event) {


        html2canvas(document.getElementById('content')).then(function(canvas) {
            
            // Créer un lien pour télécharger l'image
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/jpeg');

            filename = `mon-grimoire-aideBrigandyne.jpeg`;
            
            link.download = filename;

            document.body.appendChild(link);

            // Déclencher le téléchargement
            link.click();

            // Supprimer l'élément de lien
            document.body.removeChild(link);
        });

    });
}


function display9articles(displayedArray, location, buttonLocation,mode) {
    displayedArray = document.querySelectorAll(location)
    if (displayedArray.length>9) {
        for (i=9 ; i < displayedArray.length ; i++) {
            displayedArray[i].classList.add('do-not-display');
        }

        const showMore = document.createElement("button");
        showMore.innerHTML = `<i class="fa-solid fa-circle-chevron-down"></i>`;
        showMore.classList.add("card-effect")
        showMore.classList.add("show-more-button")
        const button = document.getElementById(buttonLocation);
        button.appendChild(showMore);
        showMore.id = `buttonArrow-${mode}`

        pressToShowMore(showMore, displayedArray, location);

    }
}

function pressToShowMore(button, displayedArray) {
    button.addEventListener("click", function(event) {
        let range = 0;
        for (i=9 ; i < displayedArray.length ; i++) {
            if (displayedArray[i].classList.contains('do-not-display') && range<6) {
                displayedArray[i].classList.remove('do-not-display');
                range++
            };
        }

        for (element of displayedArray) {
            if (element.classList.contains('do-not-display')) {
                pressToShowMore();
            }
        }

        button.remove();
    });
}


userFiltering();
userTypeFiltering();
userDifficultyFiltering();
generateTricks(tricks);
generateSpells(spells);
generateMySpellbook();
spellbookOnly();
noSpellbook();
displayTricksAndSpells();
takeScreenshotWeb();
display9articles('displayedTricks','#myTricksDiv .notsaved', 'myTricksDiv','tricks');
display9articles('displayedSpells','#mySpellsDiv .notsaved', 'mySpellsDiv','spells');

lockingCard();
