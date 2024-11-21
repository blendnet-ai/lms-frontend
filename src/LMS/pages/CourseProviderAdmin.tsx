import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import LiveClassAPI, { CourseProvider } from "../apis/LiveClassAPI";
import { BatchCard, CoursesCard } from "../components/Cards";
import CreateLiveClassModal from "../modals/CreateLiveClassModal";

const CourseProviderAdmin = () => {
  const [courseProvider, setCourseProvider] = useState({} as CourseProvider);
  const [courseProviderCourses, setCourseProviderCourses] = useState([]);
  const [courseId, setCourseId] = useState(0);
  const [batches, setBatches] = useState([]);
  const [batchId, setBatchId] = useState(0);

  // Modal configs
  const [openCreateLiveClassModal, setOpenCreateLiveClassModal] =
    useState(false);
  const handleCreateLiveClassModalOpen = () =>
    setOpenCreateLiveClassModal(true);
  const handleCreateLiveClassModalClose = () =>
    setOpenCreateLiveClassModal(false);

  // Fetch course provider
  useEffect(() => {
    const fetchCourseProvider = async () => {
      const data = await LiveClassAPI.getCourseProvider();
      setCourseProvider(data);
    };
    fetchCourseProvider();
  }, []);

  // Fetch courses for course provider
  useEffect(() => {
    if (courseProvider.id) {
      const fetchCourseProviderCourses = async () => {
        const data = await LiveClassAPI.getCoursesForCourseProvider(
          courseProvider.id
        );
        setCourseProviderCourses(data);
      };
      fetchCourseProviderCourses();
    }
  }, [courseProvider]);

  // Fetch batches by course provider id
  useEffect(() => {
    const fetchBatchesByCourseProviderId = async () => {
      if (courseId) {
        const data = await LiveClassAPI.getBatchesByCourseProviderId(courseId);
        console.log(data);
        setBatches(data);
      }
    };
    fetchBatchesByCourseProviderId();
  }, [courseId]);

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#EFF6FF",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        padding: "20px",
        mt: "3.5rem",
      }}
    >
      {/* Cards */}
      {batches.length === 0 && courseProviderCourses && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {courseProviderCourses.map((course: any) => (
            <CoursesCard
              key={course.id}
              id={course.id}
              title={course.title}
              code={course.code}
              setProviderId={setCourseId}
            />
          ))}
        </Box>
      )}

      {/* Batches */}
      {batches && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {batches.map((batch: any) => (
            <BatchCard
              key={batch.id}
              id={batch.id}
              title={batch.title}
              openModal={handleCreateLiveClassModalOpen}
              setIdOfBatch={setBatchId}
            />
          ))}
        </Box>
      )}

      <CreateLiveClassModal
        open={openCreateLiveClassModal}
        close={handleCreateLiveClassModalClose}
        submit={handleCreateLiveClassModalClose}
        batchId={batchId}
      />
    </Box>
  );
};

export default CourseProviderAdmin;
