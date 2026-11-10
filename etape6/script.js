"use strict"; // Active le mode strict (cours : slide 51)

// Compteur du nombre de lignes insérées (cours : slide 51 — let ; slide 37 — number)
let lignes = 0;

// Somme des points de toutes les lignes (cours : slide 51 — let ; slide 37 — number)
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

    // [Fonctionnalité 8] colore la cellule Points selon la valeur (voir colorPoints plus bas)
    colorPoints(col4, points);

    // Assemble la ligne puis l'ajoute au tableau (cours : slides 97-98 — append)
    row.append(col1, col2, col3, col4, col5);
    table.append(row);
}

// Ajoute une personne dans le tableau HTML et met à jour le résumé (cours : slide 45 — fonction)
function doInsert(nom, prenom, points) {
    // Ajoute les points au total (cours : slide 41 — opérateur combiné +=)
    total_points += points;
    // Incrémente le compteur de lignes (cours : slide 41 — opérateur ++)
    lignes++;
    // Numéro de la nouvelle ligne (cours : slide 51 — const)
    const num = lignes;
    // Crée la ligne dans le DOM (cours : slide 45 — appel de fonction)
    doInsertRowTable(num, nom, prenom, points);
    // Rafraîchit le résumé (cours : slide 45 — appel de fonction)
    update_summary();
}

// Met à jour l'espace "Résumé" sous le tableau (cours : slide 45 — fonction)
function update_summary() {
    // Récupère les paragraphes par leur id (cours : slides 61-64 — getElementById)
    const element_lignes = document.getElementById("p1");
    const element_stats = document.getElementById("p2");   // zone du milieu (vide avant l'étape 6)
    const element_points = document.getElementById("p3");
    // Change le texte affiché (cours : slides 90-91 — innerText ; concaténation "+" : hors cours, notion de base)
    element_lignes.innerText = lignes + " ligne(s)";
    element_points.innerText = "Total point(s)= " + total_points;

    // ---- [Fonctionnalité 7] Statistiques : moyenne + meilleur score ----
    // Si le tableau est vide on efface la zone (cours : slide 42 — if/else ; slide 41 — ===)
    if (persons.length === 0) {
        element_stats.innerText = "";
    } else {
        // Moyenne = total / nombre de personnes (cours : slide 41 — opérateur / ; toFixed(2) = 2 décimales : hors cours)
        const moyenne = total_points / persons.length;
        // map() transforme "persons" en tableau de points seulement (cours : slide 38 — map)
        const tousPoints = persons.map(p => p.points);
        // Plus grand nombre du tableau (Math.max + reduce : slide 38 — reduce avec valeur initiale)
        const maxPoints = tousPoints.reduce((acc, val) => Math.max(acc, val), tousPoints[0]);
        // find() retourne le 1er élément qui satisfait la condition (cours : slide 38 — find + fonction fléchée slide 46)
        const meilleur = persons.find(p => p.points === maxPoints);
        element_stats.innerText = "Moyenne = " + moyenne.toFixed(2) +
            "  |  Meilleur : " + meilleur.prenom + " " + meilleur.nom + " (" + maxPoints + ")";
    }
}

// Remplit le tableau HTML à partir de "persons" (cours : slide 45 — fonction)
function init() {
    // Boucle for..of (cours : slide 44)
    for (const person of persons) {
        // Accès aux propriétés de l'objet (cours : slide 39)
        doInsert(person.nom, person.prenom, person.points);
    }
}

// Bouton "Console Tableau" : onclick dans index.html (cours : slides 129-135)
function consoleTableau() {
    // Affiche "persons" dans la console (cours : slide 33 — console.log)
    console.log(persons);
}

