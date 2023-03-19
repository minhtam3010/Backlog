import { Select, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFire,
    faKey,
    faUser,
    faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { GetUserFullName, GetWorkLoad, UpdateWorkload } from "./userBacklog";
import { useEffect, useState } from "react";

const handleChange = (value, dataUpdate) => {
    dataUpdate["workPriority"] = value;
    UpdateWorkload(dataUpdate);
};

const handleProgressChange = (value, dataUpdate) => {
    dataUpdate["progress"] = value;
    UpdateWorkload(dataUpdate);
};

const handlePICChange = (value, dataUpdate, myArrName) => {
    myArrName?.map((item) => {
        if (item["fullName"] === value) {
            dataUpdate["pic"] = item["id"];
        }
    });

    UpdateWorkload(dataUpdate);
};

const renderLabel = (icon, text) => {
    return (
        <>
            <FontAwesomeIcon icon={icon} />
            <span style={{ marginLeft: 8 }}>{text}</span>
        </>
    );
};

export const SelectPriority = ({ data, idx }) => {
    const [getWorkload, setWorkload] = useState([]);

    useEffect(() => {
        GetWorkLoad().then((res) => {
            setWorkload(res);
        });
    }, []);
    return (
        <Space wrap>
            <Select
                defaultValue={data["workPriority"]}
                style={{
                    width: 120,
                }}
                onChange={(value) => handleChange(value, getWorkload[idx])}
                options={[
                    {
                        value: "P1",
                        label: "P1",
                    },
                    {
                        value: "P2",
                        label: "P2",
                    },
                    {
                        value: "P3",
                        label: "P3",
                    },
                    {
                        value: "P4",
                        label: "P4",
                    },
                ]}
            />
        </Space>
    );
};

export const SelectProgress = ({ data, idx }) => {
    const [getWorkload, setWorkload] = useState([]);

    useEffect(() => {
        GetWorkLoad().then((res) => {
            setWorkload(res);
        });
    }, []);

    return (
        <Space wrap>
            <Select
                defaultValue={data["progress"]}
                style={{
                    width: 120,
                }}
                onChange={(value) =>
                    handleProgressChange(value, getWorkload[idx])
                }
                options={[
                    {
                        value: "Not Started",
                        label: "Not Started",
                    },
                    {
                        value: "In Progress",
                        label: "In Progress",
                    },
                    {
                        value: "Completed",
                        label: "Completed",
                    },
                ]}
            />
        </Space>
    );
};

export const SelectPIC = ({ option, data, idx }) => {
    const [getWorkload, setWorkload] = useState([]);

    const [showNames, setShowNames] = useState([]);

    useEffect(() => {
        GetWorkLoad().then((res) => {
            setWorkload(res);
        });
        GetUserFullName().then((res) => {
            setShowNames(res);
        });
    }, []);

    const myName = showNames["data"]?.map((item) => {
        return {
            id: item["id"],
            fullName: item["fullName"],
        };
    });

    return (
        <Space wrap>
            <Select
                defaultValue={data}
                style={{
                    width: 120,
                }}
                onChange={(value) =>
                    handlePICChange(value, getWorkload[idx], myName)
                }
                options={option}
            />
        </Space>
    );
};
