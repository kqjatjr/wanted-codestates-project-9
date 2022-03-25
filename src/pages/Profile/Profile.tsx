import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "react-router-dom";
import {
  useGetUserAccessIdQuery,
  useGetUserMatchesListQuery,
} from "src/store/query/userProfileApi";
import styles from "./Profile.module.scss";
import { Kart } from "src/store/metadata/kart";
import { useMemo, useState } from "react";
import { gameType } from "src/store/metadata/gameType";
import { track } from "src/store/metadata/track";
import { TPlayer, TUserMatches } from "src/types/api";
import MatchChart from "src/components/Chart/Chart";
import { useCountUp } from "src/hooks/useCountUp";
import MainLoading from "src/components/Loading/MainLoading";

const countResult = (data: TUserMatches | undefined, target: string) => {
  return (
    data?.matches.reduce((acc, curr) => {
      curr.matches.forEach((match) => {
        if (match.player[target as keyof TPlayer] === "1") {
          acc += 1;
        }
      });
      return acc;
    }, 0) ?? 0
  );
};

const Profile = () => {
  const { nickname } = useParams();
  const [currFilterType, setCurrFilterType] = useState("전체");

  const {
    data: userProfile,
    isError: userProfileError,
    isLoading: userProfileLoading,
  } = useGetUserAccessIdQuery(nickname ?? skipToken);

  const { data: matchData, isLoading: isMatchLoading } =
    useGetUserMatchesListQuery(userProfile?.accessId ?? skipToken);

  const onClickFilter = (type: string) => {
    setCurrFilterType(type);
  };

  const matchWin = useMemo(
    () => countResult(matchData, "matchWin"),
    [matchData],
  );
  const matchRetire = useMemo(
    () => countResult(matchData, "matchRetired"),
    [matchData],
  );

  const matchCount = useMemo(
    () =>
      matchData?.matches.reduce((acc, curr) => {
        return (acc += curr.matches.length);
      }, 0) ?? 0,
    [matchData],
  );

  const winPercent =
    (matchWin / matchCount) * 100 ? (matchWin / matchCount) * 100 : 0;
  const retirePercent =
    (matchRetire / matchCount) * 100 ? (matchRetire / matchCount) * 100 : 0;

  const macthList = useMemo(
    () =>
      matchData?.matches
        .flatMap((match) => {
          if (currFilterType === "전체") {
            return match.matches;
          }
          return currFilterType === match.matchType ? match.matches : [];
        })
        .sort((a, b) =>
          new Date(a.startTime) > new Date(b.startTime)
            ? -1
            : new Date(a.startTime) < new Date(b.startTime)
            ? 1
            : 0,
        ) ?? [],
    [matchData, currFilterType],
  );

  const winAnimationCount = useCountUp(winPercent, 10);
  const retireAnimationCount = useCountUp(retirePercent, 10);

  if (userProfileError) {
    return (
      <div className={styles.isUserProfileError}>일치하는 유저가 없습니다.</div>
    );
  }

  if (!matchData || isMatchLoading || userProfileLoading) {
    return <MainLoading />;
  }

  const CharData = matchData.matches.reduce((acc, curr) => {
    curr.matches.forEach((item) => {
      acc[item.character] = (acc[item.character] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const MaxValue = Math.max(...Object.values(CharData));
  const mostChar = Object.keys(CharData).find(
    (key) => CharData[key] === MaxValue,
  );

  return (
    <div className={styles.container}>
      <div className={styles.render}>
        <div className={styles.dataText}>
          <p>*최근 100게임의 데이터 입니다.</p>
        </div>
        <div className={styles.top}>
          <div className={styles.nickname}>
            {userProfile && (
              <>
                {mostChar ? (
                  <img
                    className={styles.mostChar}
                    src={require(`../../store/metadata/character/${mostChar}.png`)}
                    alt="많이한 캐릭터"
                  />
                ) : (
                  <div className={styles.notPlay}>
                    최근 플레이한 캐릭터가 없습니다.
                  </div>
                )}
                <div className={styles.userInfo}>
                  <p className={styles.name}>아이디 : {userProfile.name}</p>
                  <p className={styles.level}>레벨 : {userProfile.level}</p>
                </div>
              </>
            )}
          </div>
          <div className={styles.percentContainer}>
            <div className={styles.win}>
              <div className={styles.title}>승률</div>
              <div
                className={styles.circle}
                style={{
                  background:
                    "conic-gradient(" +
                    "orange" +
                    " 0% " +
                    winAnimationCount +
                    "%, #ebebeb " +
                    winAnimationCount +
                    "% 100%)",
                }}
              >
                <span className={styles.percent}>{winPercent.toFixed(0)}%</span>
              </div>
            </div>
            <div className={styles.retire}>
              <div className={styles.title}>리타이어률</div>
              <div
                className={styles.circle}
                style={{
                  background:
                    "conic-gradient(" +
                    "red" +
                    " 0% " +
                    retireAnimationCount +
                    "%, #ebebeb " +
                    retireAnimationCount +
                    "% 100%)",
                }}
              >
                <span className={styles.percent}>
                  {retirePercent.toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
          <div className={styles.chart}>
            <MatchChart nickname={nickname} />
          </div>
        </div>
        {matchData.matches.length ? (
          <div className={styles.typeBtn}>
            <button
              onClick={() => onClickFilter("전체")}
              style={
                currFilterType === "전체"
                  ? { backgroundColor: "orange" }
                  : { backgroundColor: "white" }
              }
            >
              전체
            </button>
            {matchData.matches.map((match) => {
              return (
                <button
                  key={match.matchType}
                  onClick={() => onClickFilter(match.matchType)}
                  style={
                    currFilterType === match.matchType
                      ? { backgroundColor: "orange" }
                      : { backgroundColor: "white" }
                  }
                >
                  {gameType[match.matchType]}
                </button>
              );
            })}
          </div>
        ) : null}
        <div className={styles.matchList}>
          {macthList.map((match) => {
            return (
              <div
                key={match.matchId}
                className={styles.matchCard}
                style={
                  match.player.matchWin === "1"
                    ? { border: "5px solid blue" }
                    : { border: "5px solid red", backgroundColor: "#fc9f9f" }
                }
              >
                <p className={styles.gameType}>{gameType[match?.matchType]}</p>
                <p
                  className={styles.matchWin}
                  style={
                    match.player.matchWin === "1"
                      ? { color: "blue" }
                      : { color: "red" }
                  }
                >
                  {match.player.matchWin === "1" ? "승" : "패"}
                </p>
                <div className={styles.scoreConatainer}>
                  <p
                    className={styles.score}
                    style={
                      match.player.matchRetired === "1" ||
                      !match.player.matchRank
                        ? { color: "red" }
                        : { color: "blue" }
                    }
                  >
                    {match.player.matchRetired === "1"
                      ? "리타이어"
                      : !match.player.matchRank
                      ? "탈주"
                      : match.player.matchRank + "등"}
                  </p>
                  {match.player.matchRetired === "1" ||
                  !match.player.matchRank ? null : (
                    <p className={styles.playerCount}>/{match.playerCount}명</p>
                  )}
                </div>
                <p className={styles.trackType}>{track[match.trackId]}</p>
                <div className={styles.kartContainer}>
                  <p className={styles.kartName}>{Kart[match.player.kart]}</p>
                  {(
                    <img
                      className={styles.kartImage}
                      src={require(`../../store/metadata/kart/${match.player.kart}.png`)}
                      alt="카트 이미지"
                    />
                  ) ?? null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
