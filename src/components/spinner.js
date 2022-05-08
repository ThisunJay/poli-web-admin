import React from 'react'

export default function spinner() {
  return (
        <div className="d-flex justify-content-center mx-4 my-4">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>  
        </div>
  )
}