// Appelée par le bouton "Ajouter" (onclick dans index.html : slides 129-135) : lit le formulaire et ajoute la personne
function doNewData() {
    // Récupère les 3 champs de saisie par leur id (cours : slides 61-64 — getElementById)
    const elt_nom = document.getElementById("form_nom");
    const elt_prenom = document.getElementById("form_prenom");
    const elt_points = document.getElementById("form_points");

    // Lit le texte saisi avec "value" (cours : slides 92-93 — attributs directs) ; trim() : hors cours
    const nom = elt_nom.value.trim();
    const prenom = elt_prenom.value.trim();
    // La valeur d'un input est du TEXTE : parseInt la convertit en entier (hors cours)
    const points = parseInt(elt_points.value);

    // Vérifie qu'aucun champ n'est vide (cours : slide 42 — if/else ; slide 41 — === et ||)
    // Number.isNaN : hors cours
    if (nom === "" || prenom === "" || Number.isNaN(points)) {
        alert("Formulaire incomplet !"); // (cours : slide 116 — alert)
    } else {
        // ÉTAPE 6 : on ajoute d'abord dans "persons" (cours : slide 38 — push), PUIS dans le DOM,
        // sinon update_summary() (appelée dans doInsert) calculerait les statistiques sans la nouvelle personne.
        persons.push({ nom: nom, prenom: prenom, points: points });
        // Ajoute la ligne dans le tableau HTML (cours : slide 45 — appel de fonction)
        doInsert(nom, prenom, points);
        // Vide les champs et remet le curseur sur "Nom" (voir viderFormulaire)
        viderFormulaire();
        // Garde l'affichage cohérent si une recherche est en cours (fonctionnalité 4)
        applyFilter();
    }
}

// Vide les 3 champs du formulaire (utilisée par "Ajouter" et par la touche Échap, fonctionnalité 9)
function viderFormulaire() {
    const elt_nom = document.getElementById("form_nom");        // (cours : slides 61-64 — getElementById)
    document.getElementById("form_prenom").value = "";           // (cours : slides 92-93 — value)
    document.getElementById("form_points").value = "";
    elt_nom.value = "";
    // focus() remet le curseur dans le champ Nom (hors cours : le cours montre seulement l'événement focus, slide 139)
    elt_nom.focus();
}

// Appelée par le bouton "Supprimer" (onclick dans index.html : slides 129-135) : supprime les lignes cochées
function deleteRow() {
    // Étape 1 : si aucune ligne n'existe (cours : slide 42 — if)
    if (lignes === 0) {
        alert("Le tableau est vide !"); // (cours : slide 116 — alert)
        return; // (cours : slide 45 — fonctions)
    }

    // Étape 2 : récupère le tableau (cours : slides 76-78 — querySelector)
    const table = document.querySelector("#table_container table");
    // Toutes les cases cochées ; ":checked" est un sélecteur CSS (cours : slides 76-78 — querySelectorAll)
    const cochees = table.querySelectorAll(".col_chkbox input:checked");

    // Étape 3 : aucune case cochée ? (cours : slide 44 — length)
    if (cochees.length === 0) {
        alert("Sélectionnez au moins une ligne !"); // (cours : slide 116 — alert)
        return;
    }

    // Étape 4 : confirmation (confirm : hors cours, même famille que alert/prompt slide 116 ; "!" : slide 41)
    if (!confirm("Voulez-vous vraiment supprimer les lignes sélectionnées ?")) {
        return;
    }

    // Étape 5 : toutes les lignes <tr> en vrai tableau (querySelectorAll : slides 76-78 ; Array.from : hors cours)
    const rows = Array.from(table.querySelectorAll("tr"));

    // Étape 6 : de la dernière à la première ligne (cours : slide 44 — boucle for)
    // On part de la fin pour que supprimer une ligne ne décale pas les index restants
    for (let i = rows.length - 1; i >= 0; i--) {
        const row = rows[i];                                  // (cours : slide 38 — accès par index)
        const chk = row.querySelector(".col_chkbox input");   // null pour l'en-tête (cours : slides 76-78)
        // "&&" : slide 41 ; "checked" : slides 92-93
        if (chk && chk.checked) {
            // row.cells et parseInt : hors cours ; "-=" : cours slide 41
            total_points -= parseInt(row.cells[3].innerText);
            lignes--; // (cours : slide 41 — opérateur --)
            // splice : hors cours (le cours montre push/pop, slide 38) ; rowIndex-1 car l'en-tête a l'index 0
            persons.splice(row.rowIndex - 1, 1);
            row.remove(); // (cours : slides 99-100 — remove)
        }
    }

    // Renumérote la colonne N° (cours : slide 44 — forEach ; slide 47 — callback ; slides 90-91 — innerText)
    table.querySelectorAll("td.col_number:first-child").forEach(function (cell, index) {
        cell.innerText = index + 1;
    });

    // Étape 7 : message de succès (cours : slide 116 — alert)
    alert("Suppression effectuée avec succès !");
    // Met à jour le résumé (cours : slide 45 — appel de fonction)
    update_summary();
    // La case "tout sélectionner" de l'en-tête repasse à décochée (fonctionnalité 6)
    syncCheckAll();
}

