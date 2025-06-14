import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import type {RootState} from '../store/store';
import {setTitle, setContext, setFile, submitSlice} from '../store/slice/addModalSlice';
import '../assets/css/AddModal.css';

function AddModal() {
    const dispatch = useDispatch();
    const title = useSelector((state: RootState) => state.addModal.title);
    const context = useSelector((state: RootState) => state.addModal.context);
    const file = useSelector((state: RootState) => state.addModal.file);
    const imageUrl = useSelector((state: RootState) => state.addModal.imageUrl);

    const closeModal = async () => {
        window.location.href='/Blog';
    }

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        submitSlice(title, context, file, imageUrl, dispatch);
    };
    return (
        <>
            <div className="modal show"> 
                <div className="modal-content">
                    <button className="close" onClick={() => closeModal()}>&times;</button>
                    <h1 style={{textAlign:'center', fontSize:30, fontWeight:'bold', color:'gray'}}>Add Blog</h1>
                    <hr />

                    <form onSubmit={submit}>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Title</label>

                            <div className="col-sm-10">
                                <input type="text" placeholder='Enter a title of the blog' value={title} onChange={(e) => dispatch(setTitle(e.target.value))} className='form-control'/>
                            </div>
                        </div>
                        <br />

                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Context</label>

                            <div className="col-sm-10">
                                <textarea value={context} onChange={(e) => dispatch(setContext(e.target.value))} className='form-control'></textarea>
                            </div>
                        </div>
                        <br />

                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Upload Picture of the Blog</label>

                            <div className="col-sm-10">
                                <input type="file" onChange={e => dispatch(setFile(e.target.files?.[0] || null))} className='form-control'/>
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

export default AddModal;
