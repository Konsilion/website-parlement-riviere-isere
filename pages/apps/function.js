const lat = 45.191594;
const lon = 5.701610;

document.addEventListener('DOMContentLoaded', () => {
    fetchHydro();
    fetchQuality();
});

async function fetchHydro() {
    const stations = await fetch(`https://hubeau.eaufrance.fr/api/v2/hydrometrie/stations?latitude=${lat}&longitude=${lon}&distance=10&size=1`)
        .then(r => r.json());

    if (!stations?.data?.length) return;

    const station = stations.data[0].code_station;

    const inst = await fetch(`https://hubeau.eaufrance.fr/api/v2/hydrometrie/observations_tr?code_station=${station}&grandeur_hydro=Q&size=1`).then(r => r.json());
    const instVal = inst?.data?.[0]?.resultat_obs;
    const instDate = inst?.data?.[0]?.date_obs;
    document.getElementById('instantFlow').textContent = `Débit instantané : ${instVal ?? '-'} m³/s (${formatDate(instDate)})`;

    const daily = await fetch(`https://hubeau.eaufrance.fr/api/v2/hydrometrie/obs_elab?code_entite=${station}&grandeur_hydro_elab=QmnJ&size=1`).then(r => r.json());
    const dailyVal = daily?.data?.[0]?.resultat_obs_elab;
    const dailyDate = daily?.data?.[0]?.date_obs_elab;
    document.getElementById('dailyFlow').textContent = `Débit moyen journalier : ${dailyVal ?? '-'} m³/s (${formatDate(dailyDate)})`;
}

async function fetchQuality() {
    const stations = await fetch(`https://hubeau.eaufrance.fr/api/v2/qualite_rivieres/station_pc?latitude=${lat}&longitude=${lon}&distance=10&size=1`)
        .then(r => r.json());

    if (!stations?.data?.length) return;

    const station = stations.data[0].code_station;

    const params = [
        { id: 'temperature', code: 1301 },
        { id: 'mes', code: 1305 },
        { id: 'chlorures', code: 1337 },
        { id: 'dbo5', code: 1313 },
        { id: 'o2', code: 1311 },
        { id: 'ph', code: 1302 }
    ];

    for (const p of params) {
        const res = await fetch(`https://hubeau.eaufrance.fr/api/v2/qualite_rivieres/analyse_pc?code_station=${station}&code_parametre=${p.code}&size=1`).then(r => r.json());
        const val = res?.data?.[0]?.resultat;
        const date = res?.data?.[0]?.date_prelevement;
        document.getElementById(p.id).textContent = `${p.id.toUpperCase()} : ${val ?? '-'} (${formatDate(date)})`;
    }
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('fr-FR');
}
