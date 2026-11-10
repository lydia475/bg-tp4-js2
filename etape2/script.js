/* =====================================================================
   REPÈRES DU COURS  « PRAVAN – Chapitre 4 : Site Interactif JavaScript »
   (les numéros "slide N" des commentaires renvoient au PDF du cours)

   Slide 33      console.log()                 | Slide 34      innerText / alert()
   Slide 36      syntaxe + commentaires        | Slide 37      types primitifs (number, string...)
   Slide 38      tableaux : push, pop, includes, find, filter, map, reduce
   Slide 39      objets {cle: valeur}          | Slide 40      tableau d'objets
   Slide 41      opérateurs (+= -= ++ -- && || ! === < >)
   Slide 42      if ... else                   | Slide 44      boucles for, while, for..of, forEach
   Slide 45      fonctions                     | Slides 46-47  fonctions fléchées / callbacks
   Slide 51      let / const / var + mode strict
   Slides 61-64  getElementById                | Slides 76-78  querySelector(All) (sélecteur CSS)
   Slides 88-89  parentNode, children...       | Slides 90-91  innerHTML / innerText
   Slides 92-93  attributs accessibles directement (value, checked, type...)
   Slides 94-95  style (ex. style.display)     | Slides 97-98  append()
   Slides 99-100 remove()                      | Slide 104     createElement()
   Slides 106-107 setAttribute / getAttribute  | Slide 108     classList.add/remove/toggle
   Slide 116     alert() / prompt()            | Slides 129-135 onclick="..." dans le HTML
   Slide 139     addEventListener : dblclick, keydown, keyup, focus, blur...
   Slide 141     bonnes pratiques (=== au lieu de ==, let/const)

   "hors cours" = notion absente des slides (ajoutée car nécessaire) :
   parseInt, trim, Number.isNaN, confirm, splice, Array.from, closest,
   rowIndex/cells/cellIndex, sort/localeCompare, toLowerCase, toFixed, focus().
   ===================================================================== */

"use strict"; // Active le mode strict (cours : slide 51 — "on utilise le mode strict" pour signaler les variables non déclarées)

// Insère UNE ligne dans le tableau HTML
// (cours : slide 45 — fonction avec paramètres ; slide 36 — commentaires //)
function doInsertRowTable(num, nom, prenom, points) {
    // Récupère le <table> situé dans #table_container grâce à un sélecteur CSS
    // (cours : slides 76-78 — querySelector/querySelectorAll ; querySelector renvoie le 1er élément trouvé)
    const table = document.querySelector("#table_container table");

    // Crée un nouvel élément <tr> en mémoire, pas encore visible (cours : slide 104 — createElement)
    const row = document.createElement("tr");

    // Ajoute l'attribut class="row" à la ligne (cours : slides 106-107 — setAttribute)
    row.setAttribute("class", "row");

    // Crée les 5 cellules <td> : N°, Nom, Prénom, Points, Select (cours : slide 104 — createElement)
    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    const col5 = document.createElement("td");

    // Met le texte dans chaque cellule avec les paramètres (cours : slides 90-91 — innerText)
    col1.innerText = num;
    col2.innerText = nom;
    col3.innerText = prenom;
    col4.innerText = points;

    // Crée la case à cocher <input type="checkbox">
    // (cours : slide 104 — createElement ; slides 106-107 — setAttribute)
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    // Place la case à cocher dans la 5e cellule (cours : slides 97-98 — append)
    col5.append(checkbox);

    // Affecte à chaque cellule sa classe CSS (cours : slides 106-107 — setAttribute)
    col1.setAttribute("class", "col_number");
    col2.setAttribute("class", "col_text");
    col3.setAttribute("class", "col_text");
    col4.setAttribute("class", "col_number");
    col5.setAttribute("class", "col_chkbox");

    // Ajoute les 5 cellules dans la ligne, dans l'ordre (cours : slides 97-98 — append accepte plusieurs éléments)
    row.append(col1, col2, col3, col4, col5);

    // Ajoute la ligne à la fin du tableau : elle devient visible (cours : slides 97-98 — append)
    table.append(row);
}