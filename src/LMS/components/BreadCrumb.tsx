import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type BreadCrumbPage = {
  name: string;
  route: string;
};

type BreadCrumbProps = {
  previousPages: BreadCrumbPage[];
  currentPageName: string;
};

function BreadCrumb(props: BreadCrumbProps) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFF",
        padding: "20px",
      }}
    >
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {props.previousPages.map((page) => (
          <Link
            underline="hover"
            key="1"
            color="inherit"
            href="/"
            onClick={(
              event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
            ) => {
              event.preventDefault();
              navigate(page.route);
            }}
          >
            {page.name}
          </Link>
        ))}
        <Typography key="2" color="inherit" sx={{ color: "#000" }}>
          {props.currentPageName}
        </Typography>
        ,
      </Breadcrumbs>
    </Box>
  );
}

export default BreadCrumb;
