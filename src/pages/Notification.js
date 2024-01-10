import React, { useState } from 'react'

const Notification = () => {
  const [notif, setNotif] = useState([
    {
      name: 'Pesan baru dari Karenza',
      img_url: 'https://placehold.co/50x50',
    },
    {
      name: 'Hasil Kerja baru!',
      img_url: 'https://placehold.co/50x50',
    }
  ]);

  return (
    <>
      <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked />
        <label class="btn btn-outline-primary" for="btnradio1">Semua</label>

        <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" />
        <label class="btn btn-outline-primary" for="btnradio2">Pesan</label>

        <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" />
        <label class="btn btn-outline-primary" for="btnradio3">Update</label>
      </div>

      <div class="my-3">
        <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Ketik disini..." />
      </div>

      <span class="badge rounded-pill text-bg-primary">Semua</span>
      <span class="badge rounded-pill text-bg-primary">Terbaru</span>
      <span class="badge rounded-pill text-bg-primary">Sudah Dibaca</span>

      <div className="row mt-3">
        {notif.map((data, key) => (
          <div className="col-12">
            <div class="card mb-3">
              <div class="row g-0">
                <div class="col-4">
                  <img src={data.img_url} class="img-fluid rounded-circle" alt="..." />
                </div>
                <div class="col-8">
                  <div class="d-flex align-items-center">
                    <div class="card-body">
                      <h6 class="card-title">{data.name}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </>
  )
}

export default Notification