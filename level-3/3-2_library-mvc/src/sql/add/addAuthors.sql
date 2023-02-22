INSERT INTO authors (full_name)
SELECT :fullName AS full_name
WHERE NOT EXISTS (
    SELECT id
    FROM authors
    WHERE full_name = :fullName
)
LIMIT 1;
