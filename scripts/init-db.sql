CREATE TABLE node (
    title TEXT PRIMARY KEY,
    lat NUMBER,
    lng NUMBER,
    byline TEXT,
    is_region BOOLEAN
);

CREATE TABLE redirect (
    title TEXT,
    canonical TEXT,
    PRIMARY KEY (title, canonical),
    FOREIGN KEY (canonical) REFERENCES node (title) ON DELETE CASCADE
);

CREATE TABLE edge (
    origin TEXT,
    destination TEXT,
    PRIMARY KEY (origin, destination),
    FOREIGN KEY (origin) REFERENCES node (title) ON DELETE CASCADE, 
    FOREIGN KEY (destination) REFERENCES node (title) ON DELETE CASCADE
);
