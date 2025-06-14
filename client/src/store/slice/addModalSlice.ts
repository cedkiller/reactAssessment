import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import supabase from '../../config/config';
import Swal from 'sweetalert2';
//interface here

interface addModalState {
    title: string;
    context: string;
    file: File | null;
    imageUrl: string;
}

const initialState : addModalState = {
    title: '',
    context: '',
    file: null,
    imageUrl: '',
}

const addModalSlice = createSlice({
    name: 'addModal',
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },

        setContext: (state, action: PayloadAction<string>) => {
            state.context = action.payload;
        },

        setFile: (state, action: PayloadAction<File | null>) => {
            state.file = action.payload;
        },

        setImageUrl: (state, action: PayloadAction<string>) => {
            state.imageUrl = action.payload;
        }
    }
})

export const submitSlice = async (title: string, context: string, file: File | null, imageUrl: string, dispatch: any) => {
    // File Upload Function Start
    if (!file) {
        Swal.fire('Error', 'No file selected.', 'error');
        return;
    }

    const fileName = `${Date.now()}_${file.name}`;

    const { error } = await supabase.storage.from('uploads').upload(fileName, file);

    if (error) {
        Swal.fire('Error', error.message, 'error');
        return;
    }

    const { data } = supabase.storage.from('uploads').getPublicUrl(fileName);

    const publicUrl = data?.publicUrl || '';

    dispatch(setImageUrl(publicUrl));
    // File Upload Function End

    const { data: data2, error: error2 } = await supabase.from('blog_record').insert({
        recordTitle: title,
        recordContext: context,
        recordImg: publicUrl,  
    });

    if (error2) {
        Swal.fire({
        title: 'Error Adding Blog',
        text: 'There has been an error in adding blog',
        icon: 'error',
        }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = '/Blog';
        }
        });
    } else {
        Swal.fire({
        title: 'Blog Added',
        text: 'The blog has been added successfully.',
        icon: 'success',
        }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = '/Blog';
        }
        });
    }
};


export const {setTitle, setContext, setFile, setImageUrl} = addModalSlice.actions;

export default addModalSlice.reducer;