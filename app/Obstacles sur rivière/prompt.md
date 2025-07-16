# Prompt pour application API

Le but de cette application est d'obtenir une liste des différentes informations utiles pour définir si un point des berges est baignable.

Pour cela, je veux utiliser https://hubeau.eaufrance.fr/page/apis et les API suivantes : 

- Hydrobiologie (https://hubeau.eaufrance.fr/page/api-hydrobiologie)
- Hydrométrie (https://hubeau.eaufrance.fr/page/api-hydrometrie)
- Température des cours d'eau (https://hubeau.eaufrance.fr/page/api-temperature-continu)
- Qualité des cours d'eau (https://hubeau.eaufrance.fr/page/api-qualite-cours-deau)
- Indicateurs des services (https://hubeau.eaufrance.fr/page/api-indicateurs-services)

La liste des cours d'eau que je veux étudier sont l'Isère et le Drac.

---

Au final cette application sera présente dans un dossier MkDocs et donc doit être codée en Javascript.

Du fait que ce code est très permissif et difficile à maintenir je veux structurer mon application de la manière suivante : 

- app.html (avec un script de lancement)
- function.js
- constantes.csv (toutes les données spécifiques : nom;designation;description;type)

# Application en html

Premièrement je souhaite avoir une page Web sobre et minimaliste mais élégante. Divisée en trois parties, cette page Web doit présenter les catégories d'informations suivantes :