import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Chip,
  Link,
  Typography,
} from "@mui/material";
import { icons, images as assestsImage } from "../../assets";
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
import useUserData from "../../hooks/useUserData";
import { motion } from "framer-motion";
import Streaks from "./components/Streaks";
import { hourMinFormat } from "../../utils/hourMinFormat";
import UserDataAPI from "../../apis/UserDataAPI";

const images = [
  icons.avatar1,
  icons.avatar2,
  icons.avatar3,
  icons.avatar4,
  icons.avatar5,
  icons.avatar6,
  icons.avatar7,
  icons.avatar4,
  icons.avatar2,
  icons.avatar3,
];

const medals = [icons.medal1, icons.medal2, icons.medal3];
export default function Dashboard() {
  const { name } = useUserData();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<any>([]);
  const [leaderboardData, setLeaderboardData] = useState<any>([]);
  const [isLab, setIsLab] = useState(false);

  const fetchUserData = async () => {
    const data = await UserDataAPI.getOnboardedUserData();
    if (data.has_lab) {
      setIsLab(true);
    }
  };
  const fetchData = async () => {
    const data = await DashboardAPI.getDashboard();
    setDashboardData(data);
  };

  const fetchLeaderBoradData = async () => {
    const data = await DashboardAPI.getLeaderboardData();
    setLeaderboardData(data);
  };

  useEffect(() => {
    fetchData();
    fetchUserData();
    fetchLeaderBoradData();
    console.log(dashboardData.leaderboard_rank);
  }, []);

  const activities = [
    {
      id: 1,
      title: "Problems Solved",
      value: dashboardData.total_problems_solved,
      icon: icons.activityProblems,
      bgColor: "#E3FFF4",
    },
    {
      id: 2,
      title: "Total Time Spend",
      value: hourMinFormat(parseInt(dashboardData.total_time_spent)),
      icon: icons.activityClock,
      bgColor: "#FFF6F7",
    },
    {
      id: 3,
      title: "Avg Time per Ques",
      value: hourMinFormat(parseInt(dashboardData.avg_time_per_question)),
      icon: icons.activityTimer,
      bgColor: "#FFEDDD",
    },
    {
      id: 4,
      title: "Success Rate",
      value: dashboardData.success_rate?.toString().split(".")[0] + "%",
      icon: icons.activiityRate,
      bgColor: "#DFFCFF",
    },
  ];

  const data = [
    {
      subject: "Code Quality",
      A: parseInt(dashboardData?.performance_overview?.code_quality),
      fullMark: 150,
    },
    {
      subject: "Efficiency",
      A: parseInt(dashboardData?.performance_overview?.code_efficiency),
      fullMark: 150,
    },
    {
      subject: "Correctness",
      A: parseInt(dashboardData?.performance_overview?.code_correctness),
      fullMark: 150,
    },
  ];

  const cards = [
    {
      id: 1,
      title: "Ask Disha",
      description: "Ask doubts, discuss, revise",
      image: icons.aiDisha,
      isLocked: false,
      route: "/doubt-solving",
    },
    {
      id: 2,
      title: "Coding & DSA Practice",
      description: "Practice DSA problems",
      image: icons.aiDsaCoding,
      isLocked: false,
      route: "/dsa-practice-list",
    },
    {
      id: 3,
      title: "Elab",
      description: "Complete Lab Assignments",
      image: icons.aiELab,
      isLocked: isLab ? false : true,
      route: "/dsa-lab",
    },
    {
      id: 4,
      title: "Resume",
      description: "AI powered resume builder",
      image: icons.aiResume,
      isLocked: false,
      route: "/resume",
    },
    {
      id: 5,
      title: "Mock Interviews",
      description: "Interview Preparation",
      image: icons.aiInterview,
      isLocked: true,
      route: "#",
    },
    {
      id: 6,
      title: "Projects",
      description: "Real world industry projects",
      image: icons.aiProjects,
      isLocked: true,
      route: "#",
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
              padding: "2rem",
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
                {/* name  */}
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "24px",
                  }}
                >
                  Welcome back, {name ? name : "User"}!
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
                  Talk to Disha
                </Typography>

                {/* talk now button */}
                <Button
                  sx={{
                    cursor: "pointer",
                    backgroundColor: "#fff",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#fff" },
                    mt: "10px",
                    padding: "10px 20px",
                    borderRadius: "10px",
                  }}
                  onClick={() => navigate("/doubt-solving")}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#215AEF",
                    }}
                  >
                    Talk Now!
                  </Typography>

                  <CardMedia
                    component="img"
                    image={icons.arrowMouse}
                    sx={{
                      position: "absolute",
                      bottom: "-20px",
                      right: "-20px",
                      width: "35px",
                      height: "35px",
                      objectFit: "contain",
                      marginLeft: "10px",
                    }}
                  />
                </Button>
              </Box>
              {/* vectore girl  */}
              <CardMedia
                component="img"
                image={assestsImage.bannerImage}
                sx={{
                  position: "absolute",
                  width: "auto",
                  height: "180px",
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
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  width: "100%",
                  padding: "20px 0",
                  gap: "20px",
                }}
              >
                {/* to show the card completely, but in locked  */}
                {cards.map((card) => (
                  <Box
                    onClick={() =>
                      navigate(card.route && !card.isLocked ? card.route : "#")
                    }
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      backgroundColor: "white",
                      padding: "20px",
                      borderRadius: "10px",
                      width: "100%",
                      opacity: card.isLocked ? 0.4 : 1,
                      cursor: card.isLocked ? "not-allowed" : "pointer",
                      gap: "10px",
                      position: "relative",
                    }}
                  >
                    {/* card vector  */}
                    <CardMedia
                      component="img"
                      image={card.image}
                      sx={{
                        width: "40px",
                        height: "40px",
                        objectFit: "contain",
                      }}
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        {card.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          color: "#888",
                        }}
                      >
                        {card.description}
                      </Typography>
                    </Box>

                    {card.isLocked && (
                      <CardMedia
                        component="img"
                        image={icons.lock}
                        sx={{
                          position: "absolute",
                          right: "10px",
                          top: "10px",
                          height: "20px",
                          width: "20px",
                          objectFit: "contain",
                        }}
                      />
                    )}
                  </Box>
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
                position: "relative",
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
                        width: "40px",
                        height: "40px",
                        objectFit: "contain",
                        backgroundColor: activity.bgColor,
                        borderRadius: "50%",
                        padding: "5px",
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

              {/* glassmorphisim */}
              {dashboardData?.total_problems_solved === 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(5px)",
                    borderRadius: "10px",
                    zIndex: 1,
                    cursor: "not-allowed",
                  }}
                />
              )}
            </Box>

            {/* Competency Analysis */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "auto",
                height: "100%",
                padding: "20px 0 0 0",
                position: "relative",
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
                          width: "40px",
                          height: "40px",
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
                      {dashboardData?.strengths
                        ?.slice(0, 4)
                        .map((strength: string) => (
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
                          width: "40px",
                          height: "40px",
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
                      {dashboardData?.weaknesses
                        ?.slice(0, 4)
                        .map((improvement: string) => (
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
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
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
                              {`Code Quality : ${parseInt(
                                dashboardData?.performance_overview
                                  ?.code_quality
                              )}%`}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                color: "#000",
                              }}
                            >
                              {`Efficiency : ${parseInt(
                                dashboardData?.performance_overview
                                  ?.code_efficiency
                              )}%`}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                color: "#000",
                              }}
                            >
                              {`Correctness : ${parseInt(
                                dashboardData?.performance_overview
                                  ?.code_correctness
                              )}%`}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </RadarChart>
                </Box>
              </Box>

              {/* glassmorphisim */}
              {dashboardData?.total_problems_solved === 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(5px)",
                    borderRadius: "10px",
                    zIndex: 1,
                    cursor: "not-allowed",
                  }}
                />
              )}

              {/* Overlay */}
              {dashboardData?.total_problems_solved === 0 && (
                <Box
                  component={motion.div}
                  animate={{
                    scale: [0, 1.1, 1],
                  }}
                  transition={{
                    delay: 0.5,
                    duration: 2,
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: "-30%",
                    left: "20%",
                    // transform: "translate(-50%, -80%)",
                    width: "60%",
                    height: "auto",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    zIndex: 1,
                    padding: "30px",
                  }}
                >
                  {/* center vector  */}
                  <CardMedia
                    component="img"
                    image={icons.practiceDsa}
                    sx={{
                      width: "200px",
                      height: "200px",
                      objectFit: "contain",
                    }}
                  />

                  {/* center text  */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      textAlign: "center",
                      mt: "20px",
                    }}
                  >
                    Start practicing DSA problems to unlock insights
                  </Typography>

                  {/* center button  */}
                  <Button
                    sx={{
                      backgroundColor: "#2059EE",
                      color: "#fff",
                      borderRadius: "10px",
                      padding: "10px 20px",
                      marginTop: "20px",
                      "&:hover": { backgroundColor: "#2059EE" },
                    }}
                    onClick={() => navigate("/dsa-practice-list")}
                  >
                    Start Now
                  </Button>
                </Box>
              )}
            </Box>
          </Box>

          {/* right */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "30%",
              padding: "2rem",
              backgroundColor: "#EFF6FF",
              height: "auto",
            }}
          >
            {/* Daily Streaks  */}
            <Streaks />

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
                height: "100%",
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
                  {dashboardData?.leaderboard_rank || "#_"}
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
                  height: "570px",
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
                      width: "100%",
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
                      <Avatar src={images[index]} />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#000",
                            fontWeight: "bold",
                          }}
                        >
                          {leaderboard.name || "User"}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#0CAA6A",
                            fontWeight: "bold",
                          }}
                        >
                          {leaderboard.score} points
                        </Typography>
                      </Box>

                      <img
                        src={medals[index]}
                        alt=""
                        style={{
                          marginLeft: "auto",
                        }}
                      />
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
