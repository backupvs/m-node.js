INSERT INTO authors (full_name)
SELECT DISTINCT TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(author, ',', numbers.n), ',', -1)) AS full_name
FROM books
CROSS JOIN (
    SELECT 1 n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
) numbers
WHERE CHAR_LENGTH(author) - CHAR_LENGTH(REPLACE(author, ',', '')) >= numbers.n - 1
AND deleted_at IS NULL;