import {createSlice, current} from '@reduxjs/toolkit';

export const reactionSlice = createSlice({
  name: 'reaction',
  initialState: {
    like: [],
    special: [],
  },
  reducers: {
    addLike: (state, actions) => {
      const itemPayload = actions.payload;
      const checkItem = current(state).like.findIndex(
        item => item.id == itemPayload.id,
      );

      if (checkItem > -1) {
        state.like[checkItem] = itemPayload;
      } else {
        state.like.push(itemPayload);
      }
    },
    addSpecial: (state, actions) => {
        const itemPayload = actions.payload;
        const checkItem = current(state).special.findIndex(
          item => item.id == itemPayload.id,
        );
  
        if (checkItem > -1) {
          state.special[checkItem] = itemPayload;
        } else {
          state.special.push(itemPayload);
        }
      },
  },
});

// Action creators are generated for each case reducer function
export const {addLike, addSpecial} = reactionSlice.actions;

export default reactionSlice.reducer;
