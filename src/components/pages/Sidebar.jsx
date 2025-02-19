import React, { useEffect, useState } from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import { BarChartLineFill, CashStack, FileTextFill, HouseFill, Journals, List, PeopleFill, Receipt, Speedometer2 } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import'../css/Sidebar.css'

const Sidebar = ({ isCollapsed }) => {
    const [menuList, setMenuList] = useState([]);
    const [menuItemList, setMenuItemList] = useState([]);

    useEffect(() => {
        const storedMenuList = JSON.parse(localStorage.getItem("menuList")) || [];
        const storedMenuItemList = JSON.parse(localStorage.getItem("menuItemList")) || [];

        setMenuList(storedMenuList.sort((a, b) => a.menuId - b.menuId));
        setMenuItemList(storedMenuItemList.sort((a, b) => a.subMenuId - b.subMenuId));
    }, []);

    const menuIcons = {
        100: <Speedometer2 size={24} />,
        200: <PeopleFill size={24} />,
        300: <Receipt size={24} />,
        400: <CashStack size={24} />,
        500: <BarChartLineFill size={24} />
    }

    return (
        <div
            style={{
                width: isCollapsed ? "80px" : "250px",
                backgroundColor: "#5a7fcf",
                height: 'calc(100vh - 56px)',
                position: "fixed",
                top: "56px",
                left: "0",
                padding: "10px",
                transition: "width 0.3s ease-in-out",
                color: "white",
                boxShadow: "3px 0 5px rgba(0,0,0,0.2)",
                zIndex: 500,
                overflowY: "auto"
            }}
            className="sidebar"
        >
            

            {/* Sidebar Content */}
            {!isCollapsed ? (
                <Accordion>
                    {menuList.length > 0 &&
                        menuList.map((menu, index) => (
                            <Card key={menu.menuId} style={{ border: "none", background: "transparent" }} className="mb-1">
                                <Accordion.Item eventKey={index}>
                                    <Accordion.Header style={{ fontWeight: "bold", fontSize: "16px" }}>
                                        {menu.menuName}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {menuItemList
                                            .filter((item) => item.menuId === menu.menuId)
                                            .map((subMenu) => (
                                                <Link
                                                    key={subMenu.menuSubId}
                                                    to={"/dashboard"}
                                                    style={{
                                                        textDecoration: "none",
                                                        color: "black",
                                                        display: "block",
                                                        padding: "8px 12px",
                                                        borderRadius: "5px",
                                                        border: "1px solid rgba(255,255,255,0.3)",
                                                        marginBottom: "5px",
                                                        background: "rgba(255,255,255,0.3)",
                                                        transition: "background 0.3s",
                                                    }}
                                                    className="menu-link"
                                                >
                                                    {subMenu.menuSubName}
                                                </Link>
                                            ))}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Card>
                        ))}
                </Accordion>
            ) : (
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                    {menuList.map((menu) => (
                        <div key={menu.id}>
                            <Button
                                style={{
                                    backgroundColor: "#4b6cb7",
                                    border: "none",
                                    width: "auto",
                                    height: "auto",
                                    padding: "10px",
                                    borderRadius: "50%",
                                }}
                                className="mb-3"
                                onClick={() => setIsCollapsed(!isCollapsed)}
                            >
                            {menuIcons[menu.menuId]}
                            </Button>
                            <br/>
                        </div>
                    ))}
                    {/* <Button
                        style={{
                            backgroundColor: "#4b6cb7",
                            border: "none",
                            width: "auto",
                            height: "auto",
                            padding: "10px",
                            borderRadius: "50%",
                        }}
                        className="mb-3"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        <PeopleFill size={25}/>
                    </Button>
                    <br/>
                    <Button
                        style={{
                            backgroundColor: "#4b6cb7",
                            border: "none",
                            width: "auto",
                            height: "auto",
                            padding: "10px",
                            borderRadius: "50%",
                        }}
                        className="mb-3"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        <Receipt size={25}/>
                    </Button>
                    <br/>
                    <Button
                        style={{
                            backgroundColor: "#4b6cb7",
                            border: "none",
                            width: "auto",
                            height: "auto",
                            padding: "10px",
                            borderRadius: "50%",
                        }}
                        className="mb-3"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        <CashStack size={25}/>
                    </Button>
                    <br/>
                    <Button
                        style={{
                            backgroundColor: "#4b6cb7",
                            border: "none",
                            width: "auto",
                            height: "auto",
                            padding: "10px",
                            borderRadius: "50%",
                        }}
                        className="mb-3"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        <BarChartLineFill size={25}/>
                    </Button> 
                    <br/>*/}
                </div>
            )}
        </div>
    );
};

export default Sidebar;
