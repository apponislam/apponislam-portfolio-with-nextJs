import baseApi from "@/redux/api/baseApi";

export const projectApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createProject: builder.mutation<any, any>({
            query: (project) => ({
                url: "/project",
                method: "POST",
                body: project,
            }),
            invalidatesTags: ["Project"],
        }),

        getPublicProjects: builder.query<any, { page?: number; limit?: number; search?: string; type?: string } | void>({
            query: (params = {}) => {
                const {
                    page = 1,
                    limit = 10,
                    search = "",
                    type,
                } = params as {
                    page?: number;
                    limit?: number;
                    search?: string;
                    type?: string;
                };

                const queryObj = {
                    page,
                    limit,
                    ...(search ? { search } : {}),
                    ...(type ? { type } : {}),
                };

                const queryString = new URLSearchParams(Object.fromEntries(Object.entries(queryObj).map(([k, v]) => [k, v!.toString()]))).toString();

                return `/project?${queryString}`;
            },
            providesTags: ["Project"],
        }),

        getProjectById: builder.query<any, string>({
            query: (id) => `/project/${id}`,
            providesTags: ["Project"],
        }),

        updateProject: builder.mutation<any, { id: string; data: any }>({
            query: ({ id, data }) => ({
                url: `/project/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Project"],
        }),

        deleteProject: builder.mutation<any, string>({
            query: (id) => ({
                url: `/project/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Project"],
        }),
    }),
    overrideExisting: false,
});

export const { useGetPublicProjectsQuery, useGetProjectByIdQuery, useCreateProjectMutation, useUpdateProjectMutation, useDeleteProjectMutation } = projectApi;
