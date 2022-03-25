import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import MainLoading from "src/components/Loading/MainLoading";
import { useAppSelector } from "src/hooks/useAppSelector";
import { gameType } from "src/store/metadata/gameType";
import { useGetAllMatchesListQuery } from "src/store/query/userProfileApi";
import { fetchMatch } from "src/store/slice/matchSlice";
import { isSoloMatch, isTeamMatch, MatchResult } from "src/types/api";
import styles from "./Rank.module.scss";

const RatingCriteria = {
  team: {
    win: 10,
    lose: -5,
    rank: {
      "1": 4,
      "2": 3,
      "3": 2,
      "4": 1,
      "5": 0,
      "6": -1,
      "7": -1,
      "8": -1,
      "99": -2,
      "0": -3,
    },
  },
  solo: {
    rank: {
      "1": 10,
      "2": 8,
      "3": 6,
      "4": 0,
      "5": -1,
      "6": -3,
      "7": -5,
      "8": -7,
      "99": -9,
      "0": -7,
    },
  },
};

const userRating = {
  name: 0,
  rating: 1,
};

const filterMatchType = [
  {
    id: "7b9f0fd5377c38514dbb78ebe63ac6c3b81009d5a31dd569d1cff8f005aa881a",
    name: "스피드 개인전",
  },
  {
    id: "effd66758144a29868663aa50e85d3d95c5bc0147d7fdb9802691c2087f3416e",
    name: "스피드 팀전",
  },
  {
    id: "7ca6fd44026a2c8f5d939b60aa56b4b1714b9cc2355ec5e317154d4cf0675da0",
    name: "아이템 개인전",
  },
  {
    id: "14e772d195642279cf6c8307125044274db371c1b08fc3dd6553e50d76d2b3aa",
    name: "아이템 팀전",
  },
];

const Rank = () => {
  const [currentFilter, setCurrentFilter] = useState(filterMatchType[0].id);
  const { data: { matches } = { matches: [] }, isLoading } =
    useGetAllMatchesListQuery(currentFilter ?? skipToken);

  const matchDatas = useAppSelector((state) => state.matches);
  const dispatch = useDispatch();

  const findTarget = matches[0];

  const onClickType = (type: string) => {
    setCurrentFilter(type);
  };

  useEffect(() => {
    dispatch(fetchMatch(findTarget?.matches || []));
  }, [findTarget, dispatch]);

  const rankList = useMemo(() => {
    return findTarget?.matches.reduce((acc, matchId) => {
      const match = matchDatas.data[matchId];

      if (!match) return acc;

      if (isTeamMatch(match)) {
        return {
          ...acc,
          ...match.teams
            .flatMap((team) => team.players)
            .reduce((acc, cur) => {
              let rating = 0;
              if (cur.matchWin === MatchResult.Win && cur.matchWin.length) {
                rating += RatingCriteria.team.win;
              } else {
                rating += RatingCriteria.team.lose;
              }

              rating +=
                RatingCriteria.team.rank[
                  cur.matchRank as keyof typeof RatingCriteria["team"]["rank"]
                ];

              return {
                ...acc,
                [cur.characterName]: (acc[cur.characterName] ?? 0) + rating,
              };
            }, {} as Record<string, number>),
        };
      }

      if (isSoloMatch(match)) {
        return {
          ...acc,
          ...match.players.reduce((acc, cur) => {
            let rating = 0;

            rating +=
              RatingCriteria.solo.rank[
                cur.matchRank as keyof typeof RatingCriteria["solo"]["rank"]
              ];

            return {
              ...acc,
              [cur.characterName]: (acc[cur.characterName] ?? 0) + rating,
            };
          }, {} as Record<string, number>),
        };
      }

      return acc;
    }, {} as Record<string, number>);
  }, [findTarget, matchDatas]);

  const renderRankList = Object.entries(rankList ?? {}).sort(
    (a, b) => b[1] - a[1],
  );

  const topThree = renderRankList.slice(0, 3);

  if (isLoading) {
    return <MainLoading />;
  }

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.title}>승률 랭킹</div>
        <div className={styles.dataInfo}>
          <p>* 데이터 기준시간: 요청 후 5분</p>
          <p>* 최근 타입별 매치 최대 200판 기준입니다.</p>
        </div>
        <div className={styles.filterContainer}>
          {filterMatchType?.map((item) => {
            return (
              <button
                onClick={() => onClickType(item.id)}
                style={
                  currentFilter === item.id
                    ? { backgroundColor: "Orange" }
                    : { backgroundColor: "white" }
                }
                key={item.id}
              >
                {gameType[item.id]}
              </button>
            );
          })}
        </div>

        {matchDatas.isLoading ? (
          <div className={styles.loadingDot}>
            <div className={styles.dot1}></div>
            <div className={styles.dot2}></div>
            <div className={styles.dot3}></div>
          </div>
        ) : (
          <div className={styles.rankContainer}>
            <div className={styles.topThreeContainer}>
              {topThree.map((item, index) => {
                return (
                  <Link to={`/user/${item[userRating.name]}`} key={item[0]}>
                    <div
                      className={styles.topThree}
                      key={item[userRating.name]}
                    >
                      <p
                        style={
                          index === 0
                            ? { color: "red" }
                            : index === 1
                            ? { color: "purple" }
                            : { color: "green" }
                        }
                      >
                        {index + 1} 등
                      </p>
                      <p>{item[userRating.name]}</p>
                      <p>{item[userRating.rating]} PT</p>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className={styles.otherRankContainer}>
              {renderRankList.slice(3, rankList.length).map((item, index) => {
                return (
                  <Link to={`/user/${item[userRating.name]}`} key={item[0]}>
                    <div className={styles.otherRank}>
                      <p>{index + 4} 등</p>
                      <p>{item[userRating.name]}</p>
                      <p>{item[userRating.rating]} PT</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rank;
