import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define your tag types here
export type TagTypes = "Project";

const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/v1",
    }),
    endpoints: () => ({}),
    tagTypes: ["Project", "Message", "Skill"],
});

export default baseApi;
