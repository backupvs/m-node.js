SELECT COUNT(*) as count
FROM books
WHERE deleted_at IS NULL;