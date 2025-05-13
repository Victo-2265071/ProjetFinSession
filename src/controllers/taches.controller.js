// À ajuster selon la structure
import tachesModel from "../models/taches.model.js";
import utilisateurModel from "../models/utilisateur.model.js"
import bcrypt from "bcrypt";
import crypto from "crypto";

// =====================
// GESTION TACHES
// =====================

const affichertaches = async (req, res) => {
    const utilisateurId = req.utilisateurId;
    const afficherToutes = req.query.toutes === "true";

    try {
        const taches = await tachesModel.ObtenirTachesParUtilisateur(utilisateurId, afficherToutes);
        res.status(200).json(taches);
    } catch (err) {
        console.error("Erreur lors de l'affichage des tâches :", err);
        res.status(500).json({ message: "Erreur serveur lors de la récupération des tâches." });
    }
};

const afficherdetail = async (req, res) => {
    const tacheId = parseInt(req.params.id);

    try {
        const taches = await tachesModel.ObtenirTachesDetailsParId(tacheId);
        res.status(200).json(taches);
    } catch (err) {
        console.error("Erreur lors de l'affichage des tâches :", err);
        res.status(500).json({ message: "Erreur serveur lors de la récupération des tâches." });
    }
};

const ajoutertache = async (req, res) => {
    const utilisateurId = req.utilisateurId;
    const { titre, description, dateEcheance } = req.body;

    try {
        const tache = await tachesModel.CreerTache(utilisateurId, titre, description, dateEcheance);
        res.status(200).json({
            message: "Tâche créée avec succès",
            tache: tache
        });
    } catch (err) {
        console.error("Erreur lors de la création de la tâche :", err);
        res.status(500).json({ message: "Erreur serveur lors de la création de la tâche." });
    }
}

const modifiertache = async (req, res) => {
    const tacheId = parseInt(req.params.id);
    const utilisateurId = req.utilisateurId;
    const { titre, description, dateEcheance } = req.body;

    try {
        const taches = await tachesModel.ModifierTache(tacheId, utilisateurId, titre, description, dateEcheance);
        res.status(200).json({
            message: "Tâche modifiée avec succès",
            tache: taches
    });
    } catch (err) {
        console.error("Erreur lors de la modification de la tâche :", err);
        res.status(500).json({ message: "Erreur serveur lors de la modification de la tâche." });
    }
}

const modififierstatuttache = async (req, res) => {
    const tacheId = parseInt(req.params.id);
    const utilisateurId = req.utilisateurId;
    const complete = parseInt(req.body.complete);

    try {
        const taches = await tachesModel.ModifierStatutTache(tacheId, utilisateurId, complete);
        res.status(200).json({
            message: "Statut modifié avec succès",
            tache: taches
    });
    } catch (err) {
        console.error("Erreur lors de la modification de la tâche :", err);
        res.status(500).json({ message: "Erreur serveur lors de la modification de la tâche." });
    }
};

const supprimertache = async (req, res) => {
    const tacheId = parseInt(req.params.id);
    const utilisateurId = req.utilisateurId;

    try {
        const taches = await tachesModel.SupprimerTache(tacheId, utilisateurId);
        res.status(200).json({
            message: "Tâche supprimée avec succès"
    });
    } catch (err) {
        console.error("Erreur lors de la suppression de la tâche :", err);
        res.status(500).json({ message: "Erreur serveur lors de la suppression de la tâche." });
    }
};

// =====================
// GESTION SOUS TACHES
// =====================

const ajoutersoustache = async (req, res) => {
    const utilisateurId = req.utilisateurId;
    const tacheId = parseInt(req.params.id);
    const { titre } = req.body;

    try {
        const taches = await tachesModel.CreerSousTache(tacheId, titre, utilisateurId);
        res.status(200).json({
            message: "Sous-Tâche ajoutée avec succès",
            tache: taches
    });
    } catch (err) {
        console.error("Erreur lors de la création de la tâche :", err);
        res.status(500).json({ message: "Erreur serveur lors de la création de la tâche." });
    }
};

