import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useContext,
} from "react";
import LiveClassAPI from "../apis/LiveClassAPI";
import EditLiveClassModal from "../modals/EditLiveClassModal";
import { Scheduler } from "@aldabil/react-scheduler";
import { UserContext } from "../App";
import CopyToClipboardButton from "../components/ClipBoard";
import { Button } from "@/components/ui/button";
import CreateLiveClassModal from "@/modals/CreateLiveClassModal";
import CreateNotificationModal from "@/modals/CreateNotificationModal";
import { Role } from "@/types/app";
import { LiveClassData } from "@/modals/types";
import { Paperclip, Users } from "lucide-react";
import { formatTimeHHMM } from "@/utils/formatTime";
import { Eventar, SpinnerVariant, CalendarEvent } from "eventar";
import "eventar/styles.css";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return { isOpen, open, close };
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    padding: "10px 20px",
    width: "100%",
    backgroundColor: "#fff",
    border: "1px solid #EFF6FF",
    boxShadow: "0px 5px 8px 0px #00000033",
  },
  meetingLink: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#2059EE",
    textTransform: "none",
  },
};

interface FormattedData {
  meetingId: number;
  seriesId: number;
  title: string;
  meetingLink: string;
  course: string;
  start: Date;
  end: Date;
  id: string;
  event_id: number;
  heading: string;
  batch: string;
  duration: number;
  meetingPlatform: string;
  color: string;
}

