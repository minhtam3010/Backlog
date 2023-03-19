import { useEffect, useState } from "react";
import "./Table.css";

export const BacklogTableHeader = () => {
    return (
        <thead>
            <tr>
                <th className="table-column">Job's Name</th>
                <th className="table-column">Priority</th>
                <th className="table-column">Progress</th>
                <th className="table-column">Date</th>
                <th className="table-column">PIC</th>
                <th className="table-column">Note</th>
            </tr>
        </thead>
    );
};

const BacklogTableRow = ({ idx, row, myFunc }) => {
    return (
        <tr onClick={() => myFunc(idx)}>
            <td className="table-column first-column">{row.name ?? "ABC"}</td>
            <td className="table-column">{row.priority ?? "P2"}</td>
            <td className="table-column">{row.progress ?? "Not started"}</td>
            <td className="table-column">{row.date ?? "Sth"}</td>
            <td className="table-column">{row.pic ?? "MT"}</td>
            <td className="table-column">{row.note ?? "Vip"}</td>
        </tr>
    );
};

export default BacklogTableRow;
