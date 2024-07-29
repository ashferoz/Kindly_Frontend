import React from 'react';

const ConnectionSideBarCard = (props) => {
    console.log(props)
    return (
        <div className="border border-[#dde5b6] p-2 cursor-pointer hover:bg-[#dde5b6] active:bg-[#dbe3af] focus:bg-[#dbe3af]">
            <h2 className="text-2xl">{props.username}</h2>
            <h3 className="font-epilogue py-1">{props.title}</h3>
            <h3 className="font-epilogue">{props.status}</h3>
          </div>
    );
};

export default ConnectionSideBarCard;