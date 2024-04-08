import "./../styles/FsChapters.css";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import Button from "@mui/material/Button";
import { Chapter } from "../apis/VideoDataAPI";
import { getTimeDifference } from "../pages/Learning";

type ChapterProps = {
  chapter: Chapter;
  onChapterClicked: (arg0: Chapter) => void;
  i: number;
};

function FsChapter({ chapter, onChapterClicked, i }: ChapterProps) {
  return (
    <Button
      startIcon={<CloudUploadIcon />}
      sx={{ marginX: "5vw", borderRadius: 10, textTransform: "none" }}
      className="chapter-button"
      variant="contained"
      onClick={() => onChapterClicked(chapter)}
    >
      <div className="chapter-button-content">
        <div className="chapter-button-title">{`Ch ${i + 1}: ${
          chapter.title
        }`}</div>
        <div>{`(${getTimeDifference(
          chapter.start_time,
          chapter.end_time
        )} mins)`}</div>
      </div>
    </Button>
  );
}

type Props = {
  chapters: Chapter[];
  onChapterClicked: (arg0: Chapter) => void;
};

function FsChapters({ chapters, onChapterClicked }: Props) {
  return (
    <div className="FsChapters">
      <h1>Chapters</h1>
      <div className="chapters-container">
        {chapters.map((chapter, i) => (
          <FsChapter
            chapter={chapter}
            onChapterClicked={onChapterClicked}
            i={i}
          />
        ))}
      </div>
    </div>
  );
}

export default FsChapters;
