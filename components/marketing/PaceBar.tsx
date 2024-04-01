const MARKS = [
  { at: 0, label: "8 AM" },
  { at: 50, label: "1 PM" },
  { at: 100, label: "6 PM" },
];

/** Horizontal pacing strip: actual (bar), expected-by-now (marker) and projected finish. */
export function PaceBar() {
  return (
    <div className="pace">
      <div className="pace-h">
        <b>Revenue pacing</b>
        <span className="dl up">On pace for 104%</span>
      </div>
      <div className="pace-t">
        <i style={{ width: "68%" }} />
        <em style={{ left: "68%" }} />
        <b style={{ left: "71%" }} />
      </div>
      <div className="pace-x">
        {MARKS.map((m) => (
          <span key={m.label} style={{ left: `${m.at}%` }}>
            {m.label}
          </span>
        ))}
      </div>
      <small>Actual vs. where the team should be at 2:47 PM</small>
    </div>
  );
}

