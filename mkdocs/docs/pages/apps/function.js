// Functions and event handlers for the water data app

// API base URLs
const HYDRO_BASE = "https://hubeau.eaufrance.fr/api/v2/hydrometrie";
const QUAL_BASE = "https://hubeau.eaufrance.fr/api/v2/qualite_rivieres";

// On page load, fetch the list of river segments (sites) for Isère and Drac
document.addEventListener("DOMContentLoaded", () => {
  fetchSites();
  document.getElementById("segmentSelect").addEventListener("change", onSegmentChange);
});

// Fetch hydrometric sites for Isère and Drac and populate the dropdown
function fetchSites() {
  const select = document.getElementById("segmentSelect");
  // API call to list sites (tronçons) with river name filter
  const url = `${HYDRO_BASE}/sites?libelle_cours_eau=Isère,Drac&fields=code_site,libelle_site,libelle_cours_eau,latitude_site,longitude_site&size=5000`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      select.innerHTML = "";
      if (data && data.data) {
        // Sort sites by river name then by site name for better grouping
        data.data.sort((a, b) => {
          if (a.libelle_cours_eau < b.libelle_cours_eau) return -1;
          if (a.libelle_cours_eau > b.libelle_cours_eau) return 1;
          // same river, sort by libelle_site
          return a.libelle_site.localeCompare(b.libelle_site);
        });
        // Group by river for optgroup (optional)
        let currentRiver = "";
        let optgroup = null;
        data.data.forEach(site => {
          if (site.libelle_cours_eau !== currentRiver) {
            currentRiver = site.libelle_cours_eau;
            optgroup = document.createElement("optgroup");
            optgroup.label = currentRiver;
            select.appendChild(optgroup);
          }
          const option = document.createElement("option");
          option.value = site.code_site;
          option.textContent = site.libelle_site;
          // store extra data in dataset for later use
          option.dataset.river = site.libelle_cours_eau;
          option.dataset.lat = site.latitude_site;
          option.dataset.lon = site.longitude_site;
          optgroup.appendChild(option);
        });
        // Add a default prompt option
        select.insertAdjacentHTML("afterbegin", '<option value="">-- Choisir un tronçon --</option>');
      } else {
        select.innerHTML = '<option value="">(Aucun tronçon trouvé)</option>';
      }
    })
    .catch(error => {
      console.error("Erreur lors du chargement des tronçons :", error);
      select.innerHTML = '<option value="">(Erreur de chargement)</option>';
    });
}

// Handle selection change: fetch and display data for chosen segment
function onSegmentChange() {
  const select = document.getElementById("segmentSelect");
  const siteCode = select.value;
  if (!siteCode) return;
  // Retrieve stored data from selected option
  const option = select.selectedOptions[0];
  const riverName = option.dataset.river;
  const siteLat = parseFloat(option.dataset.lat);
  const siteLon = parseFloat(option.dataset.lon);

  // Clear previous results and indicate loading
  clearResults();
  setLoading(true);

  // Fetch hydrometric station info, then hydrometric values and quality data
  getHydroStation(siteCode)
    .then(station => {
      if (!station) throw new Error("Aucune station hydrométrique trouvée pour ce tronçon.");
      const stationCode = station.code_station;
      const stationName = station.libelle_station;
      // Update links for hydrometric data (point to hydroportail)
      const hydroLink = `https://www.hydro.eaufrance.fr/stationhydro/${stationCode}/synthese`;
      document.getElementById("linkQinst").href = hydroLink;
      document.getElementById("linkQdaily").href = hydroLink;
      // Now fetch hydrometric values and quality station/values in parallel
      return Promise.all([
        getHydroValues(stationCode),
        getQualityStationAndValues(siteLat, siteLon, riverName)
      ]);
    })
    .then(([hydroData, qualData]) => {
      // Update hydrometric results
      if (hydroData) {
        updateHydroResult("Qinst", hydroData.instant);
        updateHydroResult("Qdaily", hydroData.daily);
      }
      // Update quality results
      if (qualData) {
        updateQualityResults(qualData);
      }
    })
    .catch(error => {
      console.error("Erreur lors de la récupération des données :", error);
      alert("Erreur lors de la récupération des données pour ce tronçon.");
    })
    .finally(() => {
      setLoading(false);
    });
}

