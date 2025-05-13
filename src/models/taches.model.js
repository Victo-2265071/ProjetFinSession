// À ajuster selon la structure
import db from '../config/db.js';

/**
 * Récupère les tâches d'un utilisateur
 */
function ObtenirTachesParUtilisateur(utilisateurId, toutes) {
    return new Promise((resolve, reject) => {
        let sql = "SELECT id, titre FROM taches WHERE utilisateur_id = $1";

        if (!toutes) {
            sql += " AND complete = 0";
        }

        db.query(sql, [utilisateurId], (err, results) => {
            if (err) {
                console.error("Erreur SQL (ObtenirTachesParUtilisateur) :", err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

function ObtenirTachesDetailsParId(utilisateurId) {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM taches WHERE id = $1";

        db.query(sql, [utilisateurId], (err, results) => {
            if (err) {
                console.error("Erreur SQL (ObtenirTachesParId) :", err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

function CreerTache(utilisateurId, titre, description, dateEcheance) {
    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO taches (utilisateur_id, titre, description, date_debut, date_echeance, complete) VALUES ($1, $2, $3, NOW(), $4, false)";

        db.query(sql, [utilisateurId, titre, description, dateEcheance], (err, results) => {
            if (err) {
                console.error("Erreur SQL (ObtenirTachesParId) :", err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

function ModifierTache(tacheId, utilisateurId, titre, description, dateEcheance) {
    return new Promise((resolve, reject) => {
        let sql = "UPDATE taches SET titre = $1, description = $2, date_echeance = $3 WHERE id = $4 AND utilisateur_id = $5";

        db.query(sql, [titre, description, dateEcheance, tacheId, utilisateurId], (err, results) => {
            if (err) {
                console.error("Erreur SQL (ObtenirTachesParId) :", err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

function ModifierStatutTache(tacheId, utilisateurId, complete) {
    return new Promise((resolve, reject) => {
        let sql = "UPDATE taches SET complete = $1 WHERE id = $2 AND utilisateur_id = $3";

        db.query(sql, [complete, tacheId, utilisateurId], (err, results) => {
            if (err) {
                console.error("Erreur SQL (ObtenirTachesParId) :", err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

function SupprimerTache(tacheId, utilisateurId) {
    return new Promise((resolve, reject) => {
        let sql = "DELETE FROM taches WHERE id = $1 AND utilisateur_id = $2";
        db.query(sql, [tacheId, utilisateurId], (err, results) => {
            if (err) {
                console.error("Erreur SQL (ObtenirTachesParId) :", err);
                return reject(err);
            }
            resolve(results);
        });
    });
}


function CreerSousTache(tacheId, titre, utilisateurId) {
    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO sous_taches (tache_id, titre, complete) SELECT taches.id, $1, false FROM taches WHERE taches.id = $2 AND taches.utilisateur_id = $3";

        db.query(sql, [titre, tacheId, utilisateurId], (err, results) => {
            if (err) {
                console.error("Erreur SQL (ObtenirTachesParId) :", err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

function ModifierSousTache(sousTacheId, titre, utilisateurId) {
    return new Promise((resolve, reject) => {
        let sql = "UPDATE sous_taches JOIN taches ON sous_taches.tache_id = taches.id SET sous_taches.titre = $1 WHERE sous_taches.id = $2 AND taches.utilisateur_id = $3;";

        db.query(sql, [titre, sousTacheId, utilisateurId], (err, results) => {
            if (err) {
                console.error("Erreur SQL (ObtenirTachesParId) :", err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

function ModifierStatutSousTache(sousTacheId, utilisateurId, complete) {
    return new Promise((resolve, reject) => {
        let sql = "UPDATE sous_taches JOIN taches ON sous_taches.tache_id = taches.id SET sous_taches.complete = $1 WHERE sous_taches.id = $2 AND taches.utilisateur_id = $3";

        db.query(sql, [complete, sousTacheId, utilisateurId], (err, results) => {
            if (err) {
                console.error("Erreur SQL (ObtenirTachesParId) :", err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

function SupprimerSousTache(sousTacheId, utilisateurId) {
    return new Promise((resolve, reject) => {
        let sql = "DELETE sous_taches FROM sous_taches JOIN taches ON sous_taches.tache_id = taches.id WHERE sous_taches.id = $1 AND taches.utilisateur_id = $2;";

        db.query(sql, [sousTacheId, utilisateurId], (err, results) => {
            if (err) {
                console.error("Erreur SQL (ObtenirTachesParId) :", err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

export default {
    ObtenirTachesParUtilisateur,
    ObtenirTachesDetailsParId,
    CreerTache,
    ModifierTache,
    ModifierStatutTache,
    SupprimerTache,
    CreerSousTache,
    ModifierSousTache,
    ModifierStatutSousTache,
    SupprimerSousTache
}