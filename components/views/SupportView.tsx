import { GithubOutlined, LikeOutlined } from "@ant-design/icons";
import {
    Button,
    Divider,
    Form,
    Input,
    message,
    Result,
    Space,
    Statistic,
    Tag,
    Typography,
} from "antd";
import React from "react";

export const SupportView: React.FunctionComponent = () => {
    const [submitted, setSubmitted] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <>
            <Space direction="horizontal" size="large">
                <Statistic title="Estimated active users" value={23140213} />
                <Statistic title="Estimated revenue (USD)" value={980234582} />
                <Statistic
                    title="Feedback"
                    prefix={<LikeOutlined />}
                    value={1020175}
                />
                <Statistic
                    title="Global data centers target"
                    suffix={"/ 1025"}
                    value={980}
                />
            </Space>
            <Divider />
            <Typography>
                <Typography.Title>Issues? Spam here</Typography.Title>
                <Space>
                    <Tag icon={<GithubOutlined />} color="gold">
                        <Typography.Link
                            copyable
                            href="https://github.com/Assasindie/SkyblockMerchantAPI"
                            target="_blank"
                        >
                            API Repository
                        </Typography.Link>
                    </Tag>
                    <Tag icon={<GithubOutlined />} color="cyan">
                        <Typography.Link
                            copyable
                            href="https://github.com/aXises/SkyMerchant"
                            target="_blank"
                        >
                            Site Repository
                        </Typography.Link>
                    </Tag>
                </Space>
            </Typography>

            <Divider />
            <Typography>
                <Typography.Title>
                    Dotma Customer Service Charter
                </Typography.Title>
                <Typography.Paragraph>
                    The Dotma Customer Service Charter is our promise to you. It
                    demonstrates our commitment to providing your business with
                    high quality of communication, service and support. We are
                    dedicated to providing you with the very highest levels of
                    service in all that we do. This is our service commitment.
                    It infuses every aspect of our business; from our ethos, to
                    the training of our people and the development of our
                    relationship with you.
                </Typography.Paragraph>
                <Typography.Title level={2}>
                    Making communication easy
                </Typography.Title>
                <Typography.Paragraph strong>
                    Our dedicated account management and customer service teams
                    are trained to respond to your queries and requests promptly
                    and efficiently. Where possible, we provide you with a
                    dedicated point of contact and clear contact details.
                </Typography.Paragraph>
                <Typography.Paragraph>
                    We keep an eye on things, regularly evaluating our
                    communications to make sure we maintain our high standards.
                    In addition to issues concerning your account with us, we’d
                    be grateful if you could also provide feedback on your
                    thoughts and experiences to these teams. It is through
                    responding to feedback that we are able to make
                    improvements, so we value any insight you could share with
                    us.
                </Typography.Paragraph>
                <Typography.Title level={2}>Contacting Us</Typography.Title>
                <Typography.Paragraph>
                    We believe we can provide you with the highest quality
                    support when we understand your business, including your
                    strategy and your market. Our highly trained people are
                    specialists in their fields and yours, supported by a
                    programme of continuous professional development.
                </Typography.Paragraph>
            </Typography>
            {submitted ? (
                <Result
                    status="error"
                    title="Submission Failed"
                    subTitle="Tbh we don't really care lmao 😂"
                    extra={
                        <Button onClick={() => setSubmitted(false)}>
                            Try again
                        </Button>
                    }
                ></Result>
            ) : (
                <Form
                    layout="vertical"
                    onFinish={() => {
                        const hide = message.loading("Submitting...");
                        setIsLoading(true);
                        setTimeout(() => {
                            hide();
                            setSubmitted(true);
                            setIsLoading(false);
                        }, 2000);
                    }}
                >
                    <Form.Item label="Name">
                        <Input placeholder="John Wick" type="text" />
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input placeholder="johnwick@amogus.com" type="email" />
                    </Form.Item>
                    <Form.Item label="Message">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </>
    );
};
