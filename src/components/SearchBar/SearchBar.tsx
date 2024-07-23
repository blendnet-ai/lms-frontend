import { Clear } from "@mui/icons-material";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";

type SearchBarProps = {
  query: string;
  setQuery: (val: string) => void;
};

export default function SearchBar(props: SearchBarProps) {
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setQuery(event.target.value);
  };

  const handleClearQuery = () => {
    props.setQuery("");
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 300,
        marginLeft: "10px",
      }}
    >
      <InputBase
        value={props.query}
        onChange={handleQueryChange}
        sx={{ ml: 1, flex: 1 }}
        placeholder=""
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={handleClearQuery}
      >
        <Clear />
      </IconButton>
    </Paper>
  );
}
