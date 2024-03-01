import {useAppDispatch, useAppSelector} from '../../App/hooks.ts';
import {selectPosts} from '../Posts/postsSlice.ts';
import React, {useEffect, useState} from 'react';
import {getPosts} from '../Posts/postsThunk.ts';
import {useParams} from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  styled,
  TextField,
  Typography
} from '@mui/material';
import textImage from '../../../public/text.png';
import {format} from 'date-fns';
import {selectComments, selectIsLoading} from './commentsSlice.ts';
import {selectUser} from '../Users/usersSlice.ts';
import {CommentsPost} from '../../types';
import {getComments, sendComment} from './commentsThunk.ts';

const Comments = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const params = useParams();
  const comments = useAppSelector(selectComments);
  const isLoading = useAppSelector(selectIsLoading);
  const user = useAppSelector(selectUser);

  const [state, setState] = useState<CommentsPost>({
    post: '',
    textComment: '',
    token: '',
  });

  useEffect(() => {
    const fetchUrl = async () => {
      await dispatch(getPosts());
      if (params.id) {
        await dispatch(getComments(params.id));
      }
    };

    void fetchUrl();
  }, [dispatch]);

  const ImageCardMedia = styled(CardMedia)({
    paddingTop: '30%',
    width: '30%',
    height: 0,
    border: '1px solid #000'
  });

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (params.id && user) {
      await dispatch(sendComment({token: user.token, post: params.id, textComment: state.textComment}));
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setState((prevState) => ({
      ...prevState,
        [name]: value,
    }));
  };

  const post = posts.find(postElem => postElem._id === params.id);
  return (
    <>
      {post && (
        <Grid item xs={12}>
          <Card sx={{ width: 800, ml: 'auto', mr: 'auto' }}>
            <CardContent sx={{display: 'flex', gap: 3}}>
              {post.image !== null ? <ImageCardMedia image={'http://localhost:8000' + '/' + post.image}/> : <ImageCardMedia image={textImage} />}
              <Typography component="div" sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography gutterBottom variant="h6" component="div">
                  {format(post.datetime, 'yyyy-MM-dd HH:mm:ss')}
                </Typography>
                <Typography variant="h5" component="div">
                  {post.user.username}
                </Typography>
                <Typography component="div">
                  {post.title}
                </Typography>
                <Typography component="div">
                  {post.description}
                </Typography>
              </Typography>
            </CardContent>
          </Card>
        </Grid>)
      }

      <Grid container sx={{mt: '20px'}}>
        {!isLoading ? comments.map((elem) => (
          <Grid item xs={12} sx={{border: "1px solid #000", m: '10px'}} key={elem._id}>
            <Typography variant="h5">
              {elem.user.username}
            </Typography>
            <Typography component="div">
              {elem.textComment}
            </Typography>
          </Grid>
        )) : <CircularProgress />}
      </Grid>

      <Grid sx={{display: 'flex', gap: 2, position: 'sticky', mt: '200px'}}>
        {user && (
          <Box component="form" onSubmit={formSubmit}>
            <TextField
              label="textComment"
              name="textComment"
              value={state.textComment}
              onChange={inputChangeHandler}
            />
            <Button type="submit">Send</Button>
          </Box>
        )}
      </Grid>
    </>
  );
};

export default Comments;