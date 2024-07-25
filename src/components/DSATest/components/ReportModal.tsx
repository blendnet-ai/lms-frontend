import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";

export default function ReportModal({
  openModal,
  closeModal,
  customFunction,
}: {
  openModal: boolean;
  closeModal: () => void;
  customFunction: () => void;
}) {
  return (
    <Modal
      open={openModal}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
          width: "60%",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: "10px",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderBottom: "1px solid grey",
            padding: "10px",
          }}
        >
          <Typography variant="h6" component="h2">
            Want to report an issue?
          </Typography>
        </Box>

        {/* content  */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "30px",
            borderBottom: "1px solid grey",
          }}
        >
          <Typography variant="body1" component="p" sx={{}}>
            Here is some Troubleshooting Advice for various scenarios:
          </Typography>

          {/* scenarios */}
          <ol
            style={{
              fontWeight: "bold",
            }}
          >
            <li>
              Code is working as expected on Compile & Run but failing on
              submission.
              <ul
                style={{
                  fontWeight: "normal",
                }}
              >
                <li>
                  Avoid using static/global variables in your code as your code
                  is tested against multiple test cases and these tend to retain
                  their previous values.
                </li>
                <li>
                  Do not print anything unless mentioned in the problem
                  statement. Avoid unnecessary new line characters.
                </li>
              </ul>
            </li>

            <li>
              Software related troubleshooting.
              <ul
                style={{
                  fontWeight: "normal",
                }}
              >
                <li>Make sure you are not using ad-blockers.</li>
                <li>Keep your browser updated.</li>
              </ul>
            </li>
          </ol>

          <Typography variant="body1" component="p">
            <Typography
              component="span"
              sx={{
                color: "#2059EE",
                cursor: "pointer",
              }}
              onClick={customFunction}
            >
              Click here
            </Typography>{" "}
            if you still have something to report/suggest.
          </Typography>
        </Box>

        {/* Footer  */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "10px",
          }}
        >
          <Button
            onClick={closeModal}
            variant="contained"
            sx={{
              backgroundColor: "grey",
              color: "white",
              "&:hover": {
                backgroundColor: "grey",
                color: "white",
              },
            }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
