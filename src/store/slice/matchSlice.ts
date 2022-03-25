import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { targetList } from "src/api/service";
import { TTargetMatch } from "src/types/api";
import { RootState } from "../store";

type TInitialState = {
  data: Record<string, TTargetMatch>;
  isLoading: boolean;
  isError: boolean;
};

const initialState: TInitialState = {
  data: {},
  isLoading: true,
  isError: false,
};

const MATCH_LIST = "matches";

export const fetchMatch = createAsyncThunk<
  TInitialState,
  string[],
  { state: RootState }
>("matchData", async (targetId, ThunkApi) => {
  const state = ThunkApi.getState();
  const data = state.matches.data;

  const check = targetId.reduce((acc, cur) => {
    if (!data[cur]) {
      return [...acc, cur];
    }
    return acc;
  }, [] as string[]);

  const result = await targetList(check);

  return {
    data: result,
    isLoading: false,
    isError: false,
  };
});

export const matchSlice = createSlice({
  name: MATCH_LIST,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMatch.fulfilled, (state, action) => {
      state.data = { ...state.data, ...action.payload.data };
      state.isError = false;
      state.isLoading = false;
    });
    builder.addCase(fetchMatch.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMatch.rejected, (state) => {
      state.data = {};
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export default matchSlice;
