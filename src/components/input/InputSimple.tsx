import React from 'react'

const InputSimple = ({ label, value, classNameBox = '' }: { label: string, value: any, classNameBox?: string }): JSX.Element => {
  return (
    <div className={`${classNameBox} flex justify-between items-end`}>
        <p className='text-slate-400 font-light'>{ label }:</p>
        <p className='font-black text-slate-100'>{ value }</p>
    </div>
  )
}

export default InputSimple
