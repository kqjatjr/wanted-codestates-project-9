import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TAllMatches, TTargetMatch, TUserMatches } from "src/types/api";

type TUser = {
  accessId: string;
  level: number;
  name: string;
};

const USER_PROFILE = "userProfileApi";

export const userProfileApi = createApi({
  reducerPath: USER_PROFILE,
  keepUnusedDataFor: 300,
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiMTcyODYwMjc1NCIsImF1dGhfaWQiOiIyIiwidG9rZW5fdHlwZSI6IkFjY2Vzc1Rva2VuIiwic2VydmljZV9pZCI6IjQzMDAxMTM5MyIsIlgtQXBwLVJhdGUtTGltaXQiOiI1MDA6MTAiLCJuYmYiOjE2NDc4NDA5MDcsImV4cCI6MTY2MzM5MjkwNywiaWF0IjoxNjQ3ODQwOTA3fQ.2s7Rl9woR18ih1mAW7v8I07BEmG7KojARKvmCcEq_HE",
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserAccessId: builder.query<TUser, string>({
      query: (nickname) => `/users/nickname/${nickname}`,
    }),
    getUserMatchesList: builder.query<TUserMatches, string>({
      query: (access_id) =>
        `/users/${access_id}/matches?start_date=2022-03-01&end_date=2022-03-31&limit=100`,
    }),
    getAllMatchesList: builder.query<TAllMatches, string>({
      query: (matchType) =>
        `/matches/all?start_date=2022-03-01&end_date=2022-03-31&limit=200&match_types=${matchType}`,
    }),
  }),
});

export const {
  useGetUserAccessIdQuery,
  useGetUserMatchesListQuery,
  useGetAllMatchesListQuery,
} = userProfileApi;
