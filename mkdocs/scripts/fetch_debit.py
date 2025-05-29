import requests

# URL de l'API HubEau pour les observations de l'hydrométrie
url = "http://hubeau.eaufrance.fr/api/v2/hydrometrie/observations_tr"

# Paramètres pour obtenir le dernier débit observé à la station W141001001
params = {
    "code_entite": "W141001001",  # Utilisez "code_entite" au lieu de "code_station"
    "grandeur_hydro": "Q",  # Q pour le débit
    "size": 1  # Obtenir seulement le dernier enregistrement
}

# En-têtes HTTP incluant un User-Agent explicite
headers = {
    "User-Agent": "Mozilla/5.0 (compatible; ParlementIsereBot/1.0; +https://parlement-isere.org)"
}

try:
    # Requête HTTP GET
    response = requests.get(url, params=params, headers=headers)

    # Lève une erreur explicite si la requête échoue
    response.raise_for_status()

    # Conversion de la réponse JSON
    data = response.json()

    # Affichage des données pour débogage ou extraction d’informations spécifiques
    print(data)

except requests.exceptions.RequestException as e:
    print(f"Une erreur s'est produite lors de la requête: {e}")
