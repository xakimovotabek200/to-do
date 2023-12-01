"use client"

import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';

const TodoModal = ({ todoId, open, onClose }) => {
    const [todo, setTodo] = useState([]);


    const token = sessionStorage.getItem("token");



console.log(todo,"id");
    return (
        <Modal
            title={todo ? todo.title : 'Loading...'}
            open={open}
            onCancel={onClose}
            footer={null}
        >
            {todo && (
                <div>
                    <p>{todo.name}</p>
                </div>
            )}
        </Modal>
    );
};

export default TodoModal;
