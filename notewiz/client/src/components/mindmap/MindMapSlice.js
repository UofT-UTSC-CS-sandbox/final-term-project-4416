import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {DeleteFlashCardThunk} from "../FlashCardSlice";

async function fetchMindMapSet() {
    let response;
    response = await axios.get("http://localhost:5000/api/fetchMindMapSet", {withCredentials: true});
    return response.data;
}

export const fetchMindMapSetThunk = createAsyncThunk(
    'MindMaps/fetchMindMapSet',
    async () => {
        try {
            const maps = await fetchMindMapSet();
            return maps ?? [];
        } catch (error) {
            console.error('Error fetching MindMap set:', error);
            return [];
        }
    }
);

export const DeleteMindMapThunk = createAsyncThunk(
    'MindMaps/DeleteMindMap',
    async (id)=>{
        try{
            return id;
        }catch (e){
            console.error(e);
        }
    }
);

const mindMaps = createSlice({
    name: "mindMaps",
    initialState: {
        current: 0, // index of current visible card
        maps: []
    },
    reducers: {
        nextMindMap: state => {
            console.log(state.current, state.maps.length);
            if (state.current < state.maps.length - 1) {
                state.current++; // Mutative code is possible thanks to immer running under the hood
            }
        },
        prevMindMap: state => {
            if (state.current !== 0) {
                state.current--;
            }
        },
        createMindMap: (state, action) => {
            state.maps.push(action.payload); // Flux Standard Actions convention suggests we always call it payload. With RTK you have no choice.
            state.current = state.maps.length - 1; // set the new card visible immediately
        },
        // See if you can implement this somewhere in the program by adding an edit button to each card!
        updateMindMap: (state, action) => {
            const { index, updatedCardInfo } = action.payload;
            state.maps[index] = updatedCardInfo;
        },
        deleteMindMap: state => {
            // if (state.cards.length === 1) return; // If there's only one card, don't allow it to be deleted
            if (state.maps.length - 1 === state.current) {
                // If looking at the last card, move back 1 card before deleting so we don't reference an undefined array position
                state.current--;
                state.maps.splice(state.current + 1, 1);
            } else {
                state.maps.splice(state.current, 1);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMindMapSetThunk.fulfilled, (state, action) => {
            state.maps = action.payload; // Update the state with fetched cards
        });
        builder.addCase(fetchMindMapSetThunk.rejected, (state, action) => {
            console.error('Fetch flashcard set failed:', action.error);
            state.maps = []; // Ensure the state is still set to an empty array on error
        });
        builder.addCase(DeleteMindMapThunk.fulfilled, (state, action) => {
            state.current = action.payload;
            if (state.maps.length - 1 === state.current) {
                // If looking at the last card, move back 1 card before deleting so we don't reference an undefined array position
                state.current--;
                state.maps.splice(state.current + 1, 1);
            } else {
                state.maps.splice(state.current, 1);
            }
        });
        builder.addCase(DeleteMindMapThunk.rejected, (state, action) => {
            console.error('Current flashcard failed:', action.error);
            state.current = -1;
        })
    },
});

export const {
    nextMindMap,
    prevMindMap,
    createMindMap,
    updateMindMap,
    deleteMindMap
} = mindMaps.actions;
export default mindMaps.reducer;
