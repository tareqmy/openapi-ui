import React, {useContext, useState} from 'react';
import "swagger-ui-react/swagger-ui.css";
import {Button, Input, List, Modal} from "antd";
import {Link} from "react-router-dom";
import {SWAGGER_UI_PATH} from "../../routes/Slugs";
import {DownloadOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";
import privateAPI from "../../rest_handlers/privateAPI";
import {ServiceContext} from "../../contexts/ServiceContextProvider";

const Dashboard = () => {

    const {services, updateServices} = useContext(ServiceContext);

    const [loading, setLoading] = useState(false);
    const [rowIndex, setRowIndex] = useState(-1);
    const [fieldData, setFieldData] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (server, index) => {
        setRowIndex(index);
        setFieldData(server.url);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setRowIndex(-1);
        setFieldData("");
        setIsModalVisible(false);
    };
    const handleSubmit = () => {
        updateServices(rowIndex, fieldData);
        setRowIndex(-1);
        setFieldData("");
        setIsModalVisible(false);
    };

    const download = async (url, name) => {

        try {

            setLoading(true);

            const res = await privateAPI.get(url);

            const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
                JSON.stringify(res.data)
            )}`;
            const link = document.createElement("a");
            link.href = jsonString;
            link.download = `${name}.json`;

            link.click();

            setLoading(false);

        } catch (err) {
            console.error(err);
            setLoading(false);
        }

    }


    return (
        <>
            <List
                itemLayout="horizontal"
                dataSource={services}
                renderItem={(item, index) => (
                    <List.Item
                        actions={
                            [
                                <Link key={1} to={`${SWAGGER_UI_PATH}/${item.id}`}>
                                    <Button
                                        size="small"
                                        type="info"
                                        loading={loading}
                                    >
                                        <EyeOutlined/>
                                    </Button>
                                </Link>,
                                <Button
                                    key={2}
                                    size="small"
                                    type="danger"
                                    onClick={() => showModal(item, index)}
                                >
                                    <EditOutlined/>
                                </Button>,
                                <Button
                                    key={2}
                                    size="small"
                                    type="primary"
                                    loading={loading}
                                    onClick={() => download(item.url, item.name)}
                                >
                                    <DownloadOutlined/>
                                </Button>
                            ]
                        }
                    >
                        {item.name}
                    </List.Item>
                )}
            />
            <Modal
                title="Edit Service Url"
                visible={isModalVisible}
                footer={[
                    <Button
                        key={0}
                        type="primary"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                ]
                }
                onCancel={handleCancel}

            >
                {
                    rowIndex >= 0 ?
                        <>
                            <Input
                                value={fieldData}
                                onChange={e => setFieldData(e.target.value)}
                            />
                        </>
                        : <p>No server selected.</p>
                }
            </Modal>
        </>
    )
}

export default Dashboard;
