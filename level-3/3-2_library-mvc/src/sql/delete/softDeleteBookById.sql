UPDATE books 
SET deleted_at = NOW()
WHERE id = ?;