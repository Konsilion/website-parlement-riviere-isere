---
title: Modification de page Web
hide:
   - toc
   - navigation
---

![Retour configuration](https://raw.githubusercontent.com/Konsilion/website/master/media/fleche-retour.png){ .md-button .md-button--primary onclick="window.history.back();" style="float:right; height: 40px; padding: 5px; margin: 5px; border-radius: 50px; border: 3px solid grey;"}

# Comment modifier une page Web existante ?

---

Afin de faciliter la contribution et les modifications autour de vos pages Web, pensez à ajouter le paramètre `edit: true` en haut de votre page: 

<div style="max-width: 650px; margin: 50px auto;" markdown>
    ``` html title="Page Web - Ajouter l'option de modification"
        ---
        title: Introduction
        edit: true
        ---
        
        # Titre 1
        
        (votre contenu de page) 
        
        ...
        
    ```
</div>

!!! tip ""

    Sur votre page en haut à droite de votre écran, retrouvé le bouton `Modifier la page` (non-disponible sur téléphone)

## Modification d'une page non balisée

Si vous souhaitez modifier une page ponctuellement, copier sont url à partir de `/pages/...` et ajouter avant le lien suivant : 

`{{ katalog_repo }}/edit/master/pages/...`