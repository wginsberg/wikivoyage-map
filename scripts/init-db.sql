CREATE TABLE node (
    title TEXT PRIMARY KEY,
    lat NUMBER,
    lng NUMBER
);

CREATE TABLE redirect (
    title TEXT,
    canonical TEXT,
    PRIMARY KEY (title, canonical),
    FOREIGN KEY (title) REFERENCES node (title)
);

CREATE TABLE edge (
    origin TEXT,
    destination TEXT,
    PRIMARY KEY (origin, destination),
    FOREIGN KEY (origin) REFERENCES node (title),
    FOREIGN KEY (destination) REFERENCES node (title)
);
