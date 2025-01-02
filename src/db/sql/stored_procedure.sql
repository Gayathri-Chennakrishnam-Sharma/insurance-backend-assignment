--stored procedure query for calculating total claim amount for a customer

CREATE OR REPLACE FUNCTION calculate_total_claim(CustomerId INT)
RETURNS NUMERIC AS $$
DECLARE
    total_claim NUMERIC := 0;
BEGIN
    SELECT SUM("claimAmount") INTO total_claim 
    FROM "Claims"
    WHERE "PolicyId" IN (
        SELECT id FROM "Policies" WHERE "Policies"."CustomerId" = calculate_total_claim.CustomerId
    );

    RETURN total_claim;
END;
$$ LANGUAGE plpgsql;

--command to get result
-- SELECT calculate_total_claim(1);


--stored procedure query for calculating total number of policies for a customer

CREATE OR REPLACE FUNCTION get_policy_count_by_customer(CustomerId INT)
RETURNS INT AS $$
DECLARE
    policy_count INT := 0;
BEGIN
    SELECT COUNT(*) INTO policy_count
    FROM "Policies"
    WHERE "CustomerId" = CustomerId;

    RETURN policy_count;
END;
$$ LANGUAGE plpgsql;


--command to get result
-- SELECT get_policy_count_by_customer(1);


--stored procedure query for calculating total premium for a customer
CREATE OR REPLACE FUNCTION calculate_total_premium(CustomerId INT)
RETURNS FLOAT AS $$
DECLARE
    total_premium FLOAT := 0;
BEGIN
    SELECT SUM(premium) INTO total_premium
    FROM "Policies"
    WHERE "CustomerId" = CustomerId;

    RETURN total_premium;
END;
$$ LANGUAGE plpgsql;

--command to get result
-- SELECT calculate_total_premium(1);


