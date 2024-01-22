import { Link, Outlet, useNavigate, useNavigation } from "react-router-dom";
import useToken from "../hooks/useToken";
import React, { useEffect } from "react";
import {
    BarChartOutlined,
    DashboardOutlined,
    FileTextOutlined,
    FormOutlined,
    GroupOutlined,
    InfoCircleOutlined,
    LogoutOutlined,
    PhoneOutlined,
    PieChartOutlined,
    QuestionOutlined,
    SolutionOutlined,
    TeamOutlined,
    UserOutlined,
    FolderOpenOutlined,
    UsergroupAddOutlined,
    BankOutlined,
    SafetyCertificateOutlined,
    MessageOutlined,
    SendOutlined,
    InboxOutlined,
    AuditOutlined,
    CarOutlined,
    BookOutlined,
    IdcardOutlined,
    SearchOutlined,
    BellFilled
} from "@ant-design/icons";
import { Layout, Menu, Dropdown, Space, Badge, Spin, Divider, Input } from "antd";
import AuthenticationService from "../services/authentication.service";
import "./styles.css";
import logo from "../assets/images/uz-logoo.png";
import facePlaceholder from "../assets/images/user-placeholder.svg";
import { Header } from "antd/es/layout/layout";
import { InstitutionName } from "../common";
import SystemFooter from "../common/SystemFooter";
import LandingPage from "../pages/LandingPage/Home/LandingPage";
import Search from "antd/es/input/Search";

const { Sider, Content, Footer } = Layout;

const items = [
    {
        key: 1,
        label: (
            <Link to="/" className="text-decoration-none">
                <QuestionOutlined />
                &nbsp; Help
            </Link>
        ),
    },
    {
        key: 2,
        label: (
            <Link to="/" className="text-decoration-none">
                <SolutionOutlined />
                &nbsp; Settings
            </Link>
        ),
    },
    {
        key: 3,
        label: (
            <Link to="/" className="text-decoration-none">
                <UserOutlined />
                &nbsp; Profile
            </Link>
        ),
    },
    {
        key: 4,
        danger: true,
        label: (
            <Link to="/" className="text-decoration-none">
                <LogoutOutlined />
                &nbsp; Sign out
            </Link>
        ),
        onClick: () => AuthenticationService.logout(),
    },
];

