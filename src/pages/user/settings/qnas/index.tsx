import user from "@/queryKeys/user";
import { useQuery } from "@tanstack/react-query";
import { Flex, Typography } from "antd";
import { FC } from "react";
import { useSearchParams } from "react-router-dom";

const Page: FC = () => {
  const [searchParams] = useSearchParams({ size: "15", page: "1" });

  const { data: qnas = { content: [], page: 0, totalCount: 0 } } = useQuery({
    ...user.qna.all(searchParams.toString()),
  });

  if (!qnas) return null;

  return (
    <main className="h-full">
      <Flex className="h-full flex-col">
        <Flex className="gap-4 flex-col p-4 flex-grow">
          {qnas.content.length > 0 ? (
            qnas.content.map(({ subject, qnAId, createAt }) => (
              <Flex key={qnAId} className="flex-col gap-4 p-4 border border-gray-200 rounded">
                <Flex className="justify-between items-center">
                  <Typography className="font-bold text-lg">{subject}</Typography>
                  <Typography className="text-pink-500 text-2xl font-bold">{subject}</Typography>
                </Flex>
                <Typography className="text-end font-medium">
                  {new Intl.DateTimeFormat("ko-KR").format(new Date(createAt))}
                </Typography>
              </Flex>
            ))
          ) : (
            <Flex className="flex-col gap-4 flex-grow justify-center items-center">
              <Typography className="text-5xl">😥</Typography>
              <Typography className="text-2xl">QnA가 없습니다</Typography>
            </Flex>
          )}
        </Flex>
      </Flex>
    </main>
  );
};

export default Page;