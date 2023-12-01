"use client"

import React, { useState } from 'react';
import { Badge, Calendar } from 'antd';
import TodoModal from './TodoModa'; 


const HomeCalendar = () => {

    const [modalOpen, setmodalOpen] = useState(false);
    const [selectedTodoId, setSelectedTodoId] = useState(null);

    const openModal = (todoId) => {
        setSelectedTodoId(todoId);
        setmodalOpen(true);
    };

    const closeModal = () => {
        setSelectedTodoId(null);
        setmodalOpen(false);
    };

    const getListData = (value) => {
        let listData;
        switch (value.month()) {
            
            case 1:
                listData = [
                    {
                        type: 'warning',
                        content: 'salom',
                    },
                    {
                        type: 'success',
                        content: 'This is usual event.',
                    },
                    {
                        type: 'salom',
                        content: 'This is error event.',
                    },
                ];
                break;

        }
        return listData || [];
    };

    const getMonthData = (value) => {
        if (value.month() === 1) {
            return 1394;
        }
    };

    const monthCellRender = (value) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <div className=''>
                <ul className="events">
                    {listData.map((item) => (
                        <li key={item.content} onClick={() => openModal(item._todoId)}>
                            <Badge status={item.type} text={item.content} month={item.month} />
                        </li>
                    ))}
                    <TodoModal todoId={selectedTodoId} open={modalOpen} onClose={closeModal} />
                </ul>
            </div>
        );
    };

    const cellRender = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
    };

    return <Calendar cellRender={cellRender} />;
};

export default HomeCalendar;
