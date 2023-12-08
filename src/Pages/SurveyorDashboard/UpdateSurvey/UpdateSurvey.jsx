
import { useForm } from "react-hook-form";
import { useLoaderData, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";


const UpdateSurvey = () => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();

    const item = useLoaderData();
    console.log(item);

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await axiosSecure.patch(`/surveyQuestion/${item._id}`, data);
            if (response.data && response.data.modifiedCount > 0) {
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${data.name} is updated to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error('Error updating survey:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to update the survey.',
                icon: 'error',
            });
        }
    };

    return (
        <div>
            <div className="border border-orange-600 rounded-lg w-[700px]">
                <h3 className="font-bold text-lg text-center mb-10">Update Survey</h3>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="px-4">
                            <div>
                                <label className="text-xl">Title:</label>
                                <div>
                                    <input
                                        {...register("title")}
                                        className="border-2 mt-3 p-2 rounded-lg w-full"
                                        type="text"
                                        placeholder="Write Title"
                                        defaultValue={item.title}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xl">Description:</label>
                                <div>
                                    <textarea
                                        {...register("description")}
                                        className="border-2 mt-3 p-2 rounded-lg w-full"
                                        type="text"
                                        placeholder=" Write Description"
                                        cols="20"
                                        rows="4"
                                        defaultValue={item.description}
                                    ></textarea>
                                </div>
                            </div>
                            <div>
                                <label className="text-xl mt-3">Category</label>
                                <div>
                                    <select
                                        {...register("Category")}
                                        className="border-2 mt-3 p-2 rounded-lg w-full"
                                        defaultValue={item.Category}
                                    >
                                        <option value="">Select a Category</option>
                                        <option value="Teaching Materials">Teaching Materials</option>
                                        <option value="Project Management">Project Management</option>
                                        <option value="CSS">CSS</option>
                                        <option value="Java">Java</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <input
                            className="border-2 px-20 mb-10 flex mx-auto text-center py-1 mt-6 rounded-lg cursor-pointer border-orange-600 hover:bg-orange-200 font-bold"
                            type="submit"
                            value="Update"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};


export default UpdateSurvey;
