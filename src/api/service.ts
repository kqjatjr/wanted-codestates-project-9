export const fetchData = (resource: string) => {
  return fetch(`/api/matches/${resource}`, {
    method: "GET",
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiMTcyODYwMjc1NCIsImF1dGhfaWQiOiIyIiwidG9rZW5fdHlwZSI6IkFjY2Vzc1Rva2VuIiwic2VydmljZV9pZCI6IjQzMDAxMTM5MyIsIlgtQXBwLVJhdGUtTGltaXQiOiI1MDA6MTAiLCJuYmYiOjE2NDc4NDA5MDcsImV4cCI6MTY2MzM5MjkwNywiaWF0IjoxNjQ3ODQwOTA3fQ.2s7Rl9woR18ih1mAW7v8I07BEmG7KojARKvmCcEq_HE",
    },
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error("Failed to fetch");
    }
    return res.json();
  });
};

export const targetList = async (target: string[]) => {
  const list = target.map((item) => fetchData(item));
  const matchData = await Promise.all(list);

  const result = matchData.reduce((acc, cur) => {
    return { ...acc, [cur.matchId]: cur };
  }, {});

  return result;
};
