import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ArticleBoard from './ArticleBoard';
import ArticleRegistration from './ArticleRegistration';
import CategoryBoard from './CategoryBoard';
import CategoryRegistration from './CategoryRegistration';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tab_title: {
    color: '#ffffff'
  }
}));

const ArticlePage = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value}
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="secondary"
            onChange={handleChange} 
            aria-label="simple tabs">
          <Tab className={classes.tab_title} label="기사 관리" {...a11yProps(0)} />
          <Tab className={classes.tab_title} label="기사 등록" {...a11yProps(1)} />
          <Tab className={classes.tab_title} label="카테고리 관리" {...a11yProps(2)} />
          <Tab className={classes.tab_title} label="카테고리 등록" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
          <ArticleBoard />
      </TabPanel>
      <TabPanel value={value} index={1}>
          <ArticleRegistration />
      </TabPanel>
      <TabPanel value={value} index={2}>
          <CategoryBoard />
      </TabPanel>
      <TabPanel value={value} index={3}>
          <CategoryRegistration />
      </TabPanel>
    </div>
  );
}

export default ArticlePage;