import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import {
  setShowAddModal,
  getRecordSlice,
  setShowEditModal,
  setEditTitle,
  setEditContext,
  setEditID
} from '../store/slice/blogSlice';
import { submitDeleteSlice } from '../store/slice/deleteBlogSlice';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import AddModal from '../components/AddModal';
import EditModal from '../components/EditModal';
import '../assets/css/Blog.css';
import supabase from '../config/config';

function Blog() {
  const dispatch = useDispatch();
  const showAddModal = useSelector((state: RootState) => state.blog.showAddModal);
  const record = useSelector((state: RootState) => state.blog.record);
  const showEditModal = useSelector((state: RootState) => state.blog.showEditModal);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5; 

  useEffect(() => {
    getRecord();
  });

  const getRecord = async () => {
    getRecordSlice(dispatch);
  };

  const addBlog = async () => {
    dispatch(setShowAddModal(true));
  };

  const editBlog = async (recordID: number) => {
    const { data, error } = await supabase.from('blog_record').select('*').eq('recordID', recordID);

    if (!error) {
      dispatch(setEditTitle(data[0].recordTitle));
      dispatch(setEditContext(data[0].recordContext));
      dispatch(setEditID(recordID));
      dispatch(setShowEditModal(true));
    }
  };

  const deleteBlog = async (recordID: number) => {
    Swal.fire({
      title: 'Are You Sure',
      text: 'Do you want to delete this blog?',
      icon: 'info',
      showDenyButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        submitDeleteSlice(recordID, dispatch);
      } else if (result.isDenied) {
        window.location.reload();
      }
    });
  };

//   Paginator Function Start
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = record.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(record.length / recordsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  //   Paginator Function End

  return (
    <>
      <Header />
      {showAddModal && <AddModal />}
      {showEditModal && <EditModal />}
      <br />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '78%' }}>
          <button className='btn btn-lg btn-primary shadow-sm rounded-pill px-4' onClick={() => addBlog()}>+ Add Blog</button>
        </div>
        <br />

        {currentRecords.map((rec) => (
          <div className='div' key={rec.recordID}>
            <div className='div3'>
              <img src={rec.recordImg} alt="img1" className='img1' />
            </div>

            <div className='div2'>
              <h1><span style={{ color: 'gray' }}>Title: </span> {rec.recordTitle}</h1>
              <br />
              <p><span style={{ color: 'gray' }}>Context: </span> {rec.recordContext}</p>
            </div>

            <div className='div4 d-flex flex-column align-items-center justify-content-center'>
              <button className="btn btn-outline-warning btn-lg mb-3 shadow-sm rounded-circle" onClick={() => editBlog(rec.recordID)}>
                <i className="fas fa-edit"></i>
              </button>

              <button className="btn btn-outline-danger btn-lg shadow-sm rounded-circle" onClick={() => deleteBlog(rec.recordID)}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        ))}

        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0', gap: '10px' }}>
          <button
            className="btn btn-secondary"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span style={{ alignSelf: 'center' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-secondary"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Blog;
