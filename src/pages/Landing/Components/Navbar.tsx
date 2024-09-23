import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Backdrop,
  Box,
  Button,
  CardMedia,
  Drawer,
  IconButton,
  List,
  ListItem,
  Modal,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import GetStarted from "../Sections/GetStarted";
import { images } from "../../../assets";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface FadeProps {
  children: React.ReactElement<any>;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  ownerState?: any;
}

// react spring for modal animation
const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref
) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null as any, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null as any, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
};

function HideOnScroll(props: any) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const Navbar = (props: any) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      {" "}
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <GetStarted
              maxWidth="55rem"
              outerPadding={{
                xs: "2rem 1rem",
                sm: "2rem 1rem",
              }}
              close={handleClose}
              icon={true}
            />
          </Box>
        </Fade>
      </Modal>
      <HideOnScroll {...props}>
        <AppBar
          sx={{
            backgroundColor: "white",
            height: "50px",
            color: "black",
            boxShadow: "none",
            padding: {
              xs: "0rem 2rem",
              sm: "0rem 4rem",
              md: "0rem 8rem",
            },
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              maxWidth: "75rem",
              margin: "auto",
            }}
          >
            {/* Logo  */}
            <CardMedia
              component="img"
              sx={{
                width: "100px",
                objectFit: "contain",
                cursor: "pointer",
              }}
              image={images.sakshamLogo}
              alt="logo"
              onClick={() => {
                window.location.href = "/";
              }}
            />
            {/* Button groups, only on desktop*/}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: "1rem",
              }}
            >
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "white",
                  padding: "0.4rem 1.4rem",
                  color: "#2059EE",
                  borderRadius: "10px",
                  border: "1px solid #2059EE",
                  boxShadow: "1px 10px 12.7px 0px #3177E13D",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#2059EE",
                    border: "1px solid #2059EE",
                  },
                }}
                onClick={() => navigate("/login")}
              >
                <Typography
                  sx={{
                    color: "#2059EE",
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: "0.8rem",
                  }}
                >
                  Login
                </Typography>
              </Button>
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "#2059EE",
                  padding: "0.4rem 1.4rem",
                  color: "white",
                  borderRadius: "10px",
                  boxShadow: "1px 10px 12.7px 0px #3177E13D",
                  "&:hover": {
                    backgroundColor: "#2059EE",
                  },
                }}
                onClick={handleOpen}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: "0.8rem",
                  }}
                >
                  Get Started
                </Typography>
              </Button>
            </Box>

            {/* Mobile Menu */}
            <Box
              sx={{
                display: { xs: "none", md: "none" },
                ml: "auto",
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Mobile Drawer */}
            <Drawer anchor="bottom" open={drawerOpen} onClose={toggleDrawer}>
              <List>
                <ListItem>
                  <Button
                    variant="text"
                    sx={{ width: "100%" }}
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                </ListItem>
              </List>
            </Drawer>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </div>
  );
};

export default Navbar;
