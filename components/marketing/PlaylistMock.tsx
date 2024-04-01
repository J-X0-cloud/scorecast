import { LOBBY_PLAYLIST } from "@/lib/data/dashboards";
import { Icon } from "@/components/ui/Icon";
import { LiveDot } from "@/components/ui/LiveDot";

/** A screen's rotation playlist, with the current slide highlighted and a progress bar. */
export function PlaylistMock() {
  return (
    <div className="playlist">
      <div className="pl-h">
        <Icon name="tv" />
        <div>
          <b>{LOBBY_PLAYLIST.screen}</b>
          <small>{LOBBY_PLAYLIST.summary}</small>
        </div>
        <LiveDot label="On air" />
      </div>
      <ol>
        {LOBBY_PLAYLIST.slides.map((slide, i) => (
          <li key={slide.title} className={i === 0 ? "on" : ""}>
            <Icon name={slide.icon} />
            <span>{slide.title}</span>
            <em>{slide.duration}</em>
          </li>
        ))}
      </ol>
      <div className="pl-prog">
        <i />
      </div>
    </div>
  );
}
