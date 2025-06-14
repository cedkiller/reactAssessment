import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import supabase from '../../config/config';
import Swal from 'sweetalert2';

//interface here

interface deleteBlogState {
    delID: number;
}

const initialState : deleteBlogState = {
    delID: 0,
}

const deleteBlogSlice = createSlice({
    name: 'deleteBlog',
    initialState,
    reducers: {
        setDelID: (state, action: PayloadAction<number>) => {
            state.delID = action.payload;
        }
    }
});

export const submitDeleteSlice = async (recordID: number, dispatch: any) => {
    const {data, error} = await supabase.from('blog_record').delete().eq('recordID',recordID);

    if (error) {
        Swal.fire({
            title:'Error Deleting Blog',
            text:'There has been error in deleting blog',
            icon:'error'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href='/Blog';
            }
        })
    }

    else {
        Swal.fire({
            title:'Blog Deleted',
            text:'The blog has been deleted successfully',
            icon:'success'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href='/Blog';
            }
        })
    }
}

export const {setDelID} = deleteBlogSlice.actions;

export default deleteBlogSlice.reducer;