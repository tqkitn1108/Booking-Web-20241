import React from 'react';
import { Link } from 'react-router-dom';

export default function Trending() {
    const cities = [
        { name: 'Hà Nội', imageUrl: 'https://jackytravel.com/wp-content/uploads/2019/02/Untitled-838x530.png', flag: '🇻🇳' },
        { name: 'TP. Hồ Chí Minh', imageUrl: 'https://cf.bstatic.com/xdata/images/city/600x600/688893.jpg?k=d32ef7ff94e5d02b90908214fb2476185b62339549a1bd7544612bdac51fda31&o=', flag: '🇻🇳' },
        { name: 'Hội An', imageUrl: 'https://cf.bstatic.com/xdata/images/city/600x600/688866.jpg?k=fc9d2cb9fe2f6d1160e10542cd2b83f5a8008401d33e8750ee3c2691cf4d4f7e&o=', flag: '🇻🇳' },
        { name: 'Đà Nẵng', imageUrl: 'https://cf.bstatic.com/xdata/images/city/600x600/688844.jpg?k=02892d4252c5e4272ca29db5faf12104004f81d13ff9db724371de0c526e1e15&o=', flag: '🇻🇳' },
        { name: 'Ninh Bình', imageUrl: 'https://cf.bstatic.com/xdata/images/city/600x600/640445.jpg?k=50b44df6e3029c95c1874da1ae9634d62ac2264961b917271d56d7637ccb059c&o=', flag: '🇻🇳' },
    ];

    return (
        <div className="grid grid-cols-6 gap-2 w-full max-w-[1200px] relative mx-auto">
            <Link to={`/hotels/search?location=${cities[0].name}&page=0`} className="relative overflow-hidden rounded-xl col-span-3 trending-top" style={{ height: '250px' }}>
                <img className="h-full w-full object-cover" src={cities[0].imageUrl} alt={cities[0].name} />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 flex items-center trending-title">
                    <p className="text-white trending-title">{cities[0].name}</p>
                    <img className="trending-title-img w-5 ml-2" src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg" alt="Vietnam flag" />
                </div>
            </Link>
            <Link to={`/hotels/search?location=${cities[1].name}&page=0`} className="relative overflow-hidden rounded-xl col-span-3 trending-top" style={{ height: '250px' }}>
                <img className="h-full w-full object-cover" src={cities[1].imageUrl} alt={cities[1].name} />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 flex items-center trending-title">
                    <p className="text-white trending-title">{cities[1].name}</p>
                    <img className="trending-title-img w-5 ml-2" src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg" alt="Vietnam flag" />
                </div>
            </Link>
            <Link to={`/hotels/search?location=${cities[2].name}&page=0`} className="relative overflow-hidden rounded-xl col-span-2 trending-bottom" style={{ height: '250px' }}>
                <img className="h-full w-full object-cover" src={cities[2].imageUrl} alt={cities[2].name} />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 flex items-center trending-title">
                    <p className="text-white trending-title dest-name">{cities[2].name}</p>
                    <img className="trending-title-img w-4 ml-2" src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg" alt="Vietnam flag" />
                </div>
            </Link>
            <Link to={`/hotels/search?location=${cities[3].name}&page=0`} className="relative overflow-hidden rounded-xl col-span-2 trending-bottom" style={{ height: '250px' }}>
                <img className="h-full w-full object-cover" src={cities[3].imageUrl} alt={cities[3].name} />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 flex items-center trending-title">
                    <p className="text-white trending-title dest-name">{cities[3].name}</p>
                    <img className="trending-title-img w-4 ml-2" src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg" alt="Vietnam flag" />
                </div>
            </Link>
            <Link to={`/hotels/search?location=${cities[4].name}&page=0`} className="relative overflow-hidden rounded-xl col-span-2 trending-bottom" style={{ height: '250px' }}>
                <img className="h-full w-full object-cover" src={cities[4].imageUrl} alt={cities[4].name} />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 flex items-center trending-title">
                    <p className="text-white trending-title dest-name">{cities[4].name}</p>
                    <img className="trending-title-img w-4 ml-2" src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg" alt="Vietnam flag" />
                </div>
            </Link>
        </div>
    );
}
