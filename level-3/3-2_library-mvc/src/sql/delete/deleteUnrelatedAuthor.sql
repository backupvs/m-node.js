DELETE FROM authors
WHERE id NOT IN (SELECT author_id FROM authors_books);