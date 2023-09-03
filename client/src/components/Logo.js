import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
export default function Logo({ width, height, onClick, cursor }) {
  return (
    <ThumbsUpDownIcon
      onClick={onClick}
      sx={{
        width,
        height,
        WebkitTransform: "scaleX(-1)",
        transform: "scaleX(-1)",
        cursor,
      }}
    />
  );
}
