import { Clear, Search } from "@mui/icons-material";
import { IconButton, InputAdornment, InputBase, Paper } from "@mui/material";

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
        backgroundColor: "transparent",
        boxShadow: "none",
        border: "2px solid #2059EE",
      }}
    >
      <InputBase
        value={props.query}
        onChange={handleQueryChange}
        sx={{ ml: 1, flex: 1 }}
        placeholder="search"
        inputProps={{ "aria-label": "search google maps" }}
        startAdornment={
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        }
      />

      <IconButton
        type="button"
        sx={{
          p: "10px",
          visibility: props.query.length > 0 ? "visible" : "hidden",
        }}
        aria-label="search"
        onClick={handleClearQuery}
      >
        <Clear />
      </IconButton>
    </Paper>
  );
}
