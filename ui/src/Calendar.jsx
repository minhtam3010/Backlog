import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { GetWorkLoad, UpdateWorkload } from "./userBacklog";

const handleDateStartedChange = (dateString) => {};

const handleDateCompletedChange = (dateString) => {};

const handleDateChange = (dateString, dateUpdate) => {
    dateUpdate["dateStarted"] = dateString[0];
    dateUpdate["dateCompleted"] = dateString[1];
    UpdateWorkload(dateUpdate);
};

const MyCalendar = ({ date1, date2, idx }) => {
    const [getWorkload, setWorkload] = useState([]);

    useEffect(() => {
        GetWorkLoad().then((res) => {
            setWorkload(res);
        });
    }, []);

    if (date1 === "" && date2 === "") {
        return (
            <Space
                direction="vertical"
                style={{
                    width: "100%",
                }}
            >
                <DatePicker.RangePicker
                    status="warning"
                    style={{
                        width: "100%",
                    }}
                    onChange={(date, dateString) => {
                        console.log(
                            handleDateChange(dateString, getWorkload[idx])
                        );
                    }}
                />
            </Space>
        );
    } else if (date1 !== "" && date2 === "") {
        return (
            <Space
                direction="vertical"
                style={{
                    width: "100%",
                }}
            >
                <DatePicker.RangePicker
                    status="warning"
                    style={{
                        width: "100%",
                    }}
                    onChange={(date, dateString) => {
                        console.log("?", dateString);
                    }}
                    defaultValue={[dayjs(date1)]}
                />
            </Space>
        );
    } else {
        return (
            <Space
                direction="vertical"
                style={{
                    width: "100%",
                }}
            >
                <DatePicker.RangePicker
                    status="warning"
                    style={{
                        width: "100%",
                    }}
                    onChange={(date, dateString) => {
                        console.log(
                            handleDateChange(dateString, getWorkload[idx])
                        );
                    }}
                    defaultValue={[dayjs(date1), dayjs(date2)]}
                />
            </Space>
        );
    }
};

export default MyCalendar;
