import requests

# URL de l'API Hubeau
url = "https://hubeau.eaufrance.fr/api/v2/hydrometrie/observations_tr"

# Paramètres pour obtenir le dernier débit observé à la station W141001001 (Isère à Grenoble)
params = {
    "code_station": "W141001001",
    "grandeur_hydro": "Q",
    "size": 1
}

# En-têtes HTTP incluant un User-Agent explicite (important pour éviter les erreurs 403)
headers = {
    "User-Agent": "Mozilla/5.0 (compatible; ParlementIsereBot/1.0; +https://parlement-isere.org)"
}

# Requête HTTP GET
response = requests.get(url, params=params, headers=headers)

# Lève une erreur explicite si la requête échoue
response.raise_for_status()

# Conversion de la réponse JSON
data = response.json()

# Affichage pour débogage ou extraction d’informations spécifiques
print(data)
