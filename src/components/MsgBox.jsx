import React from 'react';

const MsgBox = (props) => {
    return (
        
        <div className='bg-[#fffef6] font-epilogue p-3 rounded-lg mb-3'>
            <h5>Username</h5>
            <p>{props.content}</p>
        </div>
    );
};

export default MsgBox;