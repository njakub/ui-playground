import React from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuPopover,
  MenuLink,
} from "@reach/menu-button";
import "@reach/menu-button/styles.css";

export default function AppShell(props) {
  return (
    <>
      <div>
        <Menu>
          {({ isExpanded }) => (
            <React.Fragment>
              <MenuButton>
                {isExpanded ? "Close" : "Open"}{" "}
                <span aria-hidden="true">▾</span>
              </MenuButton>
              <MenuList>
                <MenuLink as={Link} to="/">
                  Home
                </MenuLink>
                <MenuLink as={Link} to="/fullcalendar">
                  Full Calendar Demo
                </MenuLink>
                <MenuLink as={Link} to="/googleplacesapi">
                  Google Places API
                </MenuLink>
                <MenuLink as={Link} to="/openmaptripapi">
                  Open Map Trip API
                </MenuLink>
              </MenuList>
            </React.Fragment>
          )}
        </Menu>
      </div>
      <div>{props.children}</div>
    </>
  );
}
