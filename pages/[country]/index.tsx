'use strict';

import { GetServerSideProps } from 'next';
import React, { FC } from 'react'


export const getServerSideProps : GetServerSideProps=  async function  (context){
    const Response = await fetch(`https://trendsend.herokuapp.com/apis/trends/by-place?placeName=${context.query.country}`);
    const data = await Response.json()
    return { props : {
        country:context.query.country,
        data : data.data
    }}
}

const  index : FC = function (props) {
    console.log(props);
    return (
        <div>
            <h1 style={{color:'black'}}>{'hi'}</h1>
        </div>
    )
}

export default index
