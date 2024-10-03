import { Clear, Search } from "@mui/icons-material";
import { IconButton, InputAdornment, InputBase, Paper } from "@mui/material";

type SearchBarProps = {
  query: string;
  setQuery: (val: string) => void;
  customStyles?: any;
  customInputStyles?: any;
  customIconButtonStyles?: any;
};

const initialSx = {
  p: "2px 4px",
  display: "flex",
  alignItems: "center",
  width: 300,
  marginLeft: "10px",
  backgroundColor: "transparent",
  boxShadow: "none",
  border: "2px solid #2059EE",
};

const initialInputSx = {
  ml: 1,
  flex: 1,
};

export default function SearchBar(props: SearchBarProps) {
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setQuery(event.target.value);
  };

  const handleClearQuery = () => {
    props.setQuery("");
  };

  const initialIconButtonSx = {
    p: "10px",
    visibility: props.query.length > 0 ? "visible" : "hidden",
  };

  return (
    <Paper component="form" sx={{ ...initialSx, ...props.customStyles }}>
      <InputBase
        value={props.query}
        onChange={handleQueryChange}
        sx={{ ...initialInputSx, ...props.customInputStyles }}
        placeholder="Search"
        inputProps={{ "aria-label": "search google maps" }}
        startAdornment={
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        }
      />

      <IconButton
        type="button"
        sx={{ ...initialIconButtonSx, ...props.customIconButtonStyles }}
        aria-label="search"
        onClick={handleClearQuery}
      >
        <Clear />
      </IconButton>
    </Paper>
  );
}
