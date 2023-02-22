UPDATE books
SET want_clicks_count = want_clicks_count + 1
WHERE id = ?;