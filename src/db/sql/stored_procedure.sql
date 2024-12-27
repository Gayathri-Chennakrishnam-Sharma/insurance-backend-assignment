CREATE OR REPLACE FUNCTION calculate_total_claim(customer_id INT) RETURNS FLOAT AS $$
BEGIN
    RETURN (
        SELECT COALESCE(SUM(amount), 0)
        FROM claims c
        JOIN policies p ON c."PolicyId" = p.id
        WHERE p."CustomerId" = customer_id
    );
END;
$$ LANGUAGE plpgsql;

