import axios from "axios";
import dayjs from 'dayjs';
import React, { useState } from "react";
import { useTheme } from "@material-tailwind/react";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Input, TimePicker, Button, Calendar, Form, message } from "antd";

dayjs.extend(customParseFormat);

const ModalInputs = () => {
    const theme = useTheme();
    const [statusCode, setStatusCode] = useState(null);

    const wrapperStyle = {
        width: 300,
        border: `1px solid ${theme.colorBorderSecondary}`,
        borderRadius: theme.borderRadiusLG,
    };

    const handleCreateTodo = async (values) => {
        try {
            const token = sessionStorage.getItem('token');

            if (!token) {
                console.error('Authorization token missing');
                return;
            }

            const response = await axios.post('http://192.168.1.195:4000/todo/create', values, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            });

            console.log('Todo created successfully');

            setStatusCode(response.status);

            message.success('Todo created successfully');
        } catch (error) {
            if (error.response && error.response.status === 422) {
                console.error('Validation errors:', error.response.data.errors);
            } else {
                console.error('Error creating todo:', error);

                message.error('Error creating todo. Please try again.');
            }
        }
    };

    return (
        <div>
            {statusCode && (
                <div>
                    <p>Status Code: {statusCode}</p>
                    {statusCode === 201 ? (
                        <p>Todo created successfully!</p>
                    ) : (
                        <p>Error creating todo. Please try again.</p>
                    )}
                </div>
            )}
            <Form name="form" onFinish={handleCreateTodo} className="grid grid-cols-2 gap-10">
                <Form.Item name="date" style={wrapperStyle} rules={[{ required: true, message: "Date is required" }]}>
                    <Calendar fullscreen={false} />
                </Form.Item>
                <div>
                    <Form.Item label="Title" name="title" className="mb-5" rules={[{ required: true, message: "Title is required" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Description" name="description" rules={[{ required: true, message: "Description is required" }]}>
                        <Input.TextArea
                            showCount
                            maxLength={200}
                        />
                    </Form.Item>
                    <Form.Item label="Time" name="time" rules={[{ required: true, message: "Time is required" }]}>
                        <TimePicker
                            format="hh:mm"
                            okButtonProps={{ className: "bg-blue-500" }}
                            initialValues={dayjs('00:00', 'HH:mm')}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            className="bg-blue-500 float-right mt-5"
                            htmlType="submit"
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default ModalInputs;
