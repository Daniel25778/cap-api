CREATE OR REPLACE FUNCTION update_total_kills_for_player(p_player_id text)
RETURNS VOID AS $$
BEGIN
    UPDATE player
    SET "totalKills" = COALESCE(subquery."totalKills", 0)
    FROM (
        SELECT 
            "playerId", 
            SUM(kill) AS "totalKills"
        FROM player_team
        WHERE "playerId" = p_player_id
        GROUP BY "playerId"
    ) AS subquery
    WHERE player.id = subquery."playerId";
    UPDATE player
    SET "totalKills" = 0
    WHERE id = p_player_id
    AND NOT EXISTS (SELECT 1 FROM player_team WHERE "playerId" = p_player_id);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION trigger_update_total_kills()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
        PERFORM update_total_kills_for_player(NEW."playerId");
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_kills_trigger
AFTER INSERT OR UPDATE OR DELETE ON player_team
FOR EACH ROW EXECUTE FUNCTION trigger_update_total_kills();
