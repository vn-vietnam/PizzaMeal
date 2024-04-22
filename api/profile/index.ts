import { Profile } from './../../type/types';
import { supabase } from "@/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// update user
export const useUpdateProfiles = () => {
	const queryClient = useQueryClient();

	return useMutation({
		async mutationFn(data: any) {
			const { error, data: updateProfile } = await supabase
				.from("profiles")
				.update({
					address: data.address,
					email: data.email,
					phone: data.phone,
					full_name: data.full_name,
				})
				.eq("id", data.id)
				.select()
				.single();

			if (error) {
				throw new Error(error.message);
			}
			return updateProfile;
		},
		async onSuccess(_, { id }) {
			await queryClient.invalidateQueries({
				queryKey: ["profiles"],
			});
			await queryClient.invalidateQueries({
				queryKey: ["profiles", id],
			});
		},
	});
};