// ===================== FONCTIONNALITÉS SUPPLÉMENTAIRES (étape 6) =====================
// Fonctionnalités 1 à 3 : déjà présentes. Fonctionnalités 4 à 9 : AJOUTÉES (voir index.html et style.css).

// Références réutilisées par plusieurs fonctionnalités (cours : slides 76-78 et 61-64 — querySelector / getElementById)
const tableEl = document.querySelector("#table_container table");
const searchInput = document.getElementById("search_input");   // zone de recherche (fonctionnalité 4)
const checkAll = document.getElementById("check_all");         // case "tout sélectionner" (fonctionnalité 6)

// ---- Fonctionnalité 1 : appuyer sur Entrée dans le formulaire ajoute la personne ----
// querySelectorAll renvoie tous les <input> du formulaire ; forEach les parcourt (cours : slides 76-78 ; slide 44 — forEach)
document.querySelectorAll("#form_container input").forEach(function (input) {
    // addEventListener branche une fonction sur un événement ; "keydown" = touche enfoncée (cours : slide 139 — keydown)
    input.addEventListener("keydown", function (e) {
        // "e" est l'objet événement ; e.key contient le nom de la touche (cours : slide 139 — e.key)
        if (e.key === "Enter") { // (cours : slide 42 — if ; slide 41 — ===)
            doNewData(); // Même traitement que le clic sur "Ajouter" (cours : slide 45 — appel de fonction)
        }
    });
});

// ---- Fonctionnalité 2 : surligner les lignes cochées ----
// Écoute l'événement "change" sur tout le tableau : un seul écouteur pour toutes les cases (cours : slide 139 — addEventListener)
// ("change" n'est pas dans la liste du slide 139 mais s'utilise exactement de la même façon)
tableEl.addEventListener("change", function (e) {
    // La case de l'en-tête a son propre écouteur (fonctionnalité 6) : on l'ignore ici
    if (e.target.id === "check_all") { return; }
    // e.target = élément qui a déclenché l'événement ; on ne traite que les checkbox (cours : slides 92-93 — type)
    if (e.target.type === "checkbox") {
        // closest("tr") remonte jusqu'à la ligne parente (hors cours ; équivalent de parentNode, slides 88-89)
        // classList.toggle(classe, condition) ajoute la classe si true, la retire si false (cours : slide 108 — classList.toggle)
        e.target.closest("tr").classList.toggle("row_selected", e.target.checked);
        // Met à jour la case de l'en-tête (fonctionnalité 6)
        syncCheckAll();
    }
});

