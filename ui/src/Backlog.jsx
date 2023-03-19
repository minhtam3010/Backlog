import { useEffect, useState } from "react";
import "./Backlog.css";
import MyCalendar from "./Calendar";
import MyModal, { MyNote } from "./Modal";
import "./Modal.css";
import { SelectPIC, SelectPriority, SelectProgress } from "./Select";
import BacklogTableRow, { BacklogTableHeader } from "./Table";
import { Button, Space } from "antd";
import { CreateWorkload, GetUserFullName, GetWorkLoad } from "./userBacklog";

export const GetIdx = (idx) => {
    return idx;
};

export function refreshPage() {
    window.location.reload(false);
}

const Backlog = () => {
    const [showTables, setShowTables] = useState([]);

    const [showNames, setShowNames] = useState([]);

    const [getWorkload, setWorkload] = useState([]);

    const [getIdWorkload, setIdWorkload] = useState([]);

    const [getUpdateWorkload, setUpdateWorkload] = useState({});

    useEffect(() => {
        GetUserFullName().then((res) => {
            setShowNames(res);
        });
        GetWorkLoad().then((res) => {
            setWorkload(res);
            setIdWorkload(
                ...getIdWorkload,
                res?.map((item) => item)
            );
        });
    }, []);

    useEffect(() => {
        setShowTables((prevTables) => {
            const newTables = getWorkload.map((item, idx) => ({
                name: <MyModal data={item} idx={idx} />,
                priority: <SelectPriority data={item} idx={idx} />,
                progress: <SelectProgress data={item} idx={idx} />,
                date: (
                    <MyCalendar
                        date1={item["dateStarted"]}
                        date2={item["dateCompleted"]}
                        idx={idx}
                    />
                ),
                pic: (
                    <SelectPIC
                        option={myOption ?? [{ value: "Tâm", label: "Tâm" }]}
                        data={item["picFullname"]}
                        idx={idx}
                    />
                ),
                note: <MyNote data={item["note"]} idx={idx} />,
            }));
            return [...prevTables, ...newTables];
        });
    }, [getWorkload]);

    const myOption = showNames["data"]?.map((item) => {
        return {
            value: item["fullName"],
            label: item["fullName"],
        };
    });

    const handleClick = () => {
        const newRow = {
            name: <MyModal data={{ jobName: "", content: "" }} />,
            priority: <SelectPriority data={{ workPriority: "" }} />,
            progress: <SelectProgress data={{ priority: "" }} />,
            date: <MyCalendar date1={""} date2={""} />,
            pic: (
                <SelectPIC
                    option={myOption ?? [{ value: "Tâm", label: "Tâm" }]}
                />
            ),
            note: <MyNote data={""} />,
        };
        CreateWorkload().then((res) => {
            setIdWorkload([...getIdWorkload, res]);
        });

        setShowTables([...showTables, newRow]);
    };

    useEffect(() => {}, []);

    const handleSubmit = () => {
        console.log("title");
    };

    function handleRowClick(id) {
        setUpdateWorkload(getIdWorkload[id]);
    }

    return (
        <div className="body">
            <div className="backlog">
                <Space wrap className="backlog-btn">
                    <Button type="primary" onClick={handleClick}>
                        New
                    </Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </Space>
            </div>
            <table id="myTable">
                <BacklogTableHeader />
                <tbody>
                    {showTables.map((row, index) => (
                        <BacklogTableRow
                            idx={index}
                            row={row}
                            myFunc={handleRowClick}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Backlog;
