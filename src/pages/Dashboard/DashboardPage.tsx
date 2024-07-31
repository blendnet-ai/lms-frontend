import { Avatar, Box, CardMedia, Chip, Link, Typography } from "@mui/material";
import { icons } from "../../assets";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";
import DashboardAPI from "../../apis/DashboardAPI";
import { useNavigate } from "react-router-dom";

const cards = [
  {
    title: "DSA & Coding",
    description: "Practice DSA problems",
    image: icons.DsaCoding,
    isLocked: false,
    bgColor: "#FFE7EC",
    borderColor: "#EC6980",
  },
  {
    title: "Mock Interviews",
    description: "Interview practice for top companies",
    image: icons.aiInterview,
    isLocked: true,
    bgColor: "#FEF5D8",
    borderColor: "#FFD95B",
  },
  {
    title: "Projects",
    description: "100+ Real World Projects",
    image: icons.projects,
    isLocked: true,
    bgColor: "#FFEEE7",
    borderColor: "#FF9A6C",
  },
];

const leaderboardData = [
  {
    id: 1,
    name: "Yasir",
    points: 500,
    image: icons.avatar5,
  },
  {
    id: 2,
    name: "Megha",
    points: 300,
    image: icons.avatar1,
  },
  {
    id: 3,
    name: "Sunil",
    points: 200,
    image: icons.avatar2,
  },
  {
    id: 4,
    name: "Deepak",
    points: 100,
    image: icons.avatar3,
  },
  {
    id: 5,
    name: "Sayali",
    points: 80,
    image: icons.avatar4,
  },
  {
    id: 6,
    name: "Jose",
    points: 54,
    image: icons.avatar5,
  },
  {
    id: 7,
    name: "Kriti",
    points: 40,
    image: icons.avatar6,
  },
  {
    id: 8,
    name: "Savita",
    points: 30,
    image: icons.avatar7,
  },
  {
    id: 9,
    name: "Anil",
    points: 28,
    image: icons.avatar7,
  },
  {
    id: 10,
    name: "Ramesh",
    points: 5,
    image: icons.avatar7,
  },
];

