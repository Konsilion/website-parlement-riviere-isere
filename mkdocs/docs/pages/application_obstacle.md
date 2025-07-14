---
hide:
  - toc
---

# Obstacles à l’écoulement sur les rivières de l’Isère

Ce tableau affiche les obstacles recensés sur l’Isère, le Drac, la Romanche et L’eau d’Olle à partir des données du Sandre.

<div id="obstacles-table">Chargement en cours...</div>

<script>
// Liste des cours d'eau ciblés (adapter au libellé exact du Sandre)
const coursEauList = ["Isère", "Drac", "Romanche", "Eau d'Olle"];

// URL WFS corrigée pour le service Sandre (typo de couche ObstEcoul_FXX)
const WFS_URL = "https://services.sandre.eaufrance.fr/geo/obs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&typeNames=ObstEcoul_FXX&OUTPUTFORMAT=application%2Fgml%2Bxml";

async function fetchObstacles() {
    try {
        const response = await fetch(WFS_URL);
        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "application/xml");

        // Sélection des éléments <obs:obstacle> dans la réponse WFS
        const features = [...xmlDoc.getElementsByTagName("obs:obstacle")];
        const obstacles = features.map(obsElem => {
            const getText = tag => {
                const el = obsElem.getElementsByTagName(tag)[0];
                return el ? el.textContent : null;
            };
            return {
                nom: getText("obs:nom"),
                type: getText("obs:type_obstacle"),
                franchissabilite: getText("obs:etat_franchissabilite"),
                coursEau: getText("obs:libelle_cours_eau"),
                x: getText("gml:pos")?.split(" ")[0] ?? null,
                y: getText("gml:pos")?.split(" ")[1] ?? null,
            };
        });

        // Filtrer par cours d’eau
        const filtres = coursEauList.map(nom => nom.toLowerCase());
        const obstaclesFiltres = obstacles.filter(obs =>
            obs.coursEau && filtres.some(n => obs.coursEau.toLowerCase().includes(n))
        );

        return obstaclesFiltres;
    } catch (error) {
        console.error("Erreur lors du chargement des obstacles :", error);
        return [];
    }
}

function renderObstacleTable(data) {
    if (data.length === 0) {
        document.getElementById("obstacles-table").innerHTML = "<p>Aucun obstacle trouvé.</p>";
        return;
    }
    let table = `
        <table border="1">
            <tr style="background-color: #8d0303; color: white;">
                <th>Nom</th>
                <th>Type</th>
                <th>Franchissabilité</th>
                <th>Cours d’eau</th>
                <th>Latitude</th>
                <th>Longitude</th>
            </tr>
    `;
    for (const obs of data) {
        table += `
            <tr>
                <td>${obs.nom ?? "<i>Non renseigné</i>"}</td>
                <td>${obs.type ?? "<i>Non renseigné</i>"}</td>
                <td>${obs.franchissabilite ?? "<i>Inconnu</i>"}</td>
                <td>${obs.coursEau}</td>
                <td>${obs.y ?? "-"}</td>
                <td>${obs.x ?? "-"}</td>
            </tr>
        `;
    }
    table += `</table>`;
    document.getElementById("obstacles-table").innerHTML = table;
}

// Initialisation au chargement
fetchObstacles().then(renderObstacleTable);
</script>