// Fetch the hydrometric station(s) associated with a given site (tronçon)
function getHydroStation(siteCode) {
  const url = `${HYDRO_BASE}/stations?code_site=${siteCode}&fields=code_station,libelle_station,latitude_station,longitude_station&size=10`;
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data && data.data && data.data.length > 0) {
        // Choose the first station (closest or main station for that site)
        return data.data[0];
      }
      return null;
    })
    .catch(err => {
      console.error("Erreur getHydroStation:", err);
      return null;
    });
}

// Fetch the latest hydrometric values (instantaneous flow and daily mean flow) for a station
function getHydroValues(stationCode) {
  // Build URLs for instantaneous and daily flow
  const instUrl = `${HYDRO_BASE}/observations_tr?code_station=${stationCode}&grandeur_hydro=Q&size=1`;
  // For daily mean, get last 7 days to ensure we have at least one (latest)
  const today = new Date();
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const weekAgoStr = weekAgo.toISOString().slice(0, 10);
  const dailyUrl = `${HYDRO_BASE}/obs_elab?code_entite=${stationCode}&grandeur_hydro_elab=QmnJ&date_debut_obs_elab=${weekAgoStr}`;
  return Promise.all([
    fetch(instUrl).then(r => r.json()).catch(err => {console.error("Erreur fetch Q inst:", err); return null;}),
    fetch(dailyUrl).then(r => r.json()).catch(err => {console.error("Erreur fetch Q daily:", err); return null;})
  ]).then(([instData, dailyData]) => {
    const result = { instant: null, daily: null };
    if (instData && instData.data && instData.data.length > 0) {
      const obs = instData.data[0];
      result.instant = {
        value: obs.resultat_obs,
        // Instantaneous flow unit presumably m3/s; confirm if not present in data:
        unit: obs.unite || "m³/s",
        datetime: obs.date_obs
      };
    }
    if (dailyData && dailyData.data && dailyData.data.length > 0) {
      // Find the entry with latest date_obs_elab
      let latestObs = dailyData.data[0];
      dailyData.data.forEach(obs => {
        if (obs.date_obs_elab > latestObs.date_obs_elab) {
          latestObs = obs;
        }
      });
      result.daily = {
        value: latestObs.resultat_obs_elab,
        unit: latestObs.unite || "m³/s",
        datetime: latestObs.date_obs_elab
      };
    }
    return result;
  });
}

