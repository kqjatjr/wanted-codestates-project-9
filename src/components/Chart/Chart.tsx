import styles from "./Chart.module.scss";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useEffect, useState } from "react";
import ReactApexChart, { Props } from "react-apexcharts";
import {
  useGetUserAccessIdQuery,
  useGetUserMatchesListQuery,
} from "src/store/query/userProfileApi";
import { TMatch } from "src/types/api";

const MatchChart = ({ nickname }: { nickname: string | undefined }) => {
  const [data, setData] = useState<Props>();

  const { data: userProfile } = useGetUserAccessIdQuery(nickname ?? skipToken);
  const { data: matchData, isLoading } = useGetUserMatchesListQuery(
    userProfile ? userProfile.accessId : skipToken,
  );

  const resentMatch = matchData?.matches
    .reduce((acc, curr) => {
      curr.matches.forEach((item) => {
        return { ...item, [curr.matchType]: curr.matchType };
      });
      return [...acc, ...curr.matches];
    }, [] as TMatch[])
    .sort((a, b) =>
      new Date(a.startTime) > new Date(b.startTime)
        ? -1
        : new Date(a.startTime) < new Date(b.startTime)
        ? 1
        : 0,
    )
    .slice(0, 10)
    .map((item) => {
      if (item.player.matchRank === "99") {
        return 9;
      }
      if (item.player.matchRank === "") {
        return 10;
      }
      return Number(item.player.matchRank);
    });

  useEffect(() => {
    if (resentMatch) {
      setData({
        series: [
          {
            name: "최근전적",
            data: resentMatch,
          },
        ],
        options: {
          chart: {
            toolbar: {
              show: false,
            },
            type: "line",
            zoom: {
              enabled: false,
            },
          },
          noData: {
            text: "데이터가 없습니다.",
            align: "center",
            verticalAlign: "middle",
            offsetX: 0,
            offsetY: 0,
            style: {
              color: undefined,
              fontSize: "14px",
              fontFamily: undefined,
            },
          },
          dataLabels: {
            enabled: true,
            formatter: (value) => {
              if (value === 9) {
                return "R";
              }
              if (value === 10) {
                return "X";
              }
              return String(value);
            },
          },
          stroke: {
            curve: "straight",
          },
          title: {
            text: "최근전적",
            align: "center",
            style: {
              fontSize: "15px",
              fontWeight: "bold",
            },
          },
          grid: {
            show: false,
          },
          yaxis: {
            show: false,
            reversed: true,
            tickAmount: 1,
            min: 0,
            max: 10,
            labels: {
              minWidth: 20,
              formatter: (value) => {
                if (value === 9) {
                  return "리타이어";
                }
                if (value === 10) {
                  return "탈주";
                }
                return value.toFixed(0);
              },
            },
          },
        },
      });
    }
  }, []);

  if (isLoading) {
    return <div>ㅁㄴㅇㄹ</div>;
  }

  return (
    <div className={styles.chartContainer}>
      {data && (
        <ReactApexChart
          className={styles.chart}
          options={data.options}
          series={data.series}
          type="line"
          width="300"
        />
      )}
    </div>
  );
};

export default MatchChart;
