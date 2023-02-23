UPDATE books
SET views_count = views_count + 1
WHERE id = ?
AND deleted_at IS NULL;