---
hide:
   - toc
   - navigation
---

![Retour configuration](https://raw.githubusercontent.com/Konsilion/website/master/media/fleche-retour.png){ .md-button .md-button--primary onclick="window.history.back();" style="float:right; height: 40px; padding: 5px; margin: 5px; border-radius: 50px; border: 3px solid grey;"}

# Comment créer et éditer une page Web ?

=== "Étape 1"

    [Étape 1 - Créer le fichier]({{ katalog_repo }}/new/master/docs/pages){ .md-button .md-button--secondary style="float:right; margin: 15px 25px;" target="_blank"}

    ## Créer la page et écrire le contenu

    Créez le fichier markdown correspondant à la page de votre site en cliquant sur ce bouton. 

    * Ce fichier doit porter l'extension `.md`, par exemple : `accueil.md` ou `ma-page.md`,

    * Pas d'espace dans le nom de votre fichier,

    * Placer le fichier dans `pages` ou un sous dossier `pages/sous-dossier/ma-page.md`,

    * Copier le modèle suivant dans le fichier,
    
    * et enregistrer.

    <div style="max-width: 650px; margin: 50px auto;" markdown>
        ``` html title="Page Web - Modèle de base"
        ---
        title: Introduction
        comments: true
        slider: true
        add: true
        edit: true
        hide:
           - toc
           - navigation
        ---

        # Introduction

        Bienvenue dans notre tutoriel sur MkDocs !

        (votre texte ici ...)

        ```
    </div>

    Chaque fichier markdown doit commencer par une ligne de front matter qui définit le titre de la page et d'autres paramètres.
        
    ### Les différents paramètres d'une page
    
    #### comments
    
    #### title
    
    #### edit
    
    #### add
    
    #### slider
    
    #### hide

=== "Étape 2" 

    [Étape 2 - Modifier mkdocs.yml]({{ katalog_repo }}/edit/master/mkdocs.yml){ .md-button .md-button--secondary style="float:right; margin: 15px 25px;" target="_blank"}

    ## Référencer votre page

    Dans le répertoire du projet, vous trouverez un fichier mkdocs.yml qui contient les paramètres de votre projet. Ouvrez ce fichier en cliquant sur le bouton et modifiez-le pour définir l'arborescence de vos pages. Par exemple :

    <div style="max-width: 650px; margin: 50px auto;" markdown>
        ``` yaml title="Éditer la navigation/ référencement dans mkdocs.yml"
        nav:
          - Accueil: pages/accueil.md
          - Présentation:
            - Introduction: pages/ma-page.md
            - Notre histoire: pages/etape-1/ma-deuxieme-page.md
          - Contact: pages/contact.md
        ```
    </div>

=== "Aller plus loin"

    ## En savoir plus sur l'écriture Markdown

    Le markdown est un langage de balisage léger qui permet de formater du texte de manière simple et rapide. Il a été créé en 2004 par John Gruber et Aaron Swartz dans le but de rendre la mise en forme de documents plus facile et plus rapide. Le markdown est souvent utilisé pour la rédaction de documents sur internet, comme des articles de blog, des documents de documentation, etc.

    Pour utiliser le markdown, il suffit d'ajouter des symboles spéciaux devant ou autour des mots ou des phrases que vous voulez mettre en forme.

    [Débuter avec Markdown](https://blog.wax-o.com/2014/04/tutoriel-un-guide-pour-bien-commencer-avec-markdown/){ .md-button .md-button--secondary target="_blank"}

    ### Au besoin, compléter avec du code HTML

    Vous pouvez également ajouter du contenu HTML dans vos fichiers markdown en utilisant des balises HTML. Par exemple, pour ajouter une image à votre page suivi d'un saut de ligne, vous pouvez utiliser la balise <img> et <br> comme ceci :

    <div style="max-width: 650px; margin: 50px auto;" markdown>
        ``` html title="Ajout ponctuel d'éléments HTML"
        <img src="image.jpg" alt="Description de l'image">

        <br>
        ```
    </div>