// ---- Fonctionnalité 3 : modifier une personne par double-clic sur Nom, Prénom ou Points (le "U" de CRUD) ----
tableEl.addEventListener("dblclick", function (e) { // "dblclick" = double-clic (cours : slide 139 — dblclick)
    // Remonte à la cellule <td> cliquée (closest : hors cours)
    const cell = e.target.closest("td");
    // Ignore si pas de cellule, ou colonne N° (index 0) ou Select (index 4)
    // (cours : slide 41 — opérateurs || < > ; cellIndex : hors cours)
    if (!cell || cell.cellIndex < 1 || cell.cellIndex > 3) return;

    // Ligne parente de la cellule (cours : slides 88-89 — parentNode)
    const row = cell.parentElement;
    // Personne correspondante dans "persons" : rowIndex-1 car l'en-tête a l'index 0 (cours : slide 38 — accès par index)
    const person = persons[row.rowIndex - 1];
    // Correspondance index de colonne -> nom de propriété de l'objet (cours : slide 38 — tableau)
    const champs = ["", "nom", "prenom", "points"];
    const champ = champs[cell.cellIndex];

    // Demande une nouvelle valeur ; 2e argument = valeur proposée par défaut (cours : slide 116 — prompt)
    const saisie = prompt("Nouvelle valeur pour " + champ + " :", cell.innerText);
    // prompt renvoie null si "Annuler" ; on quitte aussi si le champ est vide (cours : slide 42 — if)
    if (saisie === null || saisie.trim() === "") return;

    if (champ === "points") {
        // Convertit en entier (parseInt : hors cours)
        const nouveau = parseInt(saisie);
        // Refuse une saisie qui n'est pas un nombre (Number.isNaN : hors cours)
        if (Number.isNaN(nouveau)) {
            alert("Les points doivent être un nombre !"); // (cours : slide 116 — alert)
            return;
        }
        // Ajuste le total : on ajoute la différence entre nouvelle et ancienne valeur (cours : slide 41 — +=)
        total_points += nouveau - person.points;
        // Met à jour la donnée ET l'affichage pour rester cohérent (cours : slide 39 — objet ; slides 90-91 — innerText)
        person.points = nouveau;
        cell.innerText = nouveau;
        colorPoints(cell, nouveau);   // la couleur suit la nouvelle valeur (fonctionnalité 8)
        update_summary();             // (cours : slide 45 — appel de fonction) recalcule total + statistiques
    } else {
        // Nom ou prénom : person[champ] accède à la propriété dont le nom est dans la variable "champ" (cours : slide 39 — objet)
        person[champ] = saisie.trim();
        cell.innerText = saisie.trim();
        applyFilter();                // la ligne peut ne plus correspondre à la recherche (fonctionnalité 4)
    }
});

// ---- Fonctionnalité 4 (NOUVELLE) : recherche en temps réel par nom ou prénom ----
// Masque les lignes qui ne contiennent pas le texte tapé dans la zone "Rechercher"
function applyFilter() {
    // toLowerCase : hors cours (ignorer majuscules/minuscules)
    const texte = searchInput.value.trim().toLowerCase();
    // On parcourt toutes les lignes de données : tr.row (la classe "row" vient de setAttribute, slides 106-107)
    tableEl.querySelectorAll("tr.row").forEach(function (row) { // (cours : slide 44 — forEach)
        const nom = row.cells[1].innerText.toLowerCase();
        const prenom = row.cells[2].innerText.toLowerCase();
        // includes() : le cours le montre sur les tableaux (slide 38), il existe aussi sur le texte
        if (nom.includes(texte) || prenom.includes(texte)) { // (cours : slide 41 — ||)
            // "" = on retire notre style : la ligne redevient visible (cours : slides 94-95 — style)
            row.style.display = "";
        } else {
            // "none" = ligne cachée (cours : slides 94-95 — style)
            row.style.display = "none";
        }
    });
}
// "keyup" = touche relâchée : on filtre à chaque lettre (cours : slide 139 — keyup)
// applyFilter est passée comme callback sans parenthèses (cours : slide 47 — callbacks)
searchInput.addEventListener("keyup", applyFilter);

// ---- Fonctionnalité 5 (NOUVELLE) : trier en cliquant sur les en-têtes Nom / Prénom / Points ----
let sort_champ = "";   // colonne actuellement triée (cours : slide 51 — let)
let sort_asc = true;   // true = croissant, false = décroissant (cours : slide 37 — boolean)

// Trie le tableau "persons" puis reconstruit le tableau HTML dans le nouvel ordre
function sortPersons(champ) {
    // Même colonne qu'avant : on inverse le sens ; sinon on trie en croissant (cours : slide 42 — if/else ; slide 41 — ! et ===)
    if (champ === sort_champ) {
        sort_asc = !sort_asc;
    } else {
        sort_champ = champ;
        sort_asc = true;
    }
    // sort() avec une fonction de comparaison (callback : slide 47 ; sort et localeCompare : hors cours)
    persons.sort(function (a, b) {
        let r;
        if (champ === "points") {
            r = a.points - b.points;                // nombres : on soustrait (cours : slide 41)
        } else {
            r = a[champ].localeCompare(b[champ]);   // textes : comparaison alphabétique ; a[champ] : slide 39
        }
        if (sort_asc) { return r; }
        return -r;
    });
    rebuildTable();
    // Met une flèche ▲ / ▼ sur l'en-tête trié
    // getAttribute lit un attribut du HTML (cours : slides 106-107 — getAttribute)
    tableEl.querySelectorAll("th.sortable").forEach(function (th) {
        th.innerText = th.getAttribute("data-label");
        if (th.getAttribute("data-champ") === sort_champ) {
            if (sort_asc) {
                th.innerText += " ▲";
            } else {
                th.innerText += " ▼";
            }
        }
    });
}

