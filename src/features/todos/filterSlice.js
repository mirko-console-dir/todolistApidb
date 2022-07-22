import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice(
    {
        name: 'filter',
        initialState : '',
        reducers: {
            filterTodo(state, action) {
              
                return action.payload;
                
            }
        }
    });

const { actions, reducer } = filterSlice;
export default reducer;
export const{ filterTodo} = actions;