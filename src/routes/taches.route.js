import express from 'express';
import { affichertaches, afficherdetail, ajoutertache, modifiertache, modififierstatuttache, supprimertache, ajoutersoustache, modifiersoustache, modififierstatutsoustache, supprimersoustache, ajouterutilisateur, demandercle } from '../controllers/taches.controller.js';
import authentification from "../middlewares/authentification.middleware.js";  

const router = express.Router();

// Afficher la liste de toutes les tâches de l'usager.
router.get('/affichertaches', authentification, affichertaches);

// Afficher le détail d'une tâche
router.get('/afficherdetail/:id', authentification, afficherdetail);

// Ajouter, modifier, modifier le statut et supprimer une tâche
router.post('/ajoutertache', authentification, ajoutertache);
router.put('/modifiertache/:id', authentification, modifiertache);
router.put('/modifierstatuttache/:id', authentification, modififierstatuttache);
router.delete('/supprimertache/:id', authentification, supprimertache);

// Ajouter, modifier, modifier le statut et supprimer une sous-tâche
router.post('/ajoutersoustache/:id', authentification, ajoutersoustache);
router.put('/modifiersoustache/:id', authentification, modifiersoustache);
router.put('/modifierstatutsoustache/:id', authentification, modififierstatutsoustache);
router.delete('/supprimersoustache/:id', authentification, supprimersoustache);

// Ajouter un utilisateur
router.post('/ajouterutilisateur', ajouterutilisateur);

// Récupérer sa clé api ou en redemander une nouvelle
router.get('/demandercle', demandercle);


export default router;