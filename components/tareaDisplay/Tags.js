import React, { useEffect, useState } from 'react'



const Tags = ({ tags }) => {

    const [fontcolor, cambiarFontColor] = useState('white')


    function getContrastYIQ(hexcolor) {
        hexcolor = hexcolor.replace("#", "");
        var r = parseInt(hexcolor.substr(0, 2), 16);
        var g = parseInt(hexcolor.substr(2, 2), 16);
        var b = parseInt(hexcolor.substr(4, 2), 16);
        var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? '#2A2A2A' : 'white';
    }

    useEffect(() => {

        if (tags.color) {
            const nuevocolor = getContrastYIQ(tags.color)
            cambiarFontColor(nuevocolor)
        }

    }, [tags.color])


    return (
        <li style={{ background: `${tags.color}`, color: `${fontcolor}` }} className="tag-individual-container">
            <p style={{ color: `${fontcolor}` }}>{tags.tagnombre}</p>
        </li>
    );
}

export default Tags;