const Homepage = () => {
  const { role, userName } = useContext(UserContext);

  const createLiveClassModal = useModal();
  const editLiveClassModal = useModal();
  const createNotificationModal = useModal();

  const [formatedData, setFormatedData] = useState<CalendarEvent[]>([]);
  const [liveClassMeetingId, setLiveClassMeetingId] = useState<number | null>(
    null
  );
  const [classDetails, setClassDetails] = useState<{ data: LiveClassData }>({
    data: {} as LiveClassData,
  });
  const [liveClassUpdated, setLiveClassUpdated] = useState(false);
  const [liveClassCreated, setLiveClassCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);

  const fetchLiveClasses = useCallback(async () => {
    const todaysDate = new Date();
    const date30DaysLater = new Date();
    date30DaysLater.setDate(todaysDate.getDate() + 30);

    const formatDate = (date: Date): string => {
      return date.toISOString().slice(0, 10);
    };

    try {
      const rawData = await LiveClassAPI.getLiveClasses(
        formatDate(todaysDate),
        formatDate(date30DaysLater)
      );
      // console.log("rawData", rawData);

      if (rawData) {
        const formattedData = rawData.map((event, index) => ({
          id: index.toString(),
          meeting_id: event.meeting_id,
          series_id: event.series_id,
          title: event.title,
          meetingLink: event.link,
          description: event.course,
          start: new Date(event.start_timestamp),
          end: new Date(event.end_timestamp),
          // color: "green",
          batch: event.batch,
          course: event.course,
          duration: Number(event.duration),
          meetingPlatform: "Teams Meeting",
        }));
        console.log("formattedData", formattedData);
        setFormatedData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching live classes:", error);
    }
  }, []);

  const fetchClassDetails = async (classId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await LiveClassAPI.getLiveClassDetails(classId);
      if (!data || !data.data) {
        throw new Error("Failed to fetch class details");
      }
      setClassDetails(data);
      editLiveClassModal.open();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while fetching class details";
      setError(errorMessage);
      console.error("Error fetching class details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveClasses();
    fetchDashboardData();
  }, [fetchLiveClasses, liveClassUpdated, liveClassCreated]);

  const liveClassesSchedule = useMemo(() => formatedData, [formatedData]);

  const fetchMeetingJoinLink = async () => {
    try {
      const resp = await LiveClassAPI.getMeetingJoinLink();
      window.open(resp.joining_url, "_blank");
    } catch (error) {
      console.error("Error fetching meeting link:", error);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const resp = await LiveClassAPI.getStudentDashboard();
      setDashboardData(resp);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-blue-50 p-10 pt-8">
      {/* loading */}
      {role === Role.NO_ROLE && (
        <div className="flex justify-center items-center h-full w-full min-h-screen">
          <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-2 h-16 w-16" />
        </div>
      )}

      {/* Cards here */}
      {role && role === Role.STUDENT && dashboardData && (
        <div className="flex flex-col gap-5 mb-5">
          {/* Heading  */}
          <h2 className="text-xl font-semibold p-6 bg-gradient-to-r from-[#2059EE] to-[#6992FF] text-white rounded-lg">
            Welcome, {userName}!
          </h2>

          {/* Cards  */}
          <div className="flex flex-row gap-4">
            {dashboardData?.map((data: any, index: number) => (
              <DashboardCard key={index} {...data} />
            ))}
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold text-[#333] mb-5">
        {role === Role.COURSE_PROVIDER_ADMIN ? "Live Classes" : "My Schedule"}{" "}
      </h1>

      {/* {role && role !== Role.NO_ROLE && (
        <div className="z-0">
          <Scheduler
            height={window.innerHeight * 0.7}
            view="month"
            events={liveClassesSchedule}
            deletable={false}
            editable={false}
            customViewer={(event) => (
              <div style={styles.container as React.CSSProperties}>
                <p style={{ fontSize: "16px", color: "#333" }}>
                  {event.heading}
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {event.title} - {event.course} - {event.batch}
                </p>
                <p style={{ fontSize: "14px", color: "#333" }}>
                  {event.start.toLocaleTimeString()} -{" "}
                  {event.end.toLocaleTimeString()}
                </p>

                <div className="flex items-center gap-2 p-1">
                  <Button
                    variant={"primary"}
                    disabled={event.meetingLink.length === 0}
                    onClick={() => {
                      if (role === Role.COURSE_PROVIDER_ADMIN) {
                        window.open(event.meetingLink, "_blank");
                      } else {
                        fetchMeetingJoinLink();
                      }
                    }}
                  >
                    Join
                  </Button>

                  {role === Role.COURSE_PROVIDER_ADMIN && (
                    <Button
                      variant={"primary"}
                      disabled={isLoading}
                      onClick={() => {
                        if (!isLoading) {
                          fetchClassDetails(event.seriesId);
                          setLiveClassMeetingId(event.meetingId);
                        }
                      }}
                    >
                      {isLoading ? "Loading..." : "Edit"}
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-2 p-1">
                  <Users />
                  <p style={{ fontSize: "14px", color: "#333" }}>
                    {event.meetingPlatform}
                  </p>
                </div>
                <div
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <Paperclip style={{ color: "#2059EE" }} />
                  <p style={styles.meetingLink as React.CSSProperties}>
                    Meeting Link
                  </p>
                  <CopyToClipboardButton
                    text={event.meetingLink}
                    role={role}
                  />

<Eventar
        events={[]}
        navigation={true}
        showPastDates={false}
        views={["day", "week", "month", "year"]}
        defaultView="month"
        yearRange={["2025", "2024"]}
        isLoading={isLoading}
        error={error ?? ""}
        theme="light"
        defaultModalConfig={{
          disableActionButton: true,
          showModalHeaderStrip: true,
        }}
        spinnerComponent={SpinnerVariant.BARS}
      />
                </div>
              </div>
            )}
          />
        </div>
      )} */}

      {role && role !== Role.NO_ROLE && (
        <div>
          <Eventar
            events={liveClassesSchedule}
            isLoading={isLoading}
            error={error ?? ""}
            navigation={true}
            showPastDates={false}
            views={["day", "week", "month", "year"]}
            defaultView="month"
            yearRange={["2025"]}
            theme="light"
            defaultModalConfig={{
              disableActionButton: true,
              showModalHeaderStrip: true,
            }}
            spinnerComponent={SpinnerVariant.BARS}
          />
        </div>
      )}

      {role === Role.COURSE_PROVIDER_ADMIN && (
        <div className="flex flex-row gap-2 mt-2">
          <Button variant={"primary"} onClick={createLiveClassModal.open}>
            Add New Live Class
          </Button>

          <Button variant={"primary"} onClick={createNotificationModal.open}>
            Create Notification
          </Button>
        </div>
      )}

      {createLiveClassModal.isOpen && (
        <CreateLiveClassModal
          close={createLiveClassModal.close}
          submit={createLiveClassModal.close}
          isLiveClassCreated={setLiveClassCreated}
        />
      )}

      {editLiveClassModal.isOpen && (
        <EditLiveClassModal
          open={editLiveClassModal.isOpen}
          close={editLiveClassModal.close}
          submit={editLiveClassModal.close}
          meetingId={liveClassMeetingId?.toString() || ""}
          data={classDetails}
          isLiveClassUpdated={setLiveClassUpdated}
        />
      )}

      {createNotificationModal.isOpen && (
        <CreateNotificationModal
          open={createNotificationModal.isOpen}
          close={createNotificationModal.close}
        />
      )}
    </div>
  );
};

export default Homepage;

const DashboardCard = ({
  card_type,
  course_name,
  course_hours,
  total_time_spent,
  concent_form_link,
}: {
  card_type: string;
  course_name: string;
  course_hours: number;
  total_time_spent: number;
  concent_form_link: string;
}) => {
  return (
    <div className="flex flex-col bg-white shadow-md rounded w-full max-w-[450px] h-52">
      <div id="card-header">
        {card_type && card_type === "certificate" && (
          <h3 className="text-lg font-bold bg-[#F3474A] p-4 text-white rounded-t">
            Earn Your Certificate!
          </h3>
        )}
        {card_type && card_type === "form" && (
          <h3 className="text-lg font-bold bg-[#2059EE] p-4 text-white rounded-t">
            Pre-Register for Certificate
          </h3>
        )}
      </div>

      <div id="card-body" className="flex flex-col p-6 pt-4 relative h-full">
        {card_type && card_type === "certificate" && (
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-1">
              <p className="text-base font-semibold">{course_name}</p>
              <span className="text-sm text-gray-500">
                Complete {course_hours} hours & achieve your certificate!
              </span>
            </div>
            <span>
              Completed hours: {formatTimeHHMM(Math.ceil(total_time_spent))}
            </span>
            <span>
              Remaining hours:{" "}
              {formatTimeHHMM(Math.floor(course_hours * 60 - total_time_spent))}
            </span>
          </div>
        )}

        {card_type && card_type === "form" && (
          <div className="flex flex-col gap-1 justify-between h-full">
            <span className="text-base">
              Submit the self-certification form to be eligible for your course
              certificate.
            </span>

            {/* form here */}
            <Button
              className="w-max border-[#2059EE] rounded-lg bg-[#EFF6FF]"
              variant={"outline"}
              onClick={() => {
                window.open(concent_form_link, "_blank");
              }}
            >
              <span className="text-[#2059EE] font-semibold mx-3">
                View Form
              </span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
