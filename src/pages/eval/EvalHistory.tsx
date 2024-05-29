import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  dividerClasses,
} from "@mui/material";
import Header from "../../components/Header";
import "./../../styles/eval/EvalHistory.css";
import { useEffect, useState } from "react";
import EvalAPI, { GetEvalHistoryReponse } from "../../apis/EvalAPI";
import { type } from "@testing-library/user-event/dist/type";

enum Types {
  LOGIC = 0,
  LANGUAGE = 1,
  PERSONALITY = 2,
}

type ListCellProps = {
  percentage?: number;
  lastAttempt?: string;
  type: number;
  shortDes?: string;
  shortForm: string;
};

function ListCell(props: ListCellProps) {
  return (
    <div className="EvalHistory-ListCell">
      <img src="/icons/tests/communication-skills.svg" alt="" />
      <div>
        <div>{props.shortForm}</div>
      </div>

      {props.type != Types.PERSONALITY ? (
        <div className="EvalHistory-ListCell-text">
          <div>
            Overall score:{" "}
            <span className="EvalHistory-ListCell-text-black">
              {`${props.percentage}%`}
            </span>
          </div>
          <div>
            Last attempt:{" "}
            <span className="EvalHistory-ListCell-text-black">
              {props.lastAttempt}
            </span>
          </div>
        </div>
      ) : (
        <div className="EvalHistory-ListCell-text">{props.shortDes}</div>
      )}
    </div>
  );
}

function HeaderContent() {
  return (
    <div>
      <h2>History</h2>
    </div>
  );
}

export default function EvalHistory() {
  const [filteredType, setFilteredType] = useState(-1);

  const [data, setData] = useState<GetEvalHistoryReponse | null>(null);

  useEffect(() => {
    (async () => {
      const data = await EvalAPI.getEvalHistory();
      setData(data);
    })();
  }, []);

  const getShortFormByType = (type: number) => {
    if (data) {
      const foundOption = data.filter_options.find(
        (option) => option.type === type
      );
      if (foundOption) {
        return foundOption.shortForm;
      }
    }
    return "";
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilteredType(parseInt(event.target.value));
  };
  return (
    <div className="EvalHistory">
      <Header content={<HeaderContent />} />
      {data && (
        <>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              size="small"
              style={{
                borderRadius: "10px",
                width: "150px",
              }}
              value={filteredType.toString()}
              onChange={handleFilterChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem style={{ fontSize: "12px" }} value={-1}>
                All
              </MenuItem>
              {data.filter_options.map((item) => (
                <MenuItem style={{ fontSize: "12px" }} value={item.type}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="EvalHistory-ListCell-container">
            {data.attempted_list.map((item) => {
              if (item.type == filteredType || filteredType == -1) {
                return (
                  <ListCell
                    lastAttempt={item.last_attempted}
                    percentage={item.percentage}
                    type={item.type}
                    shortDes={item.short_description}
                    shortForm={getShortFormByType(item.type)}
                  />
                );
              }
            })}
          </div>
        </>
      )}
    </div>
  );
}
