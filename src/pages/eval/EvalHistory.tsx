import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Header from "../../components/Header";
import "./../../styles/eval/EvalHistory.css";
import { useEffect, useState } from "react";
import EvalAPI, { GetEvalHistoryReponse } from "../../apis/EvalAPI";
import HeaderContentWithBack from "../../components/HeaderContentWithBack";
import { Calculate } from "@mui/icons-material";
import { CalculationsUtil } from "../../utils/calculations";

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
  const colors = [
    {
      first: "#f9eff8",
      second: "#f2d8ee",
      third: "#bc3aaa",
    },
    {
      first: "#FEEEF1",
      second: "#FFCDD6",
      third: "#FE5E7E",
    },
    {
      first: "#E8F6F6",
      second: "#D2EDED",
      third: "#1DA5A7",
    },
  ];
  return (
    <div className="EvalHistory-ListCell">
      <div
        className="EvalHistory-ListCell-icon"
        style={{ backgroundColor: colors[props.type % colors.length].first }}
      >
        <div
          style={{
            backgroundColor: colors[props.type % colors.length].second,
            color: colors[props.type % colors.length].third,
          }}
          className="EvalHistory-ListCell-icon-inner"
        >
          {props.shortForm}
        </div>
      </div>

      {props.type != Types.PERSONALITY ? (
        <div className="EvalHistory-ListCell-text">
          <div>
            Overall score:{" "}
            <span className="EvalHistory-ListCell-text-black">
              {props.percentage != null
                ? `${props.percentage}%`
                : "Not Completed"}
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
      <Header content={<HeaderContentWithBack heading="History" />} />
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
            {data.attempted_list.map((item, i) => {
              if (item.type == filteredType || filteredType == -1) {
                return (
                  <ListCell
                    lastAttempt={
                      item.last_attempted
                        ? CalculationsUtil.formatDateTime(item.last_attempted)
                        : ""
                    }
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
