CREATE TABLE profils_candidats (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    age INTEGER NOT NULL,
    poste_recherche VARCHAR(100) NOT NULL,
    salaire_souhaite DECIMAL(10,2) NOT NULL,
    religion VARCHAR(100),
    ethnie VARCHAR(100),
    situation_matrimoniale VARCHAR(100),
    maladies TEXT,
    experience TEXT NOT NULL,
    photo VARCHAR(255),
    cv VARCHAR(255),
    date_publication TIMESTAMP DEFAULT NOW(),
    niveau_etude VARCHAR(100)
);