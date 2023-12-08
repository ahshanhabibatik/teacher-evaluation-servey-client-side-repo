import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import useAxiosSecure from "./UseAxiosSecure";

const UseSurveyor = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isSurveyor, isPending: isSurveyorLoading } = useQuery({
        queryKey: [user?.email, 'isSurveyor'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/users/surveyor/${user.email}`);
                console.log('Surveyor Data:', res.data);
                return res.data?.Surveyor;
            } catch (error) {
                console.error('Error fetching Surveyor data:', error);
                throw error;
            }
        }
    });

    return [isSurveyor, isSurveyorLoading];
};

export default UseSurveyor;
