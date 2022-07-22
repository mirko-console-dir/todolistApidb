 export const addTodo = (name) => {
     
    const newTodo = {name,user_id:1, dueDate: new Date().toLocaleDateString()}
     return { type: 'ADD_TODO', payload: newTodo };
  };
export const deleteTodo = todo => {
   return ({ type: 'REMOVE_TODO', payload: todo }); 
}