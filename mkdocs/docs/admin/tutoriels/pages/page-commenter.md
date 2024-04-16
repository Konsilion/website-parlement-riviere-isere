---
hide:
   - toc
   - navigation
---

![Retour configuration](https://raw.githubusercontent.com/Konsilion/website/master/media/fleche-retour.png){ .md-button .md-button--primary onclick="window.history.back();" style="float:right; height: 40px; padding: 5px; margin: 5px; border-radius: 50px; border: 3px solid grey;"}

# Afficher et commenter une page Web

!!! important ""

    Cette fonctionnalité n'est pas compatible avec les scripts de pages Web. Si vous souhaitez en bénificier alors supprimez les scripts de la page Web.

=== "Paramètrage initial"

    Avant toute chose vous devez avoir activer les **Discussions** sur votre répertoire, cela est à faire une seule fois. 

    1. Activer les discussions en [suivant ce lien]({{ katalog_repo }}/settings){target="_blank"}.

    2. Créer une catégorie de discussion nommée `_` à [partir de ce lien]({{ katalog_repo }}/discussions/categories){target="_blank"}.

    ### Création de votre script `giscus`

    1. Installer l'application Giscus en [suivant ce lien](https://github.com/apps/giscus){target="_blank"}

    2. Paramètrer votre script giscus en [suivant ce lien](https://giscus.app/fr){target="_blank"}

        * Dans **Mappage Pages ↔️ Discussions** > sélectionner : "Le titre de la discussion contient l'URL de la page"

        * Dans **Catégorie de la Discussion** > séléctionner : "_"

        * Copier le code présent dans **Activer giscus**

    3. Coller le code script dans [ce fichier]({{ katalog_repo }}/edit/master/overrides/partials/comments.html){target="_blank"}


=== "Étape 1"

    ## Créer une nouvelle discussion

    C'est cette discussion qui sera affichée comme commentaire au bas de votre page.

    * Pour créer une nouvelle discussion vous pouvez [suivre ce lien]({{ katalog_repo }}/discussions/new){target="_blank"}

    * Pensez à bien **séléctionner la catégorie `_`**
    
    * Le titre de la discussion doit être l'url de votre page `https://..../votre-page`


=== "Étape 2"

    Dans votre page ajouter l'en-tête suivant : `comments: true`
    
    <div style="max-width: 650px; margin: 50px auto;" markdown>
        ``` html title="Page Web - Modèle avec commentaires"
        ---
        title: Introduction
        comments: true
        hide:
           - toc
        ---

        # Introduction

        Bienvenue dans notre tutoriel sur MkDocs !

        (votre texte ici ...)

        ```
    </div>


<script type="text/javascript" src="https://konsilion.github.io/katalog-setup/js/functionality/modif-page.js" defer></script> 
