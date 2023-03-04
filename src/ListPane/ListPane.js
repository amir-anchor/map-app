import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { ListItem } from "../ListItem/ListItem";
import "./ListPane.css";

export function ListPane({searchQuery}) {
    const dataRef = useRef([]);
    const orderByRef = useRef(null);
    const [sortedData, setSortedData] = useState([]);

    const doSort = useCallback(() => {
        if (!orderByRef.current) return setSortedData(dataRef.current);
        const sorted = dataRef.current.slice().sort((a, b) => {
            const aCol = a[orderByRef.current.col];
            const bCol = b[orderByRef.current.col];
            return (aCol < bCol ? -1 : aCol === bCol ? 0 : 1) * (orderByRef.current.desc ? 1 : -1);
        });
        setSortedData(sorted);
    }, []);

    useEffect(() => {
        fetch('https://uh9mp9f92g.execute-api.us-east-1.amazonaws.com/production/test-get-listings' + (searchQuery ? '?query=' + searchQuery : ''))
            .then((response) => response.json())
            .then(({results}) => {
                dataRef.current = results;
                doSort();
            }, console.error);
    }, [doSort, searchQuery]);

    function onClickSort(col) {
        if (orderByRef.current?.col === col) {
            orderByRef.current.desc = !orderByRef.current.desc;
        } else {
            orderByRef.current = {col, desc: true};
        }

        doSort()
    }

    return <div className="ListPane">
        <h2>Homes for sale in Tampa</h2>
        <p>{sortedData.length} listings found</p>
        <p>
            <span>Order by:</span>
            <button onClick={() => onClickSort('createdAt')} className={`ListPane-sort-btn ${orderByRef.current?.col === 'createdAt' && 'ListPane-sort-btn-active'}`}>
                Newest {orderByRef.current?.col === 'createdAt' && (orderByRef.current.desc ? '⌄' : '⌃')}
            </button>
            <button onClick={() => onClickSort('status')} className={`ListPane-sort-btn ${orderByRef.current?.col === 'status' && 'ListPane-sort-btn-active'}`}>
                Status {orderByRef.current?.col === 'status' && (orderByRef.current.desc ? '⌄' : '⌃')}
            </button>
        </p>
        {sortedData.map((item, i) => <Fragment key={i}>
            <ListItem item={item} />
            {i === 1 && <div className="ListPane-ad">Make your strongest offer when you buy with Opendoor</div>}
        </Fragment>)}
    </div>;
}
