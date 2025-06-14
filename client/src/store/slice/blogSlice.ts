import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import supabase from '../../config/config';
import Swal from 'sweetalert2';

//interface here

interface Record {
    recordID: number;
    recordTitle: string;
    recordContext: string;
    recordImg: string;
}

interface blogState {
    showAddModal: boolean;
    record: Record[];
    showEditModal: boolean;
    editID: number;
    editTitle: string;
    editContext: string;
    editFile: File | null;
    editImageUrl: string;
}

const initialState : blogState = {
    showAddModal: false,
    record: [],
    showEditModal: false,
    editID: 0,
    editTitle: '',
    editContext: '',
    editFile: null,
    editImageUrl: '',
}

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setShowAddModal: (state, action: PayloadAction<boolean>) => {
            state.showAddModal = action.payload;
        },

        setRecord: (state, action: PayloadAction<Record[]>) => {
            state.record = action.payload;
        },

        setShowEditModal: (state, action: PayloadAction<boolean>) => {
            state.showEditModal = action.payload;
        },

        setEditTitle: (state, action: PayloadAction<string>) => {
            state.editTitle = action.payload;
        },

        setEditContext: (state, action: PayloadAction<string>) => {
            state.editContext = action.payload;
        },

        setEditFile: (state, action: PayloadAction<File | null>) => {
            state.editFile = action.payload;
        },

        setEditImageUrl: (state, actionm: PayloadAction<string>) => {
            state.editImageUrl = actionm.payload;
        }, 

        setEditID: (state, action: PayloadAction<number>) => {
            state.editID = action.payload;
        }
    }
});

export const getRecordSlice = async (dispatch: any) => {
    const {data, error} = await supabase.from('blog_record').select('*');

    if (error) {
        Swal.fire({
            title:'Error Getting Record',
            text:'There has been error in getting record',
            icon:'error'
        })
    }

    else {
        dispatch(setRecord(data));
    }
}

export const submitEditBlog = async (editID: number, editTitle: string, editContext: string, editFile: File | null, dispatch: any) => {
    // File Upload Function Start
    if (!editFile) {
        Swal.fire('Error', 'No file selected.', 'error');
        return;
    }

    const fileName = `${Date.now()}_${editFile.name}`;

    const { error } = await supabase.storage.from('uploads').upload(fileName, editFile);

    if (error) {
        Swal.fire('Error', error.message, 'error');
        return;
    }

    const { data } = supabase.storage.from('uploads').getPublicUrl(fileName);

    const publicUrl = data?.publicUrl || '';

    dispatch(setEditImageUrl(publicUrl));
    // File Upload Function End

    const { error: error2} = await supabase.from('blog_record').update({recordTitle: editTitle, recordContext: editContext, recordImg: publicUrl}).eq('recordID',editID);

    if (error2) {
        Swal.fire({
            title:'Error Updating Blog',
            text:'There has been error in updating blog',
            icon:'error'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href='/Blog';
            }
        })
    }

    else {
        Swal.fire({
            title:'Blog Updated',
            text:'The blog has been updated successfully',
            icon:'success'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href='/Blog';
            }
        })
    }
}

export const {setShowAddModal, setRecord, setShowEditModal, setEditTitle, setEditContext, setEditFile, setEditImageUrl, setEditID} = blogSlice.actions;

export default blogSlice.reducer;