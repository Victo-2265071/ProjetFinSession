import db from "../config/db.js";

/**
 * Vérifie la validité d'une clé API et retourne l'ID de l'utilisateur associé
 */
function ValidationCle(cleApi) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT id FROM utilisateurs WHERE cle_api = $1";
        db.query(sql, [cleApi], (err, results) => {
            if (err) {
                console.error("Erreur lors de la validation de la clé API :", err);
                return reject(err);
            }

            if (results.rows.length === 0) {
                return resolve(null); // Clé invalide
            }

            return resolve(results.rows[0].id); // Clé valide : retourne l'ID
        });
    });
}

/**
 * Ajoute un nouvel utilisateur dans la base de données
 */
function AjouterUtilisateur(nom, prenom, courriel, motdepasse, cleApi) {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO utilisateurs (nom, prenom, courriel, password, cle_api)
            VALUES ($1, $2, $3, $4, $5) RETURNING *
        `;
        const valeurs = [nom, prenom, courriel, motdepasse, cleApi];

        db.query(sql, valeurs, (err, results) => {
            if (err) {
                console.error("Erreur lors de l'ajout de l'utilisateur :", err);
                return reject(err);
            }

            resolve(results.rows[0]);
        });
    });
}

// Récupère la clé API + mot de passe à partir du courriel
function ObtenirCleApi(courriel) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT id, cle_api, password FROM utilisateurs WHERE courriel = $1";
        db.query(sql, [courriel], (err, results) => {
            if (err) return reject(err);
            resolve(results.rows[0]); // peut être undefined si non trouvé
        });
    });
}

// Met à jour la clé API
function MettreAJourCleApi(id, nouvelleCle) {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE utilisateurs SET cle_api = $1 WHERE id = $2";
        db.query(sql, [nouvelleCle, id], (err, results) => {
            if (err) return reject(err);
            resolve(results.rows);
        });
    });
}

// Vérifie si le courriel existe déjà
function CourrielExiste(courriel) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT id FROM utilisateurs WHERE courriel = $1";
        db.query(sql, [courriel], (err, results) => {
            if (err) return reject(err);
            resolve(results.rows.length > 0);
        });
    });
}



export default { 
    ValidationCle, 
    AjouterUtilisateur,
    ObtenirCleApi,
    MettreAJourCleApi,
    CourrielExiste
};