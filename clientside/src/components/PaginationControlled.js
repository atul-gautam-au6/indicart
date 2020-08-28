import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import { listProductsSearch } from '../action/productsave';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationControlled() {
  const classes = useStyles()
  const [page, setPage] = React.useState(1);
  const dispatch = useDispatch()
  const handleChange = (event, page) => {
    dispatch(listProductsSearch('','','',page))
    setPage(page);
  };

  return (
    <div className={classes.root}>
      <Typography>Page: {page}</Typography>
      <Pagination count={10} page={page} onChange={handleChange} />
    </div>
  );
}
