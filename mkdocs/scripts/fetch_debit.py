# scripts/fetch_debit.py
import requests
import datetime

CODE_STATION = "W141001001"  # Remplace par le code réel
URL = f"https://hubeau.eaufrance.fr/api/v1/hydrometrie/observations_tr?code_station={CODE_STATION}&grandeur_hydro=Q&size=1"

def fetch_and_save():
    try:
        r = requests.get(URL)
        r.raise_for_status()
        data = r.json()["data"][0]

        debit = data["resultat_obs"]
        date = data["date_obs"]

        # Contenu Markdown généré
        md = f"""# Débit de l'Isère

Dernière mesure disponible :

- **Débit** : {debit} L/s  
- **Date** : {datetime.datetime.fromisoformat(date).strftime('%d/%m/%Y à %Hh%M')}

_Données issues de [hubeau.eaufrance.fr](https://hubeau.eaufrance.fr/)_
"""
        with open("docs/debit_isere.md", "w") as f:
            f.write(md)

    except Exception as e:
        print(f"Erreur : {e}")

if __name__ == "__main__":
    fetch_and_save()
