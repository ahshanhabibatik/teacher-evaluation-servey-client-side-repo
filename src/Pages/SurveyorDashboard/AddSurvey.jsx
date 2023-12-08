import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';

const AddSurvey = () => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            date: new Date().toISOString().split('T')[0],
        },
    });
    const { user } = useContext(AuthContext);
    console.log(user);

    const onSubmit = async (data) => {
        data.email = user.email;
        data.timestamp = new Date().toISOString();
        data.vote = 0;

        const apiUrl = 'https://teacher-evaluation-server.vercel.app/surveyorRequest';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Data Insert in database successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                console.error('Failed to submit form data');
            }
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    return (
        <div>
            <div>
                <div className="border border-orange-600 pb-8 rounded-lg w-[700px]">
                    <h3 className="font-bold text-lg text-center mb-10">Add Survey</h3>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='px-4'>
                                <div>
                                    <label className="text-xl">Title:</label>
                                    <div>
                                        <input {...register('title')} className="border-2 mt-3  p-2 rounded-lg w-full" type="text" placeholder="Write Title" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xl">Description:</label>
                                    <div>
                                        <textarea {...register('description')} className="border-2 mt-3  p-2 rounded-lg w-full" type="text" placeholder=" Write Description" id="" cols="20" rows="4"></textarea>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xl mt-3">Category</label>
                                    <div>
                                        <select {...register('Category')} className="border-2 mt-3  p-2 rounded-lg w-full">
                                            <option value="">Select a Category</option>
                                            <option value="Teaching Materials">Teaching Materials</option>
                                            <option value="Project Management">Project Management</option>
                                            <option value="CSS">Introduction to Computer</option>
                                            <option value="Java">Java Programming</option>
                                            <option value="web">Web Development</option>
                                            <option value="stem">STEM Education</option>

                                        </select>
                                    </div>
                                </div>
                            </div>
                            <input className="border-2 px-20 mb-10 flex mx-auto text-center py-1 mt-6 rounded-lg cursor-pointer border-orange-600 hover:bg-orange-200 font-bold" type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSurvey;
