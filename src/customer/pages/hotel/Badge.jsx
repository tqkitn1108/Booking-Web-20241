import * as React from 'react';

export default function Badges({ hotelFacilites }) {
    return (
        <div className="grid grid-cols-4 gap-2 mb-5">
            {hotelFacilites?.map((facility, index) => (
                <div className="text-green-700 text-sm bg-gray-100 h-10 leading-10 rounded-full text-center font-bold" key={index}>
                    <span>{facility.label}</span>
                </div>))}
        </div>
    );
}