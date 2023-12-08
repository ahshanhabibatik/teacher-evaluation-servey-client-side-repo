import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/UseAxiosPublic";

const PaymentHistory = () => {
    const axiosPublic = useAxiosPublic();

    const { data: totalPayment = [] } = useQuery({
        queryKey: ["totalPayment"],
        queryFn: async () => {
            const res = await axiosPublic.get('adminPaymentInfo');
            return res.data;
        },
    });

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mb-4">Total Payment:{totalPayment.length}</h1>
            <div className="">
                <table className="table border rounded-lg lg:w-[800px] mx-auto border-lime-600">
                    <thead>
                        <tr className="text-center">
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>transactionId</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody className="border">
                        {totalPayment.map((data, index) => (
                            <tr className="border-2" key={data._id}>
                                <th>{index + 1}</th>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>{data.transactionId}</td>
                                <td>{data.price}$</td>
                                <td>{data.date}$</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;