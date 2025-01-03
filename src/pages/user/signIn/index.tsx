import useAuth from "@/hooks/useAuth";
import axiosInstance from "@/utils/axiosInstance";
import {
  INVALID_FORMAT_EMAIL,
  INVALID_FORMAT_PASSWORD,
  REQUIRED_EMAIL,
  REQUIRED_PASSWORD,
} from "@/utils/constants";
import { IAuth, IResponse, ISignInParams, TError } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { Button, Flex, Form, FormProps, Input, Layout, Typography } from "antd";
import { AxiosResponse } from "axios";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Page: FC = () => {
  const [form] = Form.useForm<ISignInParams>();
  const navigate = useNavigate();
  const { login } = useAuth();

  const signInMutation = useMutation<AxiosResponse<IResponse<IAuth>>, TError, ISignInParams>({
    mutationFn: (signInParams) => axiosInstance.post("/auth/login", signInParams),
    onSuccess: ({ data }) => login(data.result),
    onError: ({ responseMessage }) => alert(responseMessage),
  });

  const onFinish: FormProps<ISignInParams>["onFinish"] = (signInParams) => {
    signInMutation.mutate(signInParams);
  };

  useEffect(() => {
    form.setFieldValue("email", "center@center.com");
    form.setFieldValue("password", "Ccenter123456!");
  }, []);

  return (
    <main>
      <Typography.Title>로그인</Typography.Title>
      <Form<ISignInParams> form={form} autoComplete="off" onFinish={onFinish}>
        <Form.Item<ISignInParams>
          name="email"
          rules={[
            { required: true, message: REQUIRED_EMAIL },
            {
              type: "email",
              message: INVALID_FORMAT_EMAIL,
            },
          ]}
        >
          <Input placeholder="email" />
        </Form.Item>

        <Form.Item<ISignInParams>
          name="password"
          rules={[
            { required: true, message: REQUIRED_PASSWORD },
            {
              pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/,
              message: INVALID_FORMAT_PASSWORD,
            },
          ]}
        >
          <Input.Password placeholder="password" />
        </Form.Item>
        <Form.Item>
          <Flex gap="middle">
            <Button
              disabled={signInMutation.isPending}
              className="flex-grow"
              type="primary"
              htmlType="submit"
            >
              로그인
            </Button>
            <Button className="flex-grow" htmlType="button" onClick={() => navigate("/signup")}>
              회원가입
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </main>
  );
};

export default Page;
