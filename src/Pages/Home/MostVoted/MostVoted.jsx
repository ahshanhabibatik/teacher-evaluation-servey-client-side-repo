import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const MostVoted = () => {
  const axiosSecure = useAxiosSecure();

  const { data: mostVotedData = [] } = useQuery({
    queryKey: ['mostVoted'],
    queryFn: async () => {
      const res = await axiosSecure.get('/mostVoted');
      return res.data;
    },
  });

  return (
    <div>
      <SectionTitle heading="Featured Surveys" subHeading="Most voted surveys" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto px-5">
        {mostVotedData.map((survey) => (
          <div key={survey._id} className="border-2 border-orange-500 mb-4 p-4 rounded-lg">
            <h3 className="font-bold text-lg">{survey.title}</h3>
            <p>Category: {survey.Category}</p>
            <p className="font-bold text-2xl text-pink-600"><span>Total Votes:</span> {survey.totalResponses}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostVoted;
