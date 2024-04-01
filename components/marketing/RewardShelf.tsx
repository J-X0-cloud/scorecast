import { REWARDS, REWARD_BALANCE } from "@/lib/data/contests";
import { Icon } from "@/components/ui/Icon";

export function RewardShelf() {
  return (
    <div className="rewards">
      <div className="rw-h">
        <b>Reward shelf</b>
        <span>
          {REWARD_BALANCE.rep} · <em>{REWARD_BALANCE.points}</em>
        </span>
      </div>
      <ul>
        {REWARDS.map((reward) => (
          <li key={reward.name}>
            <Icon name={reward.icon} />
            <span>{reward.name}</span>
            <b>{reward.cost}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}
