import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../../utils/api';
import { toBase64 } from '../../../utils';

const Upload = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [tag, setTag] = useState('');
  const [reward, setReward] = useState('');
  const [image, setImage] = useState([]);

  const onUpload = async ({ title, description, deadline, tag, reward, image }) => {
    console.log(title, description, deadline, tag, reward, image)
    const { status } = await api.addJobs({ title, description, deadline, tag, reward, image });
    if (status === 'success') {
      return navigate('/umkm/job/list');
    }
  };

  const onHandleFileEvent = async (e) => {
    const imagesFile = Array.prototype.slice.call(e.target.files)
    if (!e.target.files[0]) return;

    const uploadImage = []; // ...image
    imagesFile.forEach(async (file) => {
      // if (file.size > 1048576) {
      //   alert("File is to big");
      //   return;
      // }
      const base64Image = await toBase64(file);
      uploadImage.push(base64Image)
    });
    console.log(uploadImage);
    setImage(uploadImage);

    if (e.target.files[0].size > 1048576) {
      alert("File is to big");
      return;
    }
  }

  return (
    <>
      <div class="input-group mb-3">
        <input onChange={(e) => onHandleFileEvent(e)} type="file" class="form-control" id="inputGroupFile02" accept='image/jpeg, image/jpg, image/png' multiple />
        <label class="input-group-text" for="inputGroupFile02">Upload</label>
      </div>
      <div class="form-floating mb-3">
        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" class="form-control" id="floatingInput" placeholder="name@example.com" />
        <label for="floatingInput">Judul Sayembara</label>
      </div>
      <div class="form-floating mb-3">
        <input value={deadline} onChange={(e) => setDeadline(e.target.value)} type="date" class="form-control" id="floatingPassword" placeholder="Password" />
        <label for="floatingPassword">Rentang Waktu</label>
      </div>
      <div class="form-floating mb-3">
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} type="text" class="form-control" id="floatingPassword" placeholder="Password" />
        <label for="floatingPassword">Deskripsi</label>
      </div>
      <div class="form-floating mb-3">
        <input value={reward} onChange={(e) => setReward(e.target.value)} type="text" class="form-control" id="floatingPassword" placeholder="Password" />
        <label for="floatingPassword">Hadiah/Benefit</label>
      </div>
      <div class="form-floating mb-3">
        <input value={tag} onChange={(e) => setTag(e.target.value)} type="text" class="form-control" id="floatingPassword" placeholder="Password" />
        <label for="floatingPassword">Tags</label>
      </div>

      <div class="d-flex justify-content-end">
        <Link to="/umkm/job/list" type="button" class="btn btn-primary mx-3">Draft</Link>
        <button onClick={() => onUpload({ title, description, deadline, tag, reward, image })} class="btn btn-primary">Post</button>
      </div>
    </>
  )
}

export default Upload