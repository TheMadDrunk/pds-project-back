-- might be needed
-- ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'root';
-- flush privileges;

-- Table 1: ligne
CREATE TABLE ligne (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255)
);

-- Table 2: secteur
CREATE TABLE secteur (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ligne_id INT,
    nom VARCHAR(255) UNIQUE ,
    FOREIGN KEY (ligne_id) REFERENCES ligne(id)
);

-- Table 3: caracteristique
CREATE TABLE caracteristique (
    id INT AUTO_INCREMENT PRIMARY KEY,
    secteur_nom VARCHAR(255),
    code INT,
    libele VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    frequence VARCHAR(255),
    tps_controle INT,
    Min FLOAT,
    Max FLOAT,
    gravite VARCHAR(255),
    unite VARCHAR(255),
    FOREIGN KEY (secteur_nom) REFERENCES secteur(nom)
);

-- Table 4: controle_log
CREATE TABLE controle_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    caracteristique_id INT,
    valeur FLOAT,
    conforme BOOLEAN,
    logDate TIMESTAMP,
    FOREIGN KEY (caracteristique_id) REFERENCES caracteristique(id)
);


INSERT INTO ligne (nom) VALUES ('QCP'), ('montage'), ('ferrage'), ('peinture');

INSERT INTO secteur (ligne_id, nom)
VALUES 
    (1, 'AVCF'),
    (1, 'BTU'),
    (1, 'RETOUCHE');
