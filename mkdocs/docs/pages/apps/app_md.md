# Suivi Baignade – Spot fixe Drac

## Station Débit (W283201102)

<div id="table-debit">Chargement...</div>

## Station Qualité (06146500)

<div id="table-qualite">Chargement...</div>

<script>
// Configuration fixe
const stationDebit = "W283201102";
const stationQualite = "06146500";

// Utilitaire date lisible
function fmt(date) {
    return date ? new Date(date).toLocaleDateString("fr-FR") : "-";
}

// Récupération données API générique
async function fetchAPI(url) {
    try {
        const r = await fetch(url);
        const j = await r.json();
        return j.data || [];
    } catch (e) {
        console.error("Erreur API:", e);
        return [];
    }
}

// Débits : instantané, journalier, mensuel
async function loadDebit() {
    const [instant, daily, monthly] = await Promise.all([
        fetchAPI(`https://hubeau.eaufrance.fr/api/v2/hydrometrie/observations_tr?code_station=${stationDebit}&grandeur_hydro=Q&size=1`),
        fetchAPI(`https://hubeau.eaufrance.fr/api/v2/hydrometrie/obs_elab?code_entite=${stationDebit}&grandeur_hydro_elab=QmnJ&size=1`),
        fetchAPI(`https://hubeau.eaufrance.fr/api/v2/hydrometrie/obs_elab?code_entite=${stationDebit}&grandeur_hydro_elab=QmnM&size=1`)
    ]);

    const val = (d) => d.length ? d[0].resultat_obs ?? d[0].resultat_obs_elab : "-";
    const date = (d) => d.length ? fmt(d[0].date_obs ?? d[0].date_obs_elab) : "-";

    document.getElementById("table-debit").innerHTML = `
    <table>
      <tr><th>Type</th><th>Valeur (m³/s)</th><th>Date</th></tr>
      <tr><td>Instantané</td><td>${val(instant)}</td><td>${date(instant)}</td></tr>
      <tr><td>Moyenne journalière</td><td>${val(daily)}</td><td>${date(daily)}</td></tr>
      <tr><td>Moyenne mensuelle</td><td>${val(monthly)}</td><td>${date(monthly)}</td></tr>
    </table>`;
}

// Qualité physico-chimique : instantané, mensuel, annuel
async function loadQualite() {
    const all = await fetchAPI(`https://hubeau.eaufrance.fr/api/v2/qualite_rivieres/analyse_pc?code_station=${stationQualite}&size=500`);

    // Extraire paramètres mesurés
    const params = [...new Set(all.map(d => d.libelle_parametre))];

    let rows = `<tr><th>Paramètre</th><th>Dernière valeur</th><th>Moyenne mensuelle</th><th>Moyenne annuelle</th></tr>`;

    for (let param of params) {
        const [lastVal, mois, annee] = await Promise.all([
            fetchAPI(`https://hubeau.eaufrance.fr/api/v2/qualite_rivieres/analyse_pc?code_station=${stationQualite}&libelle_parametre=${encodeURIComponent(param)}&size=1&sort=desc`),
            fetchAPI(`https://hubeau.eaufrance.fr/api/v2/qualite_rivieres/statistiques_pc?code_station=${stationQualite}&libelle_parametre=${encodeURIComponent(param)}&type_stat=mois&size=1`),
            fetchAPI(`https://hubeau.eaufrance.fr/api/v2/qualite_rivieres/statistiques_pc?code_station=${stationQualite}&libelle_parametre=${encodeURIComponent(param)}&type_stat=annee&size=1`)
        ]);

        const val = lastVal.length ? `${lastVal[0].resultat} ${lastVal[0].symbole_unite}` : "-";
        const date = lastVal.length ? fmt(lastVal[0].date_prelevement) : "-";

        const valMois = mois.length ? `${mois[0].valeur_statistique} ${mois[0].symbole_unite}` : "-";
        const dateMois = mois.length ? fmt(mois[0].date_statistique) : "-";

        const valAnnee = annee.length ? `${annee[0].valeur_statistique} ${annee[0].symbole_unite}` : "-";
        const dateAnnee = annee.length ? fmt(annee[0].date_statistique) : "-";

        rows += `<tr>
          <td>${param}</td>
          <td>${val}<br><i>${date}</i></td>
          <td>${valMois}<br><i>${dateMois}</i></td>
          <td>${valAnnee}<br><i>${dateAnnee}</i></td>
        </tr>`;
    }

    document.getElementById("table-qualite").innerHTML = `<table>${rows}</table>`;
}

loadDebit();
loadQualite();
</script>
