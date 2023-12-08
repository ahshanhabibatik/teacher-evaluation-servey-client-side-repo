

import { useQuery } from "@tanstack/react-query";
import { FaTrash, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: "Select Role",
            html: `
                <select id="role" class="swal2-input">
                    <option value="admin">Admin</option>
                    <option value="Surveyor">surveyor</option>
                </select>
            `,
            showCancelButton: true,
            confirmButtonText: "Set Role",
            preConfirm: () => {
                const selectedRole = document.getElementById('role').value;
                return selectedRole;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const selectedRole = result.value;
                if (selectedRole) {
                    axiosSecure.patch(`/users/role/${user._id}`, { role: selectedRole })
                        .then((res) => {
                            console.log(res.data);
                            if (res.data.modifiedCount > 0) {
                                refetch();
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: `${user.name} is now a ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}!`,
                                    showConfirmButton: false,
                                    timer: 1500,
                                });
                            }
                        })
                        .catch((error) => {
                            console.error("Error updating user role:", error);
                        });
                }
            }
        });
    };


    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {


                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        refatch();
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }

                    })
            }
        });
    }
    return (
        <div>
            <div className="flex justify-evenly my-8">
                <h1 className="text-3xl">All User</h1>
                <h1 className="text-3xl">Total User: {users.length}</h1>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.map((user, index) => <tr
                                key={user._id}>

                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === "user" ? <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn bg-orange-400 btn-xl text-red-500">
                                        <p>Select one</p>
                                    </button> : <p>{user.role}</p>}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn btn-ghost btn-xl text-red-500">
                                        <FaTrash></FaTrash>
                                    </button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default AllUsers;