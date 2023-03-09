import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    data: [],
    status: 'idle',
    error: null
}

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json'
        }
    };
    const response = await fetch(`http://localhost:3001/notes`, requestOptions);
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw Error(response.statusText);
    }
});

export const addNewNote = createAsyncThunk('notes/AddNewNote', async (initialNotes) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(initialNotes)
    };
    const response = await fetch(`http://localhost:3001/note`, requestOptions);
    if (response.ok) {
        const data = await response.json();
        const noteAdded = { ...initialNotes, _id: data._id };
        return noteAdded;
    } else {
        return null;
    }
});

export const updateExistingNote = createAsyncThunk('notes/updateExistingNote', async (currentNote) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentNote)
    };

    const res = await fetch(`http://localhost:3001/note/${currentNote._id}`, requestOptions)

    if (res.ok) {
        return currentNote;
    } else {
        return null;
    }
})

export const deleteNote = createAsyncThunk('notes/deleteNote', async (currentNote) => {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json'
        }
    };

    const res = await fetch(`http://localhost:3001/note/${currentNote._id}`, requestOptions)
    if (res.ok) {
        return currentNote;
    }
})

export const getFilteredNotes = (state, keyword) => {
    if (keyword) {
        const isKeywordExist = (array, string) => array.toLowerCase().includes(string);

        return state.notes.data.filter(note => isKeywordExist(note.title, keyword))
    } else {
        return state.notes.data
    }
}

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        statusReset(state, action) {
            state.status = 'idle';
        },
        updateSort(state, action) {
            if (action.payload === 'oldest') {
                state.data = state.data.sort(
                    (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
                );
            } else if (action.payload === 'newest') {
                state.data = state.data.sort(
                    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
                );
            }
        }
    },
    extraReducers: {
        [fetchNotes.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchNotes.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        },
        [fetchNotes.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message
        },
        [addNewNote.pending]: (state, action) => {
            state.status = 'loading';
        },
        [addNewNote.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.data.push(action.payload);
        },
        [addNewNote.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
        [updateExistingNote.pending]: (state, action) => {
            state.status = 'loading';
        },
        [updateExistingNote.fulfilled]: (state, action) => {
            state.state = 'succeeded';
            const { _id, title, note } = action.payload;
            const existingNote = state.data.find(note => note._id === _id);
            if (existingNote) {
                existingNote.title = title;
                existingNote.note = note
            }
        },
        [updateExistingNote.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
        [deleteNote.pending]: (state, action) => {
            state.status = "loading"
        },
        [deleteNote.fulfilled]: (state, action) => {
            state.status = "succeeded";
            const { _id } = action.payload
            const updateNotes = state.data.filter(note => note._id === _id);
            state.data = updateNotes
        },
        [deleteNote.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message
        }
    }
})

export const { statusReset, updateSort } = notesSlice.actions
export default notesSlice.reducer