const Root = () => {
    const { token, setToken } = useToken();
    const ROLE = AuthenticationService.getUserRole();

    const navigate = useNavigate();
    const navigation = useNavigation();

    const username = AuthenticationService.getUsername();
    const fullName = AuthenticationService.getFullName();

    const handleVerifyToken = async () => {
        const refreshToken = AuthenticationService.getRefreshToken();
        try {
            const refreshTokenResponse = await AuthenticationService.verifyToken({
                token: refreshToken,
            });
            if (refreshTokenResponse?.status === 200) {
                try {
                    const response = await AuthenticationService.verifyToken({
                        token: token,
                    });
                    if (response?.status === 200) {
                        return 1;
                    }
                } catch (e) {
                    if (e?.response?.status === 401) {
                        try {
                            const newTokenResponse = await AuthenticationService.refreshToken(
                                { refresh: refreshToken }
                            );
                            if (newTokenResponse?.status === 200) {
                                setToken(newTokenResponse?.data);
                                window.location.reload();
                            }
                        } catch (e) {
                            window.location.reload();
                        }
                    }
                }
            } else {
                AuthenticationService.logout();
            }
        } catch (e) {
            AuthenticationService.logout();
        }
    };

    useEffect(() => {
        if (token) {
            handleVerifyToken();
        }
    }, [token]);
    if (!token) {
        return <LandingPage setToken={setToken} />;
    }

    const adminMenuItems = [
        {
            key: "1",
            icon: <DashboardOutlined style={{ marginLeft: 4 }} />,
            label: "Dashboard",
            onClick: () => navigate("/"),
        },
        {
            key: "2",
            icon: <SolutionOutlined style={{ marginLeft: 4 }} />,
            label: "Job Listings",
            children: [
                {
                    key: "3",
                    label: "Jobs",
                    onClick: () => navigate("admin/jobs"),
                },
            ],
        },
        {
            key: "5",
            icon: <BookOutlined style={{ marginLeft: 4 }} />,
            label: "Job Applications",
            children: [
                {
                    key: "6",
                    label: "Applications",
                    onClick: () => navigate("admin/applications"),
                },
            ],
        },
        {
            key: "applicants",
            icon: <TeamOutlined style={{ marginLeft: 4 }} />,
            label: "Applicants",
            children: [
                {
                    key: "7",
                    label: "Applicants",
                    onClick: () => navigate("admin/Applicants"),
                },
            ],
        },
        {
            key: "8",
            icon: <AuditOutlined style={{ marginLeft: 4 }} />,
            label: "Job Applications",
            children: [
                {
                    key: "10",
                    label: "Applications",
                    onClick: () => navigate("admin/applications"),
                },
            ],
        },
        {
            key: "11",
            icon: <PhoneOutlined style={{ marginLeft: 4 }} />,
            label: "Job Interviews",
            children: [
                {
                    key: "22",
                    label: "Interviews",
                    onClick: () => navigate("admin/interviews"),
                },
            ],
        },
        {
            key: "12",
            icon: <SafetyCertificateOutlined style={{ marginLeft: 4 }} />,
            label: "Settings",
            children: [
                {
                    key: "13",
                    label: "settings",
                    onClick: () => navigate("admin/setings"),
                },
            ],
        },
    ];

    const ApplicantMenuItems = [
        {
            key: "1",
            icon: <DashboardOutlined style={{ marginLeft: 4 }} />,
            label: "Dashboard",
            onClick: () => navigate("/applicant/dashboard"),
        },
        {
            key: "88",
            icon: <BookOutlined style={{ marginLeft: 4 }} />,
            label: "Job Listings",
            children: [
                {
                    key: "experience",
                    label: "Experience",
    
                    onClick: () => navigate("applicant/experiance"),
                },
                {
                    key: "skills",
                    label: "Skills & qualifications",
    
                    onClick: () => navigate("applicant/skills-qualifications"),
                },
                {
                    key: "degree",
                    label: "Degree",
    
                    onClick: () => navigate("applicant/degrees"),
                },
                {
                    key: "jobTypes",
                    label: "Job types",
    
                    onClick: () => navigate("applicant/job-types"),
                },
                {
                    key: "sortBy",
                    label: "Sort By",
    
                    onClick: () => navigate("applicant/sort-by"),
                },
            ],
        },
        {
            key: "2",
            icon: <FileTextOutlined style={{ marginLeft: 4 }} />,
            label: "Saved Jobs",
            onClick: () => navigate("/applicant/saved-jobs"),
        },
        {
            key: "3",
            icon: <BarChartOutlined style={{ marginLeft: 4 }} />,
            label: "Track Application",
            onClick: () => navigate("/applicant/track-application"),
        },
        {
            key: "4",
            icon: <InboxOutlined style={{ marginLeft: 4 }} />,
            label: "Notifications",
            onClick: () => navigate("applicant/notifications"),
        },
        {
            key: "4",
            icon: <InboxOutlined style={{ marginLeft: 4 }} />,
            label: "Profile",
            onClick: () => navigate("applicant/notifications"),
        },
        {
            key: "4",
            icon: <InboxOutlined style={{ marginLeft: 4 }} />,
            label: "Settings",
            onClick: () => navigate("applicant/notifications"),
        },
        {
            key: "5",
            icon: <UserOutlined style={{ marginLeft: 4 }} />,
            label: "Profile",
            onClick: () => navigate("/student/account"),
        },
        // {
        //     key: "6",
        //     icon: <LogoutOutlined style={{ marginLeft: 4 }} />,
        //     label: "Logout",
        //     style: {
        //         borderRadius: 0,
        //         margin: "0 0 5px",
        //         width: "100%",
        //         backgroundColor: "red",
        //     },
        //     onClick: () => AuthenticationService.logout(),
        // },
    ];

    const superUserMenuItems = [
        {
            key: "1",
            icon: <DashboardOutlined style={{ marginLeft: 4 }} />,
            label: "Dashboard",
            onClick: () => navigate("/"),
        },
        {
            key: "3",
            icon: <BankOutlined style={{ marginLeft: 4 }} />,
            label: "Institutions",
            onClick: () => navigate("superadmin/institutions"),
        },
        {
            key: "4",
            icon: <SafetyCertificateOutlined style={{ marginLeft: 4 }} />,
            label: "Institution administrators",
            onClick: () => navigate("superadmin/institution-administrators"),
        },
        {
            key: "5",
            icon: <UsergroupAddOutlined style={{ marginLeft: 4 }} />,
            label: "Product Demo Requests",
            onClick: () => navigate("superadmin/demo-requests"),
        },
        // {
        //     key: "6",
        //     icon: <LogoutOutlined style={{ marginLeft: 4 }} />,
        //     label: "Logout",
        //     style: {
        //         borderRadius: 0,
        //         margin: "0 0 5px",
        //         width: "100%",
        //         backgroundColor: "red",
        //     },
        //     onClick: () => AuthenticationService.logout(),
        // },
    ];

    return (
        <div className={"container-fluid p-0"}>
            {ROLE === "ADMIN" && (
                <Layout style={{ margin: "64px 0 0" }}>
                    <Header className={"ant-nav-bar"}>
                        <div className="navbar-brand ms-3 text-white d-flex justify-content-between align-items-center">
                            <img src={logo} alt="UZ Logo" height="80" width="80" />
                            <InstitutionName textColor="text-white" />
                        </div>
                        <div className={"w-100"}></div>
                        <div className="d-flex flex-row align-items-center justify-content-evenly text-white">
                            <Search className="input-search" placeholder="input search text" enterButton="Search" size="large" allowClear style={{width: 300,}} />
                            <Badge className="notification-bell mx-3" showZero count={0}>
                                <BellFilled className="fs-4 text-white" />
                            </Badge>
                            <Badge className="message-info mx-3" showZero count={0}>
                                <MessageOutlined className="fs-4 text-white" />
                            </Badge>

                            <Dropdown className="btn btn-sm rounded-5 border border-2" menu={{ items }}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <span className="small text-white text-wrap">
                                            <span className={"d-none d-sm-inline text-nowrap"}>
                                                {fullName}{" "}
                                            </span>{" "}
                                            {username}
                                        </span>
                                        <img
                                            src={facePlaceholder}
                                            className={"user-nav-img"}
                                            alt="User"
                                        />
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>
                    </Header>
                    <Layout hasSider>
                        <Sider
                            width={240}
                            collapsedWidth="50px"
                            breakpoint="lg"
                            style={{
                                backgroundColor: "#592f69",
                                overflow: "auto",
                                height: "100vh",
                                position: "fixed",
                                left: 0,
                                top: 0,
                                bottom: 0,
                            }}
                        >
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={["1"]}
                                items={adminMenuItems}
                                style={{
                                    border: 0,
                                    color: "white",
                                    backgroundColor: "#592f69",
                                    paddingTop: 64,
                                }}
                            />
                        </Sider>

                        <Layout className="site-layout">
                            <Content
                                style={{
                                    padding: 10,
                                    margin: 0,
                                    minHeight: "100vh",
                                }}
                            >
                                {navigation.state === "loading" ? <Spin /> : <Outlet />}
                            </Content>

                            <SystemFooter />
                        </Layout>
                    </Layout>
                </Layout>
            )}

            {ROLE === "APPLICANT" && (
                <Layout style={{ margin: "64px 0 0" }}>
                <Header className={"ant-nav-bar"}>
                    <div className="navbar-brand ms-3 text-white d-flex justify-content-between align-items-center">
                        <img src={logo} alt="UZ Logo" height="80" width="80" />
                        <InstitutionName textColor="text-white" />
                    </div>
                    <div className={"w-100"}></div>
                    <div className="d-flex flex-row align-items-center justify-content-evenly text-white">
                        <Search className="input-search" placeholder="input search text" enterButton="Search" size="large" allowClear style={{width: 300,}} />
                        <Badge className="notification-bell mx-3" showZero count={0}>
                            <BellFilled className="fs-4 text-white" />
                        </Badge>
                        <Badge className="message-info mx-3" showZero count={0}>
                            <MessageOutlined className="fs-4 text-white" />
                        </Badge>

                        <Dropdown className="btn btn-sm rounded-5 border border-2" menu={{ items }}>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <span className="small text-white text-wrap">
                                        <span className={"d-none d-sm-inline text-nowrap"}>
                                            {fullName}{" "}
                                        </span>{" "}
                                        {username}
                                    </span>
                                    <img
                                        src={facePlaceholder}
                                        className={"user-nav-img"}
                                        alt="User"
                                    />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                </Header>
                <Layout hasSider>
                    <Sider
                        width={240}
                        collapsedWidth="50px"
                        breakpoint="lg"
                        style={{
                            backgroundColor: "#592f69",
                            overflow: "auto",
                            height: "100vh",
                            position: "fixed",
                            left: 0,
                            top: 0,
                            bottom: 0,
                        }}
                    >
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={["1"]}
                            items={ApplicantMenuItems}
                            style={{
                                border: 0,
                                color: "white",
                                backgroundColor: "#592f69",
                                paddingTop: 64,
                            }}
                        />
                    </Sider>

                    <Layout className="site-layout">
                        <Content
                            style={{
                                padding: 10,
                                margin: 0,
                                minHeight: "100vh",
                            }}
                        >
                            {navigation.state === "loading" ? <Spin /> : <Outlet />}
                        </Content>

                        <SystemFooter />
                    </Layout>
                </Layout>
            </Layout>
            )}
            {ROLE === "SUPERUSER" && (
                <Layout style={{ margin: "64px 0 0" }}>
                <Header className={"ant-nav-bar"}>
                    <div className="navbar-brand ms-3 text-white d-flex justify-content-between align-items-center">
                        <img src={logo} alt="UZ Logo" height="80" width="80" />
                        <InstitutionName textColor="text-white" />
                    </div>
                    <div className={"w-100"}></div>
                    <div className="d-flex flex-row align-items-center justify-content-evenly text-white">
                        <Search className="input-search" placeholder="input search text" enterButton="Search" size="large" allowClear style={{width: 300,}} />
                        <Badge className="notification-bell mx-3" showZero count={0}>
                            <BellFilled className="fs-4 text-white" />
                        </Badge>
                        <Badge className="message-info mx-3" showZero count={0}>
                            <MessageOutlined className="fs-4 text-white" />
                        </Badge>

                        <Dropdown className="btn btn-sm rounded-5 border border-2" menu={{ items }}>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <span className="small text-white text-wrap">
                                        <span className={"d-none d-sm-inline text-nowrap"}>
                                            {fullName}{" "}
                                        </span>{" "}
                                        {username}
                                    </span>
                                    <img
                                        src={facePlaceholder}
                                        className={"user-nav-img"}
                                        alt="User"
                                    />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                </Header>
                <Layout hasSider>
                    <Sider
                        width={240}
                        collapsedWidth="50px"
                        breakpoint="lg"
                        style={{
                            backgroundColor: "#592f69",
                            overflow: "auto",
                            height: "100vh",
                            position: "fixed",
                            left: 0,
                            top: 0,
                            bottom: 0,
                        }}
                    >
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={["1"]}
                            items={superUserMenuItems}
                            style={{
                                border: 0,
                                color: "white",
                                backgroundColor: "#592f69",
                                paddingTop: 64,
                            }}
                        />
                    </Sider>

                    <Layout className="site-layout">
                        <Content
                            style={{
                                padding: 10,
                                margin: 0,
                                minHeight: "100vh",
                            }}
                        >
                            {navigation.state === "loading" ? <Spin /> : <Outlet />}
                        </Content>

                        <SystemFooter />
                    </Layout>
                </Layout>
            </Layout>
            )}
        </div>
    );
};

export default Root;
