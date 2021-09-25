import React, { useState } from 'react';
import { FormControl, Grid, InputLabel, Input, FormHelperText, Button, Box } from '@material-ui/core';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import axios from 'axios';
import parse from 'html-react-parser';

async function postArticle(data) {
  // 예제
  const config = {
    headers: { Authorization : 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmMxMjMxMjMiLCJpYXQiOjE2MzI1NzkxMDMsImV4cCI6MTYzNTE3MTEwM30.FZmVZfC3H_IFtbTGALV6559Igt0EVLNvxLnwzuK9u48'}
  }

  const response = await axios.post(
    'http://localhost:8090/article/create',
    data,
    config
  );

  return response.data;
}

const ArticleRegistration = () => {
  // useState로 상태관리하기 초기값은 EditorState.createEmpty()
  // EditorState의 비어있는 ContentState 기본 구성으로 새 개체를 반환 => 이렇게 안하면 상태 값을 나중에 변경할 수 없음.
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [state, setState] = useState({title : ""});
  const [previewState, setPreviewState] = useState({previewHtml : ""});

  const onEditorStateChange = (editorState) => {
    // editorState에 값 설정
    setEditorState(editorState);
    previewState.previewHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };

  const onChangeTitle = (e) => {
    setState({...state, title : e.target.value});
  }

  const onSubmit = async () => {
    // console.log(convertToRaw(editorState.getCurrentContent()));
    // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    // console.log(editorState.getCurrentContent().getPlainText());
    const text = editorState.getCurrentContent().getPlainText();
    const pattern = /\B(\#[0-9a-zA-Z_]+\b)(?!;)/g;
    const hashtags = text.match(pattern);
    const data = {title: state.title, contents : previewState.previewHtml, tags: hashtags};
    let result = await postArticle(data);
    console.log(result);
    // console.log(state);
    // console.log(hashtags);
  }

  return (
    <Grid container>
      <Grid item xs={12}>
          <FormControl fullWidth sx={ {mt : 1} }>
            <InputLabel htmlFor="article-title">title</InputLabel>
            <Input autoFocus id="article-title" aria-describedby="article-title-text" value={state.title} onChange={onChangeTitle} />
            {/* <FormHelperText id="user-id-text">We'll never share your id.</FormHelperText> */}
          </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Box sx={ {mt: 3} }>
            <Editor
            // 에디터와 툴바 모두에 적용되는 클래스
            wrapperClassName="wrapper-class"
            // 에디터 주변에 적용된 클래스
            editorClassName="editor"
            // 툴바 주위에 적용된 클래스
            toolbarClassName="toolbar-class"
            // 툴바 설정
            toolbar={{
              // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: false },
            }} 
            placeholder="내용을 작성해주세요."
            // 한국어 설정
            localization={{
              locale: 'ko',
            }}
            // 멘션 설정
            mention={{
              separator: ' ',
              trigger: '@',
              suggestions: [
                { text: 'APPLE', value: 'apple', url: 'apple' },
                { text: 'BANANA', value: 'banana', url: 'banana' },
                { text: 'CHERRY', value: 'cherry', url: 'cherry' },
                { text: 'DURIAN', value: 'durian', url: 'durian' },
                { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
                { text: 'FIG', value: 'fig', url: 'fig' },
                { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
                { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
              ],
            }}
            // 해시태그 설정
            hashtag={{
              separator: ' ',
              trigger: '#',
            }}
            // 초기값 설정
            editorState={editorState}
            // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
            onEditorStateChange={onEditorStateChange}
          />
        </Box>
        {/* 프리뷰 공간  */}
        {/* <Box sx={ {mt: 3} }>
          <div>
              {parse(previewState.previewHtml)}
          </div>
        </Box> */}
        <Box sx={ {mt: 3} }>
          <Button onClick={onSubmit} >제출</Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ArticleRegistration;