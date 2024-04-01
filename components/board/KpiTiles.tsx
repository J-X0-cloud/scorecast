import type { RangeId, TeamId } from "@/types/board";
import { PREVIOUS_PERIOD } from "@/lib/data/ranges";
import { isGoodDelta } from "@/lib/format";
import { teamKpis } from "@/lib/scoring";
import { Icon } from "@/components/ui/Icon";
import { DeltaChip } from "@/components/ui/DeltaChip";
import { ProgressRing } from "@/components/charts/ProgressRing";
import { Sparkline } from "@/components/charts/Sparkline";

interface KpiTilesProps {
  teamId: TeamId;
  range: RangeId;
}

export function KpiTiles({ teamId, range }: KpiTilesProps) {
  const { tiles } = teamKpis(teamId, range);

  return (
    <div className="kpis">
      {tiles.map((tile) => (
        <div className="tile" key={tile.label}>
          <div className="tile-h">
            <Icon name={tile.icon} />
            <span>{tile.label}</span>
          </div>
          <div className="tile-v">
            <b>{tile.value}</b>
            {tile.ring !== undefined && <ProgressRing progress={tile.ring} size={62} stroke={8} />}
          </div>
          <div className="tile-f">
            {tile.ring !== undefined ? (
              <small>{tile.sub}</small>
            ) : (
              <>
                <DeltaChip value={tile.delta ?? 0} unit={tile.unit} invert={tile.invert} />
                <small>vs {PREVIOUS_PERIOD[range]}</small>
                {tile.spark && (
                  <Sparkline
                    values={tile.spark}
                    color={isGoodDelta(tile.delta ?? 0, tile.invert) ? "var(--mint)" : "var(--rose)"}
                  />
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
