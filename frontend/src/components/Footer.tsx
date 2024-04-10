import * as React from 'react';
import Typography from '@mui/material/Typography';

interface CopyrightProps {
  [key: string]: any;
}

const Copyright: React.FC<CopyrightProps> = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      Team OPS {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const Footer: React.FC = () => {
  return (
    <>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </>
  );
};

export default Footer;