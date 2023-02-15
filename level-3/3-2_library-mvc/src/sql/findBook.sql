SELECT * FROM books
WHERE (title LIKE :search OR author LIKE :search)
AND author LIKE :author
AND release_year LIKE :releaseYear
LIMIT :offset , :limit;