// Find the nearest water quality station to the given coordinates (on the same river if possible), and fetch the latest values for required parameters
function getQualityStationAndValues(lat, lon, riverName) {
  // Define a helper to query station_pc with given distance and optional river filter
  const queryQualityStations = (distanceKm, filterRiver = true) => {
    let url = `${QUAL_BASE}/station_pc?latitude=${lat}&longitude=${lon}&distance=${distanceKm}`;
    if (filterRiver && riverName) {
      // Use nom_cours_eau filter (case sensitive exact match on name)
      url += `&nom_cours_eau=${encodeURIComponent(riverName)}`;
    }
    url += `&fields=code_station,libelle_station,longitude,latitude&size=20`;
    return fetch(url).then(r => r.json());
  };

  // Try with 5 km on same river, then broaden or remove filter if needed
  return queryQualityStations(5, true)
    .then(data => {
      let stations = (data && data.data) ? data.data : [];
      if (stations.length === 0) {
        // Try larger radius on same river
        return queryQualityStations(15, true);
      }
      return { data: stations };
    })
    .then(data => {
      // If data is an object with .data property, we came from first branch
      // If from second, data is fetch promise result
      if (data.data !== undefined) {
        // Already have stations
        return data;
      }
      return data; // This would be second fetch result
    })
    .then(result => {
      let stations = result.data || [];
      if (stations.length === 0) {
        // No station found on same river, try without river filter
        return queryQualityStations(10, false).then(res => ({ data: res.data || [] }));
      }
      return { data: stations };
    })
    .then(finalRes => {
      const stations = finalRes.data;
      if (!stations || stations.length === 0) {
        throw new Error("Aucune station qualité trouvée à proximité.");
      }
      // Determine nearest station by computing distance
      let nearest = stations[0];
      let minDistSq = distanceSquared(lat, lon, nearest.latitude, nearest.longitude);
      for (let st of stations) {
        const d2 = distanceSquared(lat, lon, st.latitude, st.longitude);
        if (d2 < minDistSq) {
          minDistSq = d2;
          nearest = st;
        }
      }
      const qualStationCode = nearest.code_station;
      const qualStationName = nearest.libelle_station;
      // Update the link for "Station qualité" references
      const idUrl = `https://id.eaufrance.fr/StationQualiteRivieres/${qualStationCode}`;
      // Update all quality station links
      const qualLinks = document.querySelectorAll('#quality a');
      qualLinks.forEach(a => a.href = idUrl);
      // Fetch the quality values for required parameters at this station
      return getQualityValues(qualStationCode);
    })
    .catch(err => {
      console.warn("Erreur recherche station qualité :", err);
      return null;
    });
}

// Fetch latest values for all required quality parameters at a given station
function getQualityValues(stationCode) {
  // Parameter codes and identifiers for which we want data
  const params = [
    { code: "1301", key: "Temp" },  // Température de l'eau
    { code: "1305", key: "MES" },   // Matières en suspension
    { code: "1337", key: "Chl" },   // Chlorures
    { code: "1313", key: "DBO" },   // DBO5 (Demande Biochimique O2 5j)
    { code: "1311", key: "O2" },    // Oxygène dissous
    { code: "1302", key: "PH" }     // pH
  ];
  // We will fetch each param's latest analysis
  const fetchPromises = params.map(param => {
    const url = `${QUAL_BASE}/analyse_pc?code_station=${stationCode}&code_parametre=${param.code}&size=1&sort=desc`;
    return fetch(url)
      .then(r => r.json())
      .then(data => {
        let result = null;
        if (data && data.data && data.data.length > 0) {
          const rec = data.data[0];
          result = {
            value: rec.resultat,
            unit: rec.symbole_unite || "", 
            datetime: combineDateTime(rec.date_prelevement, rec.heure_prelevement)
          };
        }
        return { key: param.key, data: result };
      })
      .catch(err => {
        console.error(`Erreur fetch param ${param.code}:`, err);
        return { key: param.key, data: null };
      });
  });
  // Handle the special "Autoconsommation O2 48h" parameter by libelle (if present)
  const autoPromise = (() => {
    const autoUrl = `${QUAL_BASE}/analyse_pc?code_station=${stationCode}&libelle_parametre=Autoconsommation&date_debut_prelevement=${oneYearAgo()}&size=100`;
    return fetch(autoUrl)
      .then(r => r.json())
      .then(data => {
        let result = null;
        if (data && data.data && data.data.length > 0) {
          // Find most recent by date_prelevement
          let latest = data.data[0];
          data.data.forEach(rec => {
            if (rec.date_prelevement > latest.date_prelevement) {
              latest = rec;
            }
          });
          result = {
            value: latest.resultat,
            unit: latest.symbole_unite || "",
            datetime: combineDateTime(latest.date_prelevement, latest.heure_prelevement)
          };
        }
        return { key: "Auto", data: result };
      })
      .catch(err => {
        console.error("Erreur fetch Autoconsommation O2 48h:", err);
        return { key: "Auto", data: null };
      });
  })();
  fetchPromises.push(autoPromise);

  // Execute all fetches in parallel and assemble results into an object
  return Promise.all(fetchPromises).then(resultsArray => {
    const resultsObj = {};
    resultsArray.forEach(item => {
      resultsObj[item.key] = item.data;
    });
    return resultsObj;
  });
}

