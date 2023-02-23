SELECT id
FROM authors
WHERE full_name = :fullName
AND deleted_at IS NULL;