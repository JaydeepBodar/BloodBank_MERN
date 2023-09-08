import React from 'react'

const InputType = ({classdata,label,...data}) => {
  return (
    <React.Fragment>
      <label className={classdata}>{label}</label>
      <input {...data} />
    </React.Fragment>
  )
}

export default InputType
