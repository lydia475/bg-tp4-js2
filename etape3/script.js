"use strict"; // Active le mode strict (cours : slide 51)

// Compteur du nombre de lignes insérées. "let" car sa valeur va changer
// (cours : slide 51 — let pour les variables ; slide 37 — type number)
let lignes = 0;

// Tableau "persons" = liste de personnes (cours : slide 38 — les tableaux)
// "const" car on ne réassigne pas le tableau, on modifie seulement son contenu (cours : slide 51 — const)
// Chaque élément est un objet {nom, prenom, points} (cours : slide 39 — les objets ; slide 40 — tableau d'objets)
const persons = [
    { nom: "nom-1", prenom: "prenom-1", points: 5 },
    { nom: "nom-2", prenom: "prenom-2", points: 10 },
    { nom: "nom-3", prenom: "prenom-3", points: 15 }
];

// Insère UNE ligne dans le tableau HTML (cours : slide 45 — fonction avec paramètres)
function doInsertRowTable(num, nom, prenom, points) {
    // Récupère le tableau (cours : slides 76-78 — querySelector)
    const table = document.querySelector("#table_container table");
    // Crée un <tr> en mémoire (cours : slide 104 — createElement)
    const row = document.createElement("tr");
    // class="row" (cours : slides 106-107 — setAttribute)
    row.setAttribute("class", "row");

    // Crée les 5 cellules (cours : slide 104 — createElement)
    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    const col5 = document.createElement("td");

    // Texte des cellules (cours : slides 90-91 — innerText)
    col1.innerText = num;
    col2.innerText = nom;
    col3.innerText = prenom;
    col4.innerText = points;

    // Case à cocher (cours : slide 104 — createElement ; slides 106-107 — setAttribute ; slides 97-98 — append)
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    col5.append(checkbox);

    // Classes CSS (cours : slides 106-107 — setAttribute)
    col1.setAttribute("class", "col_number");
    col2.setAttribute("class", "col_text");
    col3.setAttribute("class", "col_text");
    col4.setAttribute("class", "col_number");
    col5.setAttribute("class", "col_chkbox");

    // Assemble la ligne puis l'ajoute au tableau (cours : slides 97-98 — append)
    row.append(col1, col2, col3, col4, col5);
    table.append(row);
}

// Ajoute une personne dans le tableau HTML (cours : slide 45 — fonction avec paramètres)
function doInsert(nom, prenom, points) {
    // Incrémente le compteur de lignes de 1 (cours : slide 41 — opérateur ++)
    lignes++;
    // Numéro de la nouvelle ligne = nombre de lignes actuel (cours : slide 51 — const)
    const num = lignes;
    // Crée vraiment la ligne dans le DOM (cours : slide 45 — appel de fonction)
    doInsertRowTable(num, nom, prenom, points);
}

// Remplit le tableau HTML à partir du tableau "persons" (cours : slide 45 — fonction)
function init() {
    // Boucle for..of : "person" prend successivement chaque objet de "persons" (cours : slide 44 — boucle for..of)
    for (const person of persons) {
        // Accès aux propriétés de l'objet avec le point (cours : slide 39 — objets)
        doInsert(person.nom, person.prenom, person.points);
    }
}

// Bouton "Console Tableau" : appelée par onclick="consoleTableau()" dans index.html
// (cours : slides 129-135 — onclick ; slide 45 — fonction)
function consoleTableau() {
    // console.log affiche une valeur dans la console F12 du navigateur (cours : slide 33 — console.log)
    console.log(persons);
}

// Appel de init() au chargement de la page : placé à la fin car tout doit être déclaré avant
// (cours : slide 33 — le navigateur exécute le code de haut en bas, il n'y a pas de main() ;
//  slides 23-26 — le <script> est placé en bas du <body> pour que le DOM soit déjà chargé)
init();