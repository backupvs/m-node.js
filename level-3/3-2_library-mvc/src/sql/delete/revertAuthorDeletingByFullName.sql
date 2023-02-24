UPDATE authors
SET deleted_at = NULL
WHERE full_name = :fullName