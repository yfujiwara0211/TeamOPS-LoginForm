'use client'

import * as React from 'react';
import axios from 'axios';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme/theme'
import Link from 'next/link';

interface UserInfo {
  username: string;
  password: string;
}

const Register: React.FC = () => {
  const [user, setUser] = React.useState<UserInfo>({
    username: '',
    password: '',
  });
  const [registrationError, setRegistrationError] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const register = async (userInfo: UserInfo) => {
    console.log('登録処理開始');
    console.log('送信するデータ:', userInfo);

    try {
      const endpoint = 'http://127.0.0.1:8000/users/';
      const response = await axios.post(endpoint, userInfo, {
        headers: { 'Content-Type': 'application/json' },
      });

      // ステータスコードが200の場合は登録成功とみなす
      if (response.status === 200) {
        console.log('登録成功');
        // 登録成功の場合はログインページにリダイレクト
        window.location.href = '/login';
      } else {
        // ここに到達することは少ないが、念のための処理
        throw new Error('登録に失敗しました。');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // 401エラーを含む、すべてのHTTPエラーレスポンスをハンドリング
        console.error('登録エラー:', error.response?.status, error.response?.data);
        setRegistrationError(`登録エラー: ${error.response?.data.message || '登録に失敗しました。'}`);
      } else if (error instanceof Error) {
        // リクエストは送られたが、レスポンスが受け取れなかったケース
        console.error('レスポンスが受け取れませんでした。', error.message);
        setRegistrationError('サーバーからの応答がありません。ネットワーク接続を確認してください。');
      } else {
        // リクエスト送信前に何かしらのエラーが発生したケース
        console.error('未知のエラー', error);
        setRegistrationError('予期せぬエラーが発生しました。');
      }
    }
  };

  const onClickLogin = () => {
    register(user);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5">新規登録フォーム</Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="username"
              label="Username"
              id="username"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            {registrationError && <Typography color="error">{registrationError}</Typography>}
            <Button
              fullWidth
              color="secondary"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onClickLogin}
            >
              登録
            </Button>
            <Link href="/login">ログインはこちら</Link>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Register;