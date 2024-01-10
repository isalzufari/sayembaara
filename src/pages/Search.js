import React, { useState } from 'react'

const Search = () => {
  const [search, setSearch] = useState([
    {
      name: 'Karenza Albarru',
      img_url: 'https://placehold.co/400x400',
      type: 'Desainer'
    },
    {
      name: 'Albarru Karenza',
      img_url: 'https://placehold.co/400x400',
      type: 'Engineer'
    }
  ]);
  return (
    <>
      <div class="mb-3">
        <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Ketik disini..." />
      </div>

      <span class="badge rounded-pill text-bg-primary">Semua</span>
      <span class="badge rounded-pill text-bg-primary">Sayembara</span>
      <span class="badge rounded-pill text-bg-primary">Orang</span>

      <div className="row mt-3">
        {search.map((data, key) => (
          <div className="col-12">
            <div class="card mb-3">
              <div class="row g-0">
                <div class="col-4">
                  <img src={data.img_url} class="img-fluid rounded-circle" alt="..." />
                </div>
                <div class="col-8">
                  <div class="d-flex align-items-center">
                    <div class="card-body">
                      <h5 class="card-title">{data.name}</h5>
                      <p class="card-text">{data.type}</p>
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

export default Search