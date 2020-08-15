import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreIcon from '@material-ui/icons/MoreVert';
import Toolbar from '@material-ui/core/Toolbar';

function ChatBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const portfolioUrl = "https://tonyz0909.github.io/";
  const resumeUrl = "https://tonyz0909.github.io/files/Anthony%20Zhang%20Resume.pdf";

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (url) => {
    if (url) {
      window.open(url,'_blank');
    }
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" >
      <Toolbar>
        <span className="name" style={{ flex: 1 }}>Tony Zhang Resume Chatbot</span>
        <IconButton aria-label="display more actions" edge="end" color="inherit" aria-haspopup="true" onClick={handleClick}>
          <MoreIcon />
        </IconButton>
      </Toolbar>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => handleMenuClick()}
      >
        <MenuItem onClick={() => handleMenuClick(portfolioUrl)}>Visit Portfolio</MenuItem>
        <MenuItem onClick={() => handleMenuClick(resumeUrl)}>Download Resume</MenuItem>
      </Menu>
    </AppBar>
  );
}

export default ChatBar;