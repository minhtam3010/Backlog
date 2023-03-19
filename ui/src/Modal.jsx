import { Button, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { refreshPage } from "./Backlog";
import "./Modal.css";
import { GetWorkLoad, UpdateWorkload } from "./userBacklog";

const { TextArea } = Input;

const MyModal = ({ data, idx }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [visible, setVisible] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [title, setTitle] = useState("");
    const [getWorkload, setWorkload] = useState([]);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        setVisible(false);
        // UpdateWorkload(getWorkload[idx]);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setVisible(false);
    };

    useEffect(() => {
        setTitle(data["jobName"]);
        setInputValue(data["content"]);
        GetWorkLoad().then((res) => {
            setWorkload(res);
        });
    }, []);

    console.log(getWorkload[idx]);
    return (
        <>
            <div className="crop">
                <h2 className="title">{title}</h2>
            </div>
            <Button
                style={{ display: "none" }}
                type="primary"
                onClick={() => {
                    showModal();
                }}
                className="myModal"
            >
                Open
            </Button>
            <Modal
                title={
                    <Input
                        placeholder="Title"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            getWorkload[idx]["jobName"] = e.target.value;
                            UpdateWorkload(getWorkload[idx]);
                        }}
                        width={500}
                    />
                }
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1300} // set the width of the modal to 800px
            >
                <TextArea
                    rows={30}
                    placeholder="Content"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </Modal>
        </>
    );
};

export const MyNote = ({ data, idx }) => {
    const [inputValue, setInputValue] = useState("");
    const [getWorkload, setWorkload] = useState([]);

    useEffect(() => {
        GetWorkLoad().then((res) => {
            setWorkload(res);
        });
    }, []);

    if (data !== "") {
        useEffect(() => {
            setInputValue(data);
        }, []);

        return (
            <Input
                placeholder="Note"
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    getWorkload[idx]["note"] = e.target.value;
                    UpdateWorkload(getWorkload[idx]);
                }}
            />
        );
    }

    useEffect(() => {
        setInputValue(inputValue);
    }, [inputValue]);

    return (
        <Input
            placeholder="Note"
            value={inputValue}
            onChange={(e) => {
                setInputValue(e.target.value);
                getWorkload[idx]["note"] = e.target.value;
                UpdateWorkload(getWorkload[idx]);
            }}
            defaultValue={data}
        />
    );
};

export default MyModal;
