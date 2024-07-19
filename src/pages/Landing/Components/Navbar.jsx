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
  useScrollTrigger,
} from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import GetStarted from "../Sections/GetStarted";
import { images } from "../../../assets";
import { Menu as MenuIcon } from "@mui/icons-material";

// react spring for modal animation
const Fade = React.forwardRef(function Fade(props, ref) {
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
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
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

function HideOnScroll(props) {
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

const Navbar = (props) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

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
            height: "64px",
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
              padding: "0 !important",
              width: "100%",
              maxWidth: "75rem",
              margin: "auto",
            }}
          >
            {/* Logo  */}
            <CardMedia
              component="img"
              sx={{
                width: "120px",
                objectFit: "contain",
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
                sx={{
                  backgroundColor: "#2059EE",
                  color: "white",
                  borderRadius: "10px",
                  boxShadow: "1px 10px 12.7px 0px #3177E13D",
                  "&:hover": {
                    backgroundColor: "#2059EE",
                  },
                }}
                onClick={handleOpen}
              >
                Get Started
              </Button>
            </Box>

            {/* Mobile Menu */}
            <Box
              sx={{
                display: { xs: "block", md: "none" },
                ml: "auto",
              }}
            >
              <IconButton color="black" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Mobile Drawer */}
            <Drawer anchor="bottom" open={drawerOpen} onClose={toggleDrawer}>
              <List>
                <ListItem>
                  <Button variant="text" sx={{ width: "100%" }}>
                    Get Started
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
