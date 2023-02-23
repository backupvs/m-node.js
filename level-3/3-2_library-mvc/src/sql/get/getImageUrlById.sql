SELECT image_url FROM books
WHERE id = ?
AND deleted_at IS NULL;