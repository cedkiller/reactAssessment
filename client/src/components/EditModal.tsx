import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import type {RootState} from '../store/store';
import {setEditTitle, setEditContext, setEditFile, submitEditBlog} from '../store/slice/blogSlice';
import '../assets/css/AddModal.css';

function EditModal() {
    const dispatch = useDispatch();
    const editID = useSelector((state: RootState) => state.blog.editID);
    const editTitle = useSelector((state: RootState) => state.blog.editTitle);
    const editContext = useSelector((state: RootState) => state.blog.editContext);
    const editFile = useSelector((state: RootState) => state.blog.editFile);

    const closeModal = async () => {
        window.location.href='/Blog';
    }

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        submitEditBlog(editID, editTitle, editContext, editFile, dispatch);
    };
    return (
        <>
            <div className="modal show"> 
                <div className="modal-content">
                    <button className="close" onClick={() => closeModal()}>&times;</button>
                    <h1 style={{textAlign:'center', fontSize:30, fontWeight:'bold', color:'gray'}}>Edit Blog</h1>
                    <hr />

                    <form onSubmit={submit}>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Title</label>

                            <div className="col-sm-10">
                                <input type="text" placeholder='Enter a title of the blog' value={editTitle} onChange={(e) => dispatch(setEditTitle(e.target.value))} className='form-control'/>
                            </div>
                        </div>
                        <br />

                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Context</label>

                            <div className="col-sm-10">
                                <textarea value={editContext} onChange={(e) => dispatch(setEditContext(e.target.value))} className='form-control'></textarea>
                            </div>
                        </div>
                        <br />

                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Upload Picture of the Blog</label>

                            <div className="col-sm-10">
                                <input type="file" onChange={e => dispatch(setEditFile(e.target.files?.[0] || null))} className='form-control'/>
                            </div>
                        </div>
                        <br />

                        <button className='btn btn-primary w-100'>Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditModal;
