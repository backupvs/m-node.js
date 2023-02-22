SELECT b.*, GROUP_CONCAT(a.full_name SEPARATOR ', ') AS author
FROM books b
LEFT JOIN authors_books ab ON b.id = ab.book_id
LEFT JOIN authors a ON ab.author_id = a.id
GROUP BY b.id
LIMIT :offset , :limit;

