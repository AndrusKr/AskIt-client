import React from "react";
import { AppBar, Tab, Tabs } from "@material-ui/core";
import { USER_FILTER } from "../../../constants/profileSettings";
import SwipeableViews from "react-swipeable-views";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { setUsersTabIndex } from "../../../redux/actions/user";
import { getUsersListTabsIndex } from "../../../redux/selectors/user";

const UserBarTabs = () => {
  const dispatch = useDispatch();
  const usersListTabsIndex = useSelector(getUsersListTabsIndex);
  const handleChange = (event, value) => dispatch(setUsersTabIndex(value));

  return (
    <>
      <AppBar position="static" color="default">
        <Tabs
          value={usersListTabsIndex}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          {Object.keys(USER_FILTER).map((title) => {
            return <Tab label={USER_FILTER[title]} key={title} />;
          })}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={"x"}
        index={usersListTabsIndex}
        onChangeIndex={handleChange}
        className={"user-bar"}
      >
        {Object.keys(USER_FILTER).map((title) => {
          return (
            <Typography variant="h6" className={"user-bar-title"} key={title}>
              {USER_FILTER[title]}
            </Typography>
          );
        })}
      </SwipeableViews>
    </>
  );
};

export default UserBarTabs;
