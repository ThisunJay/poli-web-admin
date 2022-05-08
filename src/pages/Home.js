import React from 'react';

function Home() {
  return (
    <div>
      <div className="container" style={{backgroundColor: '#5a32a8', borderRadius: 10}}>
        <div className="row mt-5 p-5">
          <div className="col">
          </div>
          <div className="col">
            <h1 style={{textAlign: 'center', color: 'white'}}>LOGIN</h1>
            <div className='card shadow p-3 mb-5 bg-body rounded'>
              <div className='card-body'>
                
                <form>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control"
                      id="exampleInputEmail1" aria-describedby="emailHelp" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control"
                      id="exampleInputPassword1" />
                  </div>
                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                  </div>
                  <button type="submit" className="btn btn-primary">Login</button>
                </form>

              </div>
            </div>
          </div>
          <div className="col">
          </div>
        </div>
    </div>
    </div>
  );
}

export default Home;
