import Todo from './Todo';
import PropTypes from 'prop-types';

export const Todos = ({ todos, removeTodo, updateTodo }) => {
    const onRemove = (todo) => {
        removeTodo(todo.id);
    };
    const onToggle = async (todo) => {
        const newtodo = { ...todo, completed: !todo.completed };
        try {
            const res = await updateTodo(newtodo).unwrap();
            console.log('res=', res);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <ul className='list-group list-group-flush' id='TodoList'>
            {todos.map((todo) => (
                <Todo
                    key={todo.id}
                    onToggleTodo={onToggle}
                    todo={todo}
                    onRemoveTodo={onRemove}
                />
            ))}
        </ul>
    );
};
Todos.proTypes = {
    todos: PropTypes.arrayOf(Todo),
};
export default Todos;
