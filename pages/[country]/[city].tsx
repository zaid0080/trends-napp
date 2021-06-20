import React from 'react'

export async function getServerSideProps(context: { query: { country: any; }; }){
    const Response = await fetch(`https://trendsend.herokuapp.com/apis/trends/by-place?placeName=${context.query.country}`);
    const data = await Response.json()
    console.log(data)
    return { props : {
        country:context.query.country,
        data : data.data
    }}
}


function city() {
    return (
        <div>
            <h1 style={{color:'black'}}>city</h1>
        </div>
    )
}

export default city
