import { createSlice } from "@reduxjs/toolkit";

const mindMaps = createSlice({
    name: "mindMaps",
    initialState: {
        current: 0, // index of current visible card
        maps: [
            {
                // State is an Array of Flashcards With a Front and Back. The id is the array index
                id: 0,
                nodeData: {
                    id: 'd451a556d866ba7b',
                    topic: 'new topic',
                    root: true,
                    children: [
                        {
                            topic: 'new node',
                            id: 'd451a6f027c33b1f',
                            direction: 0,
                            children: [
                                {
                                    topic: 'new node',
                                    id: 'd451a724b7c10970',
                                },
                                {
                                    topic: 'new node',
                                    id: 'd451a77ca7348eae',
                                },
                                {
                                    topic: 'new node',
                                    id: 'd451a78e1ec7181c',
                                },
                            ],
                        },
                    ],
                },
                arrows: [
                    {
                        id: 'd451a9149a1e3a15',
                        label: 'Custom Link',
                        from: 'd451a77ca7348eae',
                        to: 'd451a78e1ec7181c',
                        delta1: {
                            x: -230,
                            y: -9,
                        },
                        delta2: {
                            x: -236,
                            y: 14,
                        },
                    },
                ],
                summaries: [
                    {
                        id: 'd451a84c2e77cc2f',
                        parent: 'd451a6f027c33b1f',
                        start: 0,
                        end: 0,
                        text: 'summary',
                    },
                ],
                direction: 2,
                theme: {
                    name: 'Latte',
                    palette: [
                        '#4968a3',
                        '#3b88c4',
                        '#4fa3d4',
                        '#2b5b84',
                        '#367fa2',
                        '#5e93b7',
                        '#4a719c',
                        '#28567d',
                        '#214e6d',
                        '#336699',
                    ],
                    cssVar: {
                        '--main-color': '#444446',
                        '--main-bgcolor': '#ffffff',
                        '--color': '#777777',
                        '--bgcolor': '#f6f6f6',
                        '--panel-color': '#444446',
                        '--panel-bgcolor': '#ffffff',
                        '--panel-border-color': '#eaeaea',
                    },
                },
            }
            ,
        ]
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
    }
});

export const {
    nextMindMap,
    prevMindMap,
    createMindMap,
    updateMindMap,
    deleteMindMap
} = mindMaps.actions;
export default mindMaps.reducer;