// Vide le tableau HTML puis le remplit de nouveau à partir de "persons" (déjà triée)
function rebuildTable() {
    // Supprime toutes les lignes de données (cours : slides 99-100 — remove)
    tableEl.querySelectorAll("tr.row").forEach(function (row) {
        row.remove();
    });
    // Remet les compteurs à zéro : init() va les recalculer (cours : slide 51 — let)
    lignes = 0;
    total_points = 0;
    init();               // (cours : slide 45 — appel de fonction)
    update_summary();     // utile aussi si le tableau est vide
    applyFilter();        // la recherche en cours reste appliquée
    checkAll.checked = false;
}

// Un seul écouteur "click" sur le tableau ; on regarde sur quel en-tête on a cliqué (cours : slide 139 — addEventListener)
tableEl.addEventListener("click", function (e) {
    const th = e.target.closest("th.sortable"); // closest : hors cours
    if (!th) { return; }
    // data-champ est un attribut qu'on a écrit dans index.html (cours : slides 106-107 — getAttribute)
    sortPersons(th.getAttribute("data-champ"));
});

// ---- Fonctionnalité 6 (NOUVELLE) : case "tout sélectionner" dans l'en-tête ----
checkAll.addEventListener("change", function () {
    tableEl.querySelectorAll("tr.row").forEach(function (row) {
        // On ne coche que les lignes visibles (celles qui ne sont pas filtrées) (cours : slides 94-95 — style)
        if (row.style.display !== "none") {
            const chk = row.querySelector(".col_chkbox input");
            chk.checked = checkAll.checked;                         // (cours : slides 92-93 — checked)
            row.classList.toggle("row_selected", checkAll.checked); // (cours : slide 108 — classList.toggle)
        }
    });
});

// Coche la case de l'en-tête seulement si TOUTES les cases des lignes sont cochées
function syncCheckAll() {
    const toutes = tableEl.querySelectorAll(".col_chkbox input");
    const cochees = tableEl.querySelectorAll(".col_chkbox input:checked");
    // length : cours slide 44 ; && : cours slide 41
    checkAll.checked = toutes.length > 0 && toutes.length === cochees.length;
}

// ---- Fonctionnalité 8 (NOUVELLE) : couleur des points (rouge < 10, vert >= 15) ----
// Les classes pts_low / pts_high sont définies dans style.css
function colorPoints(cell, points) {
    // classList.remove / classList.add (cours : slide 108)
    cell.classList.remove("pts_low", "pts_high");
    if (points < 10) {             // (cours : slide 41 — opérateur <)
        cell.classList.add("pts_low");
    } else if (points >= 15) {     // (cours : slide 42 — if...else if ; slide 41 — >=)
        cell.classList.add("pts_high");
    }
}

// ---- Fonctionnalité 9 (NOUVELLE) : champ en jaune quand il a le focus + Échap vide le formulaire ----
// Le slide 139 donne exactement cet exemple : focus -> fond jaune, blur -> fond blanc
document.querySelectorAll("#form_container input, #search_container input").forEach(function (input) {
    input.addEventListener("focus", function () {        // (cours : slide 139 — focus)
        input.style.background = "lightyellow";           // (cours : slides 94-95 — style)
    });
    input.addEventListener("blur", function () {         // (cours : slide 139 — blur)
        input.style.background = "white";
    });
});
// Touche Échap dans le formulaire = on vide les champs (cours : slide 139 — keydown, e.key)
document.querySelectorAll("#form_container input").forEach(function (input) {
    input.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            viderFormulaire();
        }
    });
});

// Appel de init() au chargement de la page : placé à la fin car tout doit être déclaré avant
// (cours : slide 33 — exécution de haut en bas ; slides 23-26 — script en bas du body)
init();s