const modifiersoustache = async (req, res) => {
    const sousTacheId = parseInt(req.params.id);
    const utilisateurId = req.utilisateurId;
    const { titre } = req.body;

    try {
        const taches = await tachesModel.ModifierSousTache(sousTacheId, titre, utilisateurId);
        res.status(200).json({
            message: "Sous-Tâche modifiée avec succès",
            tache: taches
    });
    } catch (err) {
        console.error("Erreur lors de la modification de la tâche :", err);
        res.status(500).json({ message: "Erreur serveur lors de la modification de la tâche." });
    }
};

const modififierstatutsoustache = async (req, res) => {
    const sousTacheId = parseInt(req.params.id);
    const utilisateurId = req.utilisateurId;
    const complete = parseInt(req.body.complete);

    try {
        const taches = await tachesModel.ModifierStatutSousTache(sousTacheId, utilisateurId, complete);
        res.status(200).json({
            message: "Statut modifiée avec succès",
            tache: taches
    });
    } catch (err) {
        console.error("Erreur lors de la modification de la tâche :", err);
        res.status(500).json({ message: "Erreur serveur lors de la modification de la tâche." });
    }
};

const supprimersoustache = async (req, res) => {
    const sousTacheId = parseInt(req.params.id);
    const utilisateurId = req.utilisateurId;

    try {
        const taches = await tachesModel.SupprimerSousTache(sousTacheId, utilisateurId);
        res.status(200).json({
            message: "Sous-Tâche supprimée avec succès"
    });
    } catch (err) {
        console.error("Erreur lors de la suppression de la tâche :", err);
        res.status(500).json({ message: "Erreur serveur lors de la suppression de la tâche." });
    }
};


// =====================
// GESTION UTILISATEURS
// =====================

const ajouterutilisateur = async (req, res) => {
    const { nom, prenom, courriel, motdepasse } = req.body;

    if (!nom || !prenom || !courriel || !motdepasse) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    try {
        // 1. Vérifier si le courriel existe déjà
        const existe = await utilisateurModel.CourrielExiste(courriel);
        if (existe) {
            return res.status(409).json({ message: "Un utilisateur avec ce courriel existe déjà" });
        }

        // 2. Hasher le mot de passe
        const motdepasseHashe = await bcrypt.hash(motdepasse, 10);

        // 3. Générer une clé API
        const cle_api = crypto.randomBytes(12).toString("hex");

        // 4. Ajouter l’utilisateur
        const utilisateur = await utilisateurModel.AjouterUtilisateur(nom, prenom, courriel, motdepasseHashe, cle_api);

        return res.status(201).json({ message: "Utilisateur créé", utilisateur });
    } catch (erreur) {
        console.error("Erreur lors de l'ajout d'utilisateur :", erreur);
        return res.status(500).json({ message: "Erreur interne" });
    }
};

const demandercle = async (req, res) => {
    const { courriel, motdepasse, regenerer } = req.body;

    if (!courriel || !motdepasse) {
        return res.status(400).json({ message: "Courriel et mot de passe requis" });
    }

    try {
        // 1. Récupérer l'utilisateur et le mot de passe haché
        const utilisateur = await utilisateurModel.ObtenirCleApi(courriel);

        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // 2. Vérifier le mot de passe
        const motDePasseValide = await bcrypt.compare(motdepasse, utilisateur.password);
        if (!motDePasseValide) {
            return res.status(401).json({ message: "Mot de passe invalide" });
        }

        // 3. Générer une nouvelle clé API si demandé
        if (regenerer === true) {
            const nouvelleCle = crypto.randomBytes(15).toString("hex");
            await utilisateurModel.MettreAJourCleApi(utilisateur.id, nouvelleCle);
            return res.status(200).json({ message: "Nouvelle clé générée", cle_api: nouvelleCle });
        }

        // 4. Retourner la clé existante
        return res.status(200).json({ cle_api: utilisateur.cle_api });

    } catch (erreur) {
        console.error("Erreur dans demanderCle :", erreur);
        return res.status(500).json({ message: "Erreur interne lors de la demande de clé" });
    }
};



export {
    affichertaches,
    afficherdetail,
    ajoutertache,
    modifiertache,
    modififierstatuttache,
    supprimertache,
    ajoutersoustache,
    modifiersoustache,
    modififierstatutsoustache,
    supprimersoustache,
    ajouterutilisateur,
    demandercle
}