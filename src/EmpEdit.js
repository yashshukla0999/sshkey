// EmpListing.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const BASE_URL = "http://ec2-34-239-131-209.compute-1.amazonaws.com:8080";
const EmpListing = () => {
    // State to hold employee data
    const [empdata, empdatachange] = useState(null);

    // React hook to handle navigation
    const navigate = useNavigate();

    // Function to load employee details page
    const LoadDetail = (id) => {
        navigate("/employee/detail/" + id);
    };

    // Function to load employee edit page
    const LoadEdit = (id) => {
        navigate("/employee/edit/" + id);
    };

    // Function to handle employee removal
    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            // Send DELETE request to remove employee
            fetch(`${BASE_URL}/employee/${id}`, {
                method: "DELETE"
            })
            .then((res) => {
                alert('Removed successfully.');
                // Reload employee data after deletion
                window.location.reload();
            })
            .catch((err) => {
                console.log(err.message);
            });
        }
    };

    // UseEffect hook to fetch employee data on component mount
    useEffect(() => {
        fetch(`${BASE_URL}/employee`)
            .then((res) => res.json())
            .then((resp) => {
                empdatachange(resp);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Employee Listing</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        {/* Link to the create employee page */}
                        <Link to="employee/create" className="btn btn-success">Add New (+)</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Phone</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {empdata &&
                                empdata.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>
    <button type="button" onClick={() => LoadEdit(item.id)} className="btn btn-success">Edit</button>
    <button type="button" onClick={() => Removefunction(item.id)} className="btn btn-danger">Remove</button>
    <button type="button" onClick={() => LoadDetail(item.id)} className="btn btn-primary">Details</button>
</td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmpListing;