// Utility: clear previous displayed values
function clearResults() {
  const valueSpans = document.querySelectorAll("#results .value, #results .unit, #results .datetime");
  valueSpans.forEach(span => {
    span.textContent = span.classList.contains("unit") ? "" : "-";
  });
}

// Utility: set loading state (e.g., disable dropdown and indicate loading)
function setLoading(isLoading) {
  const select = document.getElementById("segmentSelect");
  select.disabled = isLoading;
  if (isLoading) {
    select.style.opacity = "0.6";
  } else {
    select.style.opacity = "1";
  }
}

// Update the displayed hydrometric data for a given key ("Qinst" or "Qdaily")
function updateHydroResult(key, data) {
  if (!data) {
    // If no data available
    document.getElementById(`val${key}`).textContent = "N/A";
    document.getElementById(`unit${key}`).textContent = "";
    document.getElementById(`time${key}`).textContent = "";
  } else {
    // Format date/time to locale
    const dt = formatDateTime(data.datetime);
    document.getElementById(`val${key}`).textContent = (data.value !== null) ? data.value : "N/A";
    document.getElementById(`unit${key}`).textContent = data.unit || "";
    document.getElementById(`time${key}`).textContent = dt ? `(${dt})` : "";
  }
}

// Update the displayed quality data for all parameters
function updateQualityResults(results) {
  // List of keys corresponding to element IDs
  const keys = {
    Temp: "Temp",
    MES: "MES",
    Chl: "Chl",
    DBO: "DBO",
    O2: "O2",
    Auto: "Auto",
    PH: "PH"
  };
  for (let key in keys) {
    const data = results ? results[key] : null;
    const valSpan = document.getElementById(`val${keys[key]}`);
    const unitSpan = document.getElementById(`unit${keys[key]}`);
    const timeSpan = document.getElementById(`time${keys[key]}`);
    if (!data) {
      valSpan.textContent = "N/A";
      unitSpan.textContent = "";
      timeSpan.textContent = "";
    } else {
      valSpan.textContent = (data.value !== null) ? data.value : "N/A";
      unitSpan.textContent = data.unit || "";
      const dt = data.datetime ? formatDateTime(data.datetime) : "";
      timeSpan.textContent = dt ? `(${dt})` : "";
    }
  }
}

// Helper: format ISO date-time string or combined date-time to a readable format (dd/mm/yyyy HH:MM)
function formatDateTime(dateTimeStr) {
  if (!dateTimeStr) return "";
  const d = new Date(dateTimeStr);
  if (isNaN(d.getTime())) return dateTimeStr; // if parsing fails, return original
  // Format date in French locale
  return d.toLocaleString("fr-FR", { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

// Helper: combine date and time strings into ISO datetime string (assuming local time)
function combineDateTime(dateStr, timeStr) {
  if (!dateStr) return "";
  if (!timeStr) {
    return dateStr;
  }
  // Combine into "YYYY-MM-DDTHH:MM:SS" (assuming local time)
  return `${dateStr}T${timeStr}`;
}

// Helper: compute squared distance between two lat-lon points (for relative comparison)
function distanceSquared(lat1, lon1, lat2, lon2) {
  const dLat = (lat2 - lat1) * Math.PI/180;
  const dLon = (lon2 - lon1) * Math.PI/180;
  // Use approximate radius
  const R = 6371e3; // radius in meters
  const phi1 = lat1 * Math.PI/180;
  const phi2 = lat2 * Math.PI/180;
  const a = Math.sin(dLat/2)**2 + Math.cos(phi1)*Math.cos(phi2)*Math.sin(dLon/2)**2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const dist = R * c;
  // squared (but no need to sqrt for comparison)
  return dist * dist;
}

// Helper: get date string for one year ago today
function oneYearAgo() {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 1);
  return d.toISOString().slice(0, 10);
}
