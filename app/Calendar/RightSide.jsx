import axios from "axios";
import { Button, Modal, message } from "antd";
import { useEffect, useState } from "react";
import ModalInputs from "./ModalInputs";
import Image from "next/image";
import EditImage from "../Image/edit button.png";
import DeleteImage from "../Image/delete button.png";

const RightSide = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Change variable name
    const [todos, setTodos] = useState([]);
    const [selectedTodo, setSelectedTodo] = useState(null); // Change variable name
    const [updateTodoData, setUpdateTodoData] = useState(null);

    const token = sessionStorage.getItem("token");

    const fetchData = async () => {
        try {
            const response = await axios.get("http://192.168.1.195:4000/todo/get/", {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });
            setTodos(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
        setSelectedTodo(null); 
    };

    const showEditModal = (data) => {
        setIsEditModalOpen(true);
        setSelectedTodo(data);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        setIsEditModalOpen(false); // Close the edit modal as well
        setSelectedTodo(null);
        setUpdateTodoData(null);
        fetchData();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsEditModalOpen(false);
        setSelectedTodo(null);
        setUpdateTodoData(null);
    };

    const handleDeleteTodo = async (todoId) => {
        console.log(todoId);
        try {
            const response = await axios.delete(
                `http://192.168.1.195:4000/todo/delete/${todoId}`,
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Todo deleted successfully");
            message.success("Todo deleted successfully");
            fetchData();
        } catch (error) {
            console.error("Error deleting todo:", error);
            message.error("Error deleting todo. Please try again.");
        }
    };

    return (
        <div className="p-10">
            <Button
                className="bg-[#4096FF] mb-5"
                type="primary"
                onClick={() => showModal()}
            >
                + Add new To-do
            </Button>

            <Modal
                width={700}
                open={isModalOpen || isEditModalOpen} // Open edit modal as well
                onOk={handleOk}
                okButtonProps={{ className: "bg-blue-500" }}
                onCancel={handleCancel}
            >
                <div className="flex justify-around items-center mt-5">
                    <ModalInputs selectedTodo={selectedTodo} />
                </div>
            </Modal>

            {Array.isArray(todos) &&
                todos.map((item, index) => (
                    <div className="mb-5" key={index}>
                        <div className="border-b text-black text-[18px] ml-5 font-bold font-['Inter']">
                            {item.date.slice(0, 10)}
                        </div>
                        <div className="flex items-center justify-between">
                            <ol className="list-decimal pl-5">
                                <li>{item.title}</li>
                            </ol>
                            <div>
                                <Button
                                    type=""
                                    className=""
                                    onClick={() => showEditModal()}
                                >
                                    <Image src={EditImage} alt="edit button" />
                                </Button>

                                <Button type="" onClick={() => handleDeleteTodo(item._id)}>
                                    <Image src={DeleteImage} alt="delete button" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default RightSide;
