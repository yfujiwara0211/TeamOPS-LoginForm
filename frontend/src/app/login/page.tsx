'use client'

import * as React from 'react';
import axios from 'axios';
import { LoginUserContext } from '@/components/LoginUserProvider';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import theme from '@/theme/theme'

interface UserInfo {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const { setLoginUser, setIsLogined } = React.useContext(LoginUserContext);
  const [user, setUser] = React.useState<UserInfo>({
    username: '',
    password: '',
  });
  const [loginError, setLoginError] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const login = async (userInfo: UserInfo) => {
    console.log('ログイン処理開始');
    console.log('送信するデータ:', userInfo);

    try {
      const endpoint = 'http://127.0.0.1:8000/login';
      const response = await axios.post(endpoint, userInfo, {
        headers: { 'Content-Type': 'application/json' },
      });

      // ステータスコードが200の場合はログイン成功とみなす
      if (response.status === 200) {
        const { access_token } = response.data;
        console.log('ログイン成功', access_token);
        // トークンをローカルストレージに保存
        localStorage.setItem('token', access_token);
        setLoginUser(userInfo.username);
        setIsLogined(true);
        // ユーザーをホーム画面にリダイレクト
        router.push('/login/home'); // 遷移先のパスを指定
      } else {
        // ここに到達することは少ないが、念のための処理
        throw new Error('ログインに失敗しました。');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // 401エラーを含む、すべてのHTTPエラーレスポンスをハンドリング
        console.error('ログインエラー:', error.response?.status, error.response?.data);
        setLoginError(`ログインエラー: ${error.response?.data.message || '認証に失敗しました。'}`);
      } else if (error instanceof Error) {
        // リクエストは送られたが、レスポンスが受け取れなかったケース
        console.error('レスポンスが受け取れませんでした。', error.message);
        setLoginError('サーバーからの応答がありません。ネットワーク接続を確認してください。');
      } else {
        // リクエスト送信前に何かしらのエラーが発生したケース
        console.error('リクエストエラー', error);
        setLoginError('リクエストの送信中にエラーが発生しました。');
      }
    }
  };

  const onClickLogin = () => {
    login(user);
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
            <Typography variant="h5">ログインフォーム</Typography>
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
            {loginError && <Typography color="error">{loginError}</Typography>}
            <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={onClickLogin}>
              ホームへ
            </Button>
            <Link href="/register">新規登録はこちら</Link>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Login;