import baseApi from "@/redux/api/baseApi";

export const skillApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Create a new skill
        createSkill: builder.mutation<any, { name: string; description: string; rating: number; icon: string }>({
            query: (skill) => ({
                url: "/skills",
                method: "POST",
                body: skill,
            }),
            invalidatesTags: ["Skill"],
        }),

        // Get all skills (no pagination, no query params)
        getAllSkills: builder.query<any, void>({
            query: () => "/skills",
            providesTags: ["Skill"],
        }),

        // Get single skill by ID
        getSkillById: builder.query<any, string>({
            query: (id) => `/skills/${id}`,
            providesTags: (result, error, id) => [{ type: "Skill", id }],
        }),

        // Update skill
        updateSkill: builder.mutation<any, { id: string; data: Partial<{ name: string; description: string; rating: number; icon: string }> }>({
            query: ({ id, data }) => ({
                url: `/skills/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Skill"],
        }),

        // Delete skill
        deleteSkill: builder.mutation<any, string>({
            query: (id) => ({
                url: `/skills/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Skill"],
        }),
    }),
    overrideExisting: false,
});

export const { useCreateSkillMutation, useGetAllSkillsQuery, useGetSkillByIdQuery, useUpdateSkillMutation, useDeleteSkillMutation } = skillApi;
