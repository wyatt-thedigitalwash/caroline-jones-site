// The invite's gold double-line border, stretched to the edges
// of the screen. Built from pieces cut out of the original art (corners,
// midpoint ornaments, and line strips that repeat along each edge). Purely
// decorative; positioning lives in funeral.css.
const pieces = [
  "corner-tl",
  "corner-tr",
  "corner-bl",
  "corner-br",
  "strip-top-l",
  "strip-top-r",
  "strip-bottom-l",
  "strip-bottom-r",
  "strip-left-t",
  "strip-left-b",
  "strip-right-t",
  "strip-right-b",
  "mid-top",
  "mid-bottom",
  "mid-left",
  "mid-right",
];

export default function FuneralFrame() {
  return (
    <div className="fi-frame" aria-hidden="true">
      {pieces.map((piece) => (
        <div key={piece} className={`fi-frame-${piece}`} />
      ))}
    </div>
  );
}
