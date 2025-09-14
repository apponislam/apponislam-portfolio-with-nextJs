import baseApi from "@/redux/api/baseApi";

export const messageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Create a new message
        postMessage: builder.mutation<any, { name: string; email: string; message: string; social?: string }>({
            query: (message) => ({
                url: "/messages",
                method: "POST",
                body: message,
            }),
            invalidatesTags: ["Message"],
        }),

        // Get all messages with pagination
        getAllMessages: builder.query<any, { page?: number; limit?: number } | void>({
            query: (params = {}) => {
                const { page = 1, limit = 10 } = params as { page?: number; limit?: number };
                const queryString = new URLSearchParams({ page: page.toString(), limit: limit.toString() }).toString();
                return `/messages?${queryString}`;
            },
            providesTags: ["Message"],
        }),
    }),
    overrideExisting: false,
});

export const { usePostMessageMutation, useGetAllMessagesQuery } = messageApi;
