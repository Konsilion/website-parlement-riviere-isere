---
title: Paramétrer un catalogue
hide:
   - toc
   - navigation
---

![Retour configuration](https://raw.githubusercontent.com/Konsilion/website/master/media/fleche-retour.png){ .md-button .md-button--primary onclick="window.history.back();" style="float:right; height: 40px; padding: 5px; margin: 5px; border-radius: 50px; border: 3px solid grey;"}

# Comment paramétrer et lier des catalogues Web

=== "Paramétrer vos catalogues"

    ## Rendez-vous sur votre catalogue Web

    * <p>Depuis un ordinateur, en haut à droite de l'écran cliquez sur *Paramètrer ce catalogue*.</p>
    
    Une fois la page chargée vous pouvez Contribuer 🖊 à l'orchestration de votre catalogue Web
    
    ---
    
    ??? tip "Comprendre la structure du fichier katalog.json"
    
        description
    
=== "Lier des catalogues externes"
    
    <p></p>
    === "Étape 1"
    
        ## Récupération de l'adresse d'origine

        Rendez-vous sur le catalogue Web externe et juste à droite, non loin du titre du catalogue principal que vous souhaitez importer:

        * cliquez sur ℹ,

        * retenez l'**URL du fichier**,

        dans les paramètres de votre catalogue ceci correspond à `url_csv`

    === "Étape 2"
    
        ## Création de la connexion
      
        * Aller dans les paramètres de votre catalogue et contribuer 🖊

        * Ajouter un élément au noeud : **root**

            * **type**: objet

            * **nom** : < nom du catalogue lié >
    
    === "Étape 3"
    
        ## Définition des caractéristiques
    
        * Ajouter un élément au noeud : <**nom du catalogue lié**> 

            * **type**: texte

            * **name** : descr

            * **valeur** : <votre description>

        * etc.
  
  
        ``` yaml title="Exemple de fichier katalog.json"
        {
            "Bienvenue sur notre catalogue projets": {
                "descr": "Ici, vous trouverez nos différents projets, (...).",
                "model": "projet",
                "cardview": "true"
            },
            "Picojoule - Méthanisation": {
                "descr": "PicoJoule désigne une unité de mesure d’énergie. Depuis 2012 (...)",
                "url_csv": "https://github.com/Konsilion/katalog-template/blob/master/docs/katalog/ressources/data.csv",
                "url_origin": "https://katalog.picojoule.fr/projets/home", 
                "activate": "true"
            },
            "Lowtech-Lab": {
                "descr": "",
                "url_csv": "https://github.com/Konsilion/katalog-template/blob/master/docs/katalog/projets/data.csv",
                "url_origin": "https://katalog.lowtechlab.fr/grenoble/projets/home", 
                "activate": "true"
            }
        }
        ```
    
    
=== "Documentation"

    [Documentation officielle](https://datami-docs.multi.coop/?locale=fr){ .md-button .md-button--secondary style="float:right; margin: 15px 25px;" target="_blank"}

    ## Pour la suite de Datami, c'est avec la <a href="https://www.multi.coop/?locale=fr" target="_blank">Coopérative Multi</a>.
    
    
