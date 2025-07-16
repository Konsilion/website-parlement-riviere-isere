---
hide:
  - toc
---

# Obstacles à l’écoulement sur les rivières de l’Isère

Ce tableau affiche les obstacles recensés sur l’Isère, le Drac, la Romanche et L’eau d’Olle à partir des données du Sandre.

<div id="obstacles-table">Chargement en cours...</div>

<script>
const COURS_EAU_LIST = ["Isère", "Drac", "Romanche", "Eau d'Olle"];
const WFS_URL = "https://services.sandre.eaufrance.fr/geo/obs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&typeNames=ObstEcoul_FXX&OUTPUTFORMAT=application%2Fgml%2Bxml";

async function fetchObstacles() {
    try {
        const response = await fetch(WFS_URL);
        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "application/xml");
        const features = [...xmlDoc.getElementsByTagName("obs:obstacle")];
        return features.map(obsElem => {
            const getText = tag => obsElem.getElementsByTagName(tag)[0]?.textContent ?? null;
            const pos = getText("gml:pos");
            const [x, y] = pos ? pos.split(" ") : [null, null];
            return {
                nom: getText("obs:nom"),
                type: getText("obs:type_obstacle"),
                franchissabilite: getText("obs:etat_franchissabilite"),
                coursEau: getText("obs:libelle_cours_eau"),
                x, y,
            };
        }).filter(obs =>
            obs.coursEau && COURS_EAU_LIST.some(nom => obs.coursEau.toLowerCase().includes(nom.toLowerCase()))
        );
    } catch (error) {
        console.error("Erreur lors du chargement des obstacles :", error);
        return [];
    }
}

function renderObstacleTable(data) {
    if (!data.length) {
        document.getElementById("obstacles-table").innerHTML = "<p>Aucun obstacle trouvé.</p>";
        return;
    }
    const tableHeader = `
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

    const rows = data.map(obs => `
        <tr>
                <td>${obs.nom ?? "<i>Non renseigné</i>"}</td>
                <td>${obs.type ?? "<i>Non renseigné</i>"}</td>
                <td>${obs.franchissabilite ?? "<i>Inconnu</i>"}</td>
                <td>${obs.coursEau}</td>
                <td>${obs.y ?? "-"}</td>
                <td>${obs.x ?? "-"}</td>
            </tr>
    `).join("");

    const table = `${tableHeader}${rows}</table>`;
    document.getElementById("obstacles-table").innerHTML = table;
}

// Initialisation au chargement
fetchObstacles().then(renderObstacleTable);
</script>
