UPDATE authors
SET deleted_at = NOW()
WHERE NOT EXISTS (
  SELECT *
  FROM authors_books
  INNER JOIN books ON authors_books.book_id = books.id
  WHERE authors_books.author_id = authors.id AND books.deleted_at IS NULL
);