const indexes = [1, 2, 3, 4];
export default function Dashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<any>([]);

  const fetchData = async () => {
    const data = await DashboardAPI.getDashboard();
    setDashboardData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const activities = [
    {
      id: 1,
      title: "Total Chat Sessions",
      value: dashboardData.total_chat_sessions,
      icon: icons.activityMessages,
      bgColor: "#E3FFF4",
    },
    {
      id: 2,
      title: "Total Time Spend",
      value: dashboardData.total_time_spent?.toString().split(".")[0] + " mins",
      icon: icons.activityClock,
      bgColor: "#FFF6F7",
    },
    {
      id: 3,
      title: "Avg Time per Ques",
      value:
        dashboardData.avg_time_per_question?.toString().split(".")[0] + " mins",
      icon: icons.activityTimer,
      bgColor: "#FFEDDD",
    },
    {
      id: 4,
      title: "Success Rate",
      value: dashboardData.success_rate + "%",
      icon: icons.activiityRate,
      bgColor: "#DFFCFF",
    },
  ];

  const data = [
    {
      subject: "Code Quality",
      A: dashboardData?.performance_overview?.code_quality,
    },
    {
      subject: "Efficiency",
      A: dashboardData?.performance_overview?.code_efficiency,
    },
    {
      subject: "Correctness",
      A: dashboardData?.performance_overview?.code_correctness,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
      }}
    >
      {/* <Sidebar /> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          backgroundColor: "#EFF6FF",
        }}
      >
        {/* logo header  */}
        {/* <Box
          sx={{
            position: "sticky",
            top: 0,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: "10px",
            borderBottom: "2px solid white",
          }}
        >
          <CardMedia
            component="img"
            image={images.sakshamLogo}
            sx={{
              width: "160px",
              height: "60px",
              objectFit: "contain",
              ml: "10px",
            }}
          />

          <Button
            sx={{
              backgroundColor: "#2059EE",
              color: "#fff",
              borderRadius: "10px",
              padding: "5px 10px",
              marginLeft: "auto",
              marginRight: "20px",
              marginTop: "10px",
              "&:hover": { backgroundColor: "#2059EE" },
            }}
            onClick={logOut}
          >
            Logout
          </Button>
        </Box> */}

        {/* content  */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
          }}
        >
          {/* left */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "70%",
              padding: "20px",
              height: "100%",
            }}
          >
            {/* welcome  */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "auto",
                padding: "30px 10px 30px 60px",
                borderRadius: "10px",
                background: "linear-gradient(90deg, #2059EE 0%, #6992FF 100%)",
                color: "#fff",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                {/* date  */}
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "16px",
                  }}
                >
                  {new Date().toDateString()}
                </Typography>
                {/* name  */}
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "24px",
                  }}
                >
                  Welcome back,{" "}
                  {dashboardData.name ? dashboardData.name : "User"}!
                </Typography>
                {/* problems  */}
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "24px",
                    mt: "10px",
                    fontWeight: "bold",
                  }}
                >
                  Total Problems Solved: {dashboardData.total_problems_solved}
                </Typography>
              </Box>
              {/* vectore girl  */}
              <CardMedia
                component="img"
                image={icons.dashboardGirl}
                sx={{
                  position: "absolute",
                  width: "auto",
                  height: "140px",
                  objectFit: "contain",
                  right: "20px",
                  bottom: "0px",
                }}
              />
            </Box>

            {/* AI Tools */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "auto",
                height: "100%",
                padding: "20px 0 0 0",
              }}
            >
              {/* AI Tools heading  */}
              <Typography
                variant="h6"
                sx={{ fontSize: "24px", fontWeight: "bold" }}
              >
                AI Tools
              </Typography>
              {/* AI Tools cards  */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "20px 0",
                  gap: "20px",
                }}
              >
                {cards.map((card) => (
                  <Box
                    onClick={() =>
                      navigate(card.isLocked ? "#" : "/dsa-practice-list")
                    }
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: card.bgColor,
                      padding: "20px",
                      borderRadius: "10px",
                      border: `1px solid ${card.borderColor}`,
                      width: "100%",
                      position: "relative",
                      opacity: card.isLocked ? 0.4 : 1,
                      cursor: card.isLocked ? "not-allowed" : "pointer",
                      minHeight: "160px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "18px", fontWeight: "bold" }}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        width: "60%",
                        fontSize: "16px",
                        color: "#888",
                      }}
                    >
                      {card.description}
                    </Typography>

                    {/* locked icon  */}
                    {card.isLocked && (
                      <CardMedia
                        component="img"
                        image={icons.lock}
                        sx={{
                          position: "absolute",
                          right: "20px",
                          top: "20px",
                          width: "20px",
                          height: "20px",
                          objectFit: "contain",
                        }}
                      />
                    )}

                    {/* card image  */}
                    <CardMedia
                      component="img"
                      image={card.image}
                      sx={{
                        position: "absolute",
                        bottom: "6px",
                        right: "6px",
                        width: "auto",
                        height: "110px",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                  // </Link>
                ))}
              </Box>
            </Box>

            {/* Your Activities */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "auto",
                height: "100%",
                padding: "20px 0 0 0",
              }}
            >
              {/* Your Activities heading  */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: "24px", fontWeight: "bold" }}
                >
                  Your Activities
                </Typography>
                <Box
                  sx={{ display: "flex", flexDirection: "row", gap: "20px" }}
                >
                  <CardMedia
                    component="img"
                    image={icons.practiceHistory}
                    sx={{
                      width: "20px",
                      height: "20px",
                      objectFit: "contain",
                      cursor: "pointer",
                    }}
                  />
                  <Link
                    href="/dsa-practice-history"
                    sx={{
                      fontSize: "16px",
                      textDecoration: "underline",
                      color: "#2059EE",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Practice History
                  </Link>
                </Box>
              </Box>

              {/* Your Activities cards  */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "20px 0",
                  gap: "20px",
                }}
              >
                {activities.map((activity) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      padding: "20px",
                      backgroundColor: "white",
                      borderRadius: "10px",
                      width: "100%",
                      gap: "10px",
                    }}
                  >
                    {/* icon  */}
                    <CardMedia
                      component="img"
                      image={activity.icon}
                      sx={{
                        width: "30px",
                        height: "30px",
                        objectFit: "contain",
                        backgroundColor: activity.bgColor,
                        borderRadius: "50%",
                        padding: "10px",
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        {activity.value}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontSize: "14px", fontWeight: "normal" }}
                      >
                        {activity.title}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Competency Analysis */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "auto",
                height: "100%",
                padding: "20px 0 0 0",
              }}
            >
              {/* Competency Analysis heading  */}
              <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
                Competency Analysis
              </Typography>

              {/* Competency Analysis cards  */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  padding: "20px 0",
                  gap: "20px",
                }}
              >
                {/* left cards  */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "40%",
                    gap: "20px",
                  }}
                >
                  {/* Strengths  */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "20px",
                      backgroundColor: "#fff",
                      borderRadius: "10px",
                      height: "100%",
                    }}
                  >
                    {/* header  */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      {/* icon  */}
                      <CardMedia
                        component="img"
                        image={icons.competencyStrength}
                        sx={{
                          width: "30px",
                          height: "30px",
                          objectFit: "contain",
                          backgroundColor: "#FFF6F7",
                          borderRadius: "10px",
                          padding: "5px",
                        }}
                      />

                      {/* title  */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        Strengths in Focus
                      </Typography>
                    </Box>
                    {/* tags  */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        mt: "10px",
                        flexWrap: "wrap",
                      }}
                    >
                      {dashboardData?.strengths?.map((strength: string) => (
                        <Chip
                          key={strength}
                          label={strength}
                          sx={{
                            backgroundColor: "#fff",
                            color: "#2059EE",
                            border: "1px solid #2059EE",
                            borderRadius: "10px",
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                  {/* Areas of Improvement */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "20px",
                      backgroundColor: "#fff",
                      borderRadius: "10px",
                      height: "100%",
                    }}
                  >
                    {/* header  */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      {/* icon  */}
                      <CardMedia
                        component="img"
                        image={icons.competencyImprovement}
                        sx={{
                          width: "30px",
                          height: "30px",
                          objectFit: "contain",
                          backgroundColor: "#FFEDDD",
                          borderRadius: "10px",
                          padding: "5px",
                        }}
                      />

                      {/* title  */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        Areas for Improvement
                      </Typography>
                    </Box>
                    {/* tags  */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        mt: "10px",
                        flexWrap: "wrap",
                      }}
                    >
                      {dashboardData?.weaknesses?.map((improvement: string) => (
                        <Chip
                          key={improvement}
                          label={improvement}
                          sx={{
                            backgroundColor: "#fff",
                            color: "#2059EE",
                            border: "1px solid #2059EE",
                            borderRadius: "10px",
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>

                {/* right chart  */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "60%",
                    padding: "20px",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                  }}
                >
                  <RadarChart
                    cx={240}
                    cy={170}
                    outerRadius={150}
                    width={500}
                    height={260}
                    data={data}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} />
                    <Tooltip />
                    <Radar
                      dataKey="A"
                      stroke="#3D6BEF"
                      fill="#3D6BEF"
                      fillOpacity={0.6}
                      width={500}
                      height={500}
                      dot={{
                        fill: "#FF725E",
                        stroke: "#FF725E",
                        strokeWidth: 4,
                      }}
                    />
                    <Legend
                      verticalAlign="top"
                      content={
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "16px",
                              color: "#000",
                              fontWeight: "bold",
                            }}
                          >
                            Percentage Score
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "5px",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "14px",
                                color: "#000",
                              }}
                            >
                              {`Code Quality : ${dashboardData?.performance_overview?.code_quality}%`}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                color: "#000",
                              }}
                            >
                              {`Efficiency : ${dashboardData?.performance_overview?.code_efficiency}%`}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                color: "#000",
                              }}
                            >
                              {`Correctness : ${dashboardData?.performance_overview?.code_correctness}%`}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </RadarChart>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* right */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "30%",
              padding: "20px",
              backgroundColor: "#EFF6FF",
            }}
          >
            {/* Daily Streaks  */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "auto",
                padding: "25px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            >
              {/* heading  */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    backgroundColor: "#2059EE",
                    padding: "10px 60px",
                    borderRadius: "10px",
                    color: "#fff",
                    textAlign: "center",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  Daily Streak
                </Typography>
              </Box>

              {/* streaks  */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  mt: "20px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "16px",
                    color: "#888",
                  }}
                >
                  Current Streak: 1 days
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "16px",
                    color: "#888",
                  }}
                >
                  Longest Streak: 1 days
                </Typography>
              </Box>

              {/* Month  */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  mt: "10px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "16px",
                    color: "#000",
                    fontWeight: "bold",
                  }}
                >
                  July 2024
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                  }}
                >
                  <ChevronLeftIcon
                    sx={{
                      cursor: "pointer",
                      border: "1px solid #2059EE",
                      borderRadius: "50%",
                    }}
                  />
                  <ChevronRightIcon
                    sx={{
                      cursor: "pointer",
                      border: "1px solid #2059EE",
                      borderRadius: "50%",
                    }}
                  />
                </Box>
              </Box>

              {/* calendar  */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  mt: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: "5px",
                  }}
                >
                  {/* day count  */}
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "5px",
                          color: "black",
                          borderBottom: "1px solid #888",
                        }}
                      >
                        {day}
                      </Box>
                    )
                  )}

                  {/* dates  */}
                  {Array(7)
                    .fill(0)
                    .map((_, index) => (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "5px",
                          backgroundColor: indexes.includes(index)
                            ? "#00995B"
                            : "white",
                          color: indexes.includes(index) ? "white" : "black",
                          borderRadius: "5px",
                        }}
                      >
                        {index + 1}
                      </Box>
                    ))}
                </Box>
              </Box>
            </Box>

            {/* leaderboard  */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "auto",
                padding: "25px",
                backgroundColor: "white",
                borderRadius: "10px",
                mt: "20px",
              }}
            >
              {/* heading  */}
              <Typography
                variant="h6"
                sx={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#2059EE",
                  textAlign: "center",
                  mb: "20px",
                }}
              >
                Leader Board
              </Typography>

              {/* points  */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#2059EE",
                  borderRadius: "10px",
                  padding: "16px",
                  gap: "10px",
                }}
              >
                <Typography
                  sx={{
                    borderRadius: "10px",
                    backgroundColor: "#5785fe",
                    padding: "10px",
                    color: "#fff",
                    textAlign: "center",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  #_
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "14px",
                      color: "#fff",
                    }}
                  >
                    Attempt more problems to earn points and feature on
                    leaderboard
                  </Typography>
                </Box>
              </Box>

              {/* leaderboard  */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  mt: "20px",
                  backgroundColor: "#efeefc",
                  padding: "20px",
                  borderRadius: "10px",
                  gap: "10px",
                  overflowY: "auto",
                  height: "500px",
                }}
              >
                {leaderboardData.map((leaderboard, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      padding: "10px",
                      backgroundColor: "#fff",
                      borderRadius: "10px",
                      gap: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        borderRadius: "50%",
                        padding: "0px 10px",
                        border: "1px solid #888",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "16px",
                          color: "#000",
                          fontWeight: "bold",
                        }}
                      >
                        {index + 1}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "10px",
                        width: "100%",
                      }}
                    >
                      <Avatar src={leaderboard.image} />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#000",
                            fontWeight: "bold",
                          }}
                        >
                          {leaderboard.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#0CAA6A",
                            fontWeight: "bold",
                          }}
                        >
                          {leaderboard.points} points
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
