import React from 'react';
import cls from './todoTitle.module.scss'


const TodoTitle = () => {
    return (
        <div className={cls.wrapper}>
            <div className={cls.textLine}>
                <span className={cls.line}></span>
                <h1 className={cls.title}>TO-DO NOW</h1>
                <span className={cls.line}></span>         
            </div> 
            <div className={cls.buttonLine}>
                <span className={cls.line}></span>
                <h1 className={cls.title_2}>New Task</h1>
                <span className={cls.line}></span>
            </div>
        </div>
    );
}

export default TodoTitle;
