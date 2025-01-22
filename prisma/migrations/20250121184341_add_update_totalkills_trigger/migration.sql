CREATE OR REPLACE FUNCTION update_total_kills()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE player
    SET totalKills = (
        SELECT COALESCE(SUM(kill), 0)
        FROM player_team
        WHERE playerId = NEW.playerId
    )
    WHERE id = NEW.playerId;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_total_kills
AFTER INSERT OR UPDATE OR DELETE
ON player_team
FOR EACH ROW
EXECUTE FUNCTION update_total_kills();
