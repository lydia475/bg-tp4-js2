"use strict"; // Active le mode strict (cours : slide 51)

// Compteur du nombre de lignes insérées (cours : slide 51 — let ; slide 37 — type number)
let lignes = 0;

// Somme des points de toutes les lignes, initialisée à 0 (cours : slide 51 — let ; slide 37 — type number)
let total_points = 0;

// Tableau d'objets {nom, prenom, points} (cours : slide 38 — tableaux ; slides 39-40 — objets ; slide 51 — const)
const persons = [
    { nom: "nom-1", prenom: "prenom-1", points: 5 },
    { nom: "nom-2", prenom: "prenom-2", points: 10 },
    { nom: "nom-3", prenom: "prenom-3", points: 15 }
];

// Insère UNE ligne dans le tableau HTML (cours : slide 45 — fonction avec paramètres)
function doInsertRowTable(num, nom, prenom, points) {
    // Récupère le tableau (cours : slides 76-78 — querySelector)
    const table = document.querySelector("#table_container table");
    // Crée une ligne <tr> (cours : slide 104 — createElement)
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

    // Case à cocher (cours : slide 104 ; slides 106-107 ; slides 97-98)
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

// Ajoute une personne dans le tableau HTML et met à jour le résumé (cours : slide 45 — fonction)
function doInsert(nom, prenom, points) {
    // Ajoute les points de la personne au total (cours : slide 41 — opérateur combiné +=)
    total_points += points;
    // Incrémente le compteur de lignes (cours : slide 41 — opérateur ++)
    lignes++;
    // Numéro de la nouvelle ligne (cours : slide 51 — const)
    const num = lignes;
    // Crée la ligne dans le DOM (cours : slide 45 — appel de fonction)
    doInsertRowTable(num, nom, prenom, points);
    // Rafraîchit le résumé sous le tableau (cours : slide 45 — appel de fonction)
    update_summary();
}

// Met à jour l'espace "Résumé" sous le tableau (cours : slide 45 — fonction)
function update_summary() {
    // Récupère les paragraphes par leur id (cours : slides 61-64 — getElementById)
    const element_lignes = document.getElementById("p1");
    const element_points = document.getElementById("p3");
    // Change le texte affiché (cours : slides 90-91 — innerText)
    // Le "+" colle un nombre et du texte (concaténation : hors cours, notion de base)
    element_lignes.innerText = lignes + " ligne(s)";
    element_points.innerText = "Total point(s)= " + total_points;
}

// Remplit le tableau HTML à partir de "persons" (cours : slide 45 — fonction)
function init() {
    // Boucle for..of (cours : slide 44)
    for (const person of persons) {
        // Accès aux propriétés de l'objet (cours : slide 39 — objets)
        doInsert(person.nom, person.prenom, person.points);
    }
}

// Bouton "Console Tableau" : onclick dans index.html (cours : slides 129-135)
function consoleTableau() {
    // Affiche "persons" dans la console (cours : slide 33 — console.log)
    console.log(persons);
}

// Appel de init() au chargement, placé à la fin (cours : slide 33 — exécution de haut en bas ; slides 23-26 — script en bas du body)
init();