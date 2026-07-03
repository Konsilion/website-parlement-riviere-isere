# Plan de refonte du site — Parlement de la rivière Isère

**Contexte** : Le cahier des charges (27/05/26) prévoyait une migration vers WordPress. Décision prise : **rester sur MkDocs Material** et adapter le site pour répondre au cahier des charges.

**Site actuel** : https://parlement-isere.org | **Repo** : https://github.com/Konsilion/website-parlement-riviere-isere

---

## Structure du site : état actuel → état cible

### Navigation actuelle
```
Accueil | Le Parlement | Les Commissions | Documentation | Contact
```

### Navigation cible
```
Accueil | Le Parlement | La Démarche | Les Commissions | Les Sessions | Gardien·nes | Actualités | Ressources | Contact
```

**Changements** :
- ❌ Supprimer "Documentation" → remplacé par "Ressources"
- ✨ Ajouter "La Démarche" (Must)
- ✨ Ajouter "Les Sessions" (Must)
- ✨ Ajouter "Gardien·nes" (Must)
- ✨ Ajouter "Actualités" (Must)
- ✨ Ajouter "Ressources" avec sous-rubriques (Must)

---

## Phase 1 — Corrections et structure de base (je peux tout faire)

### 1.1 Corriger les bugs existants
- [ ] `pages/documentation.md` référencé dans la nav mais inexistant → supprimer la référence
- [ ] Liens cassés sur `index.md` : `./pages/sessions/premiere_session/`, `./pages/le_parlement/`, `./pages/contact/` → corriger vers les bons chemins
- [ ] Page `premiere_session.md` : erreur de syntaxe dans le frontmatter (`-toc` sans espace)

### 1.2 Créer la nouvelle structure de navigation
Créer les pages (squelettes vides ou avec contenu de placeholder) et mettre à jour `mkdocs.yml` :

```
nav:
    - Accueil: index.md
    - Le Parlement: pages/le_parlement/index.md
    - La Démarche: pages/la_demarche/index.md
    - Les Commissions:
        - Accueil: pages/commissions/index.md
        - Démocratique: pages/commissions/democratie/contact.md
        - Juridique: pages/commissions/juridique/contact.md
        - Artistique:
            - pages/commissions/artistique/index.md
            - Galerie d'images: pages/commissions/artistique/images.md
        - Scientifique:
            - pages/commissions/scientifique/index.md
            - Prises de notes: pages/commissions/scientifique/prise_note.md
    - Les Sessions:
        - pages/sessions/index.md
        - Première session: pages/sessions/premiere_session.md
        - Deuxième session: pages/sessions/deuxieme_session.md
        - Troisième session: pages/sessions/troisieme_session.md
    - Gardien·nes: pages/gardiennes/index.md
    - Actualités: pages/actualites/index.md
    - Ressources:
        - Accueil: pages/ressources/index.md
        - Presse: pages/ressources/presse.md
        - Sur les bords de l'Isère: pages/ressources/bords_isere.md
        - Usages et gestion des eaux: pages/ressources/usages_gestion_eau.md
    - Contact: pages/contact.md
```

### 1.3 Pages à créer (squelettes)

| Page | Priorité | Contenu initial |
|------|----------|-----------------|
| `pages/la_demarche/index.md` | M | Placeholder + structure suggérée (contexte mondial, initiatives existantes, particularités de l'Isère) |
| `pages/sessions/index.md` | M | Page d'index listant les 3 sessions |
| `pages/sessions/deuxieme_session.md` | M | Placeholder (22 mars 2025) |
| `pages/sessions/troisieme_session.md` | M | Placeholder |
| `pages/gardiennes/index.md` | M | Explication du statut de gardien·ne + formulaire d'inscription |
| `pages/actualites/index.md` | M | Page d'actualités (structure à définir — voir 1.4) |
| `pages/ressources/index.md` | M | Page d'accueil des ressources |
| `pages/ressources/presse.md` | M | Articles de presse (vide) |
| `pages/ressources/bords_isere.md` | M | Initiatives du bassin versant (vide) |
| `pages/ressources/usages_gestion_eau.md` | M | Reprise de gestion_eau.md + services_climatiques.md |

### 1.4 Système d'actualités
**Option A** : Pages markdown simples dans `pages/actualites/` avec un index manuel
- Simple, pas de plugin supplémentaire
- Inconvénient : pas de tri automatique par date

**Option B** : Plugin `mkdocs-blogging-plugin` ou `mkdocs-posts-plugin`
- Articles triés par date automatiquement
- Page d'index générée
- **Recommandé** — correspond mieux au besoin "Actualités"

### 1.5 Supprimer l'ancienne rubrique Documentation
- Déplacer `pages/documentation/gestion_eau.md` → `pages/ressources/usages_gestion_eau.md`
- Déplacer `pages/documentation/services_climatiques.md` → fusionner dans `pages/ressources/usages_gestion_eau.md` ou page séparée
- Supprimer `pages/documentation/index.md` (ou transformer en redirect)
- Archiver `pages/apps/` (ragflow.md, app_md.md) — non référencés actuellement

---

## Phase 2 — Page d'accueil (Must have)

### 2.1 Hero plein écran
- [ ] Remplacer le design actuel par une **photo plein écran de l'Isère** avec le nom du Parlement centré
- [ ] Scroll vers le bas pour découvrir le site
- [ ] **À faire par le collectif** : choisir la photo (crédits, lieu)

### 2.2 Bandeau membres en bas de page
- [ ] Afficher les logos des membres du Parlement (FNE 38, PPV Isère, Assemblée des communs, Jardin des Initiatives, Civipole)
- [ ] **À faire par le collectif** : confirmer la liste des membres + fournir les logos

### 2.3 Liens réseaux sociaux en bas de page
- [ ] Facebook, Instagram, LinkedIn (déjà présents sur la page Contact)
- [ ] Les ajouter aussi en footer global via `mkdocs.yml` ou CSS

### 2.4 Carrousel "Actualités à la une" (Could have — Phase 3)
- [ ] 3 articles mis en avant (dernière newsletter, Déclaration des droits, Charte des gardien·nes…)
- [ ] Techniquement faisable en JS/CSS dans MkDocs Material
- [ ] **Peut attendre** — à faire une fois le site alimenté

---

## Phase 3 — Contenu des nouvelles rubriques (Must have)

### 3.1 "La Démarche"
Structure suggérée :
- Le soulèvement légal terrestre (contexte mondial)
- Les initiatives existantes (Parlement de Loire, Appel du Rhône, Tavignanu vivu, etc.)
- Ce qui distingue le Parlement de la rivière Isère
- **À faire par le collectif** : rédiger le contenu

### 3.2 "Les Sessions"
- Page index présentant toutes les sessions
- Session 1 (28 sept 2024) : déjà existe, à mettre en forme
- Session 2 (22 mars 2025) : placeholder — **collectif à alimenter**
- Session 3 : placeholder — **collectif à alimenter**
- Bandeau "session à venir" en haut de page
- Format inspiré de l'Assemblée du Rhône : résumé + photos + documentation

### 3.3 "Gardien·nes de la rivière Isère"
- Explication du statut de gardien·ne (références : Wildproject, Appel du Rhône)
- Formulaire d'inscription (Framaforms — déjà utilisé pour "devenir membre")
- Préciser le secteur d'action
- **À faire par le collectif** : réflexion interne sur la place et le rôle des gardien·nes

### 3.4 "Actualités"
- Dernière newsletter + lien vers les précédentes
- Documentation sur les évènements récents/en cours/à venir (enjeux eau sur le bassin versant)
- **À faire par le collectif** : fréquence et catégories à organiser

### 3.5 "Ressources" (remplace "Documentation")
Sous-rubriques :
- **Presse** : articles de presse parlant du Parlement
- **Sur les bords de la rivière Isère** : initiatives du bassin versant
- **Usages et gestion des eaux** : reprend le contenu actuel (gestion_eau + services_climatiques)
- **À faire par le collectif** : organiser et regrouper la documentation, sélectionner ce qui est mis en avant

---

## Phase 4 — Mise à jour des rubriques existantes (Should have)

### 4.1 "Le Parlement"
- [ ] Ajouter une présentation de l'Isère (carte, photos, rapports étudiants)
- [ ] Ajouter les historiques
- [ ] Inspiration : site Menelik (présentation des cours d'eau)
- [ ] Carte du bassin versant (géographique + EPTB Isère)
- [ ] **À faire par le collectif** : rédiger la présentation + fournir les cartes

### 4.2 "Les Commissions"
- [ ] Rérédiger les paragraphes de présentation (plus concis)
- [ ] Ajouter photos et documentation
- [ ] Mettre à jour les référent·es
- [ ] **À faire par les référent·es** : chaque référent·e rédige sa présentation

### 4.3 "Contact"
- [ ] Ajouter formulaire "devenir membre" (déjà présent via Framaforms sur la page Commissions — à déplacer/dupliquer)
- [ ] Texte d'explication du fonctionnement de prise de contact
- [ ] **À faire par le collectif** : définir le contenu du formulaire

---

## Phase 5 — Fonctionnalités transverses

### 5.1 Dépôt documentaire simplifié
- MkDocs = pas d'interface d'upload pour les membres
- **Solution** : les documents sont commités dans le repo (les 2 référent·es ont accès GitHub)
- Créer un protocole simple : dossier `mkdocs/docs/medias/` pour les PDFs
- **À faire par le collectif** : désigner 2 référent·es + établir le protocole de publication

### 5.2 Désactivation des commentaires
- ✅ **Déjà fait** — MkDocs n'a pas de système de commentaires par défaut

### 5.3 Référencement / statistiques (Could/Won't have)
- Matomo peut être intégré via `extra_css` ou `theme.custom`
- Pas prioritaire — à voir plus tard

### 5.4 Identité graphique
- Garder les teintes bleues (déjà en place : `--md-primary-fg-color: #0b4387`)
- Stage étudiant possible pour repenser l'identité complète
- Pas prioritaire

---

## Tableau de priorisation (adapté MkDocs)

| Fonctionnalité | Priorité | Qui | Statut |
|----------------|----------|-----|--------|
| Correction bugs (liens cassés, nav) | M | Hermes | ⬜ Prêt à faire |
| Nouvelle structure de navigation | M | Hermes | ⬜ Prêt à faire |
| Création pages squelettes (La Démarche, Sessions, Gardien·nes, Actualités, Ressources) | M | Hermes | ⬜ Prêt à faire |
| Mise en forme page d'accueil (hero plein écran) | M | Hermes + collectif (photo) | ⬜ Photo à choisir |
| Bandeau membres + réseaux sociaux (footer) | M | Hermes + collectif (logos) | ⬜ Logos à confirmer |
| Formulaire "devenir membre" sur Contact | M | Hermes + collectif (contenu) | ⬜ Contenu à définir |
| Page Accueil — carrousel actualités | C | Hermes | ⬜ Plus tard |
| Rédaction contenu "La Démarche" | M | Collectif | ⬜ À rédiger |
| Rédaction contenu "Sessions" (2 et 3) | M | Collectif | ⬜ À rédiger |
| Rédaction contenu "Gardien·nes" | M | Collectif | ⬜ À rédiger |
| Rédaction contenu "Actualités" | M | Collectif | ⬜ À alimenter |
| Rédaction contenu "Ressources" | M | Collectif | ⬜ À sélectionner |
| Mise à jour "Le Parlement" (présentation Isère, cartes, historiques) | S | Collectif | ⬜ À rédiger |
| Mise à jour "Les Commissions" (textes + photos + référent·es) | S | Référent·es | ⬜ À rédiger |
| Statistiques de fréquentation | C/W | — | ⬜ Non urgent |

---

## Ce que je peux faire tout de suite (sans attente)

1. ✅ Corriger tous les bugs (liens cassés, nav, frontmatter)
2. ✅ Créer la nouvelle structure de navigation
3. ✅ Créer toutes les pages squelettes avec une structure claire et des placeholders
4. ✅ Déplacer le contenu de Documentation → Ressources
5. ✅ Met en place le système d'actualités (plugin blog)
6. ✅ Redessiner la page d'accueil (hero plein écran — en attendant la photo définitive)
7. ✅ Ajouter le footer avec réseaux sociaux
8. ✅ Déplacer/créer le formulaire "devenir membre" sur la page Contact
9. ✅ Créer la page Gardien·nes avec le formulaire d'inscription
10. ✅ Builder et vérifier que tout compile

## Ce qui attend le collectif

- 📸 Photo d'accueil de l'Isère (crédits, lieu)
- 🏢 Liste des membres + logos
- ✍️ Contenu des nouvelles rubriques (La Démarche, Sessions, Gardien·nes, Actualités, Ressources)
- 👥 Référent·es mis à jour
- 📝 Rérédaction des commissions
- 🗺️ Cartes du bassin versant
- 📄 Protocole de publication + désignation des 2 référent·es site