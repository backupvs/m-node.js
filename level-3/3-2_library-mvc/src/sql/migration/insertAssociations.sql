INSERT INTO authors_books (author_id, book_id)
SELECT a.id, b.id
FROM books b
JOIN (
  SELECT id, TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(author, ',', numbers.n), ',', -1)) AS author_name
  FROM books
  CROSS JOIN (
      SELECT 1 n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
  ) numbers
  WHERE CHAR_LENGTH(author) - CHAR_LENGTH(REPLACE(author, ',', '')) >= numbers.n - 1
) t ON b.id = t.id
JOIN authors a ON a.full_name = t.author_name
WHERE b.deleted_at IS NULL AND a.deleted_at IS NULL;