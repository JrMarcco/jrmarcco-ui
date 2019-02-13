import React from 'react';
import {withRouter} from 'react-router-dom';
import {Card, Form, Col, Row, Input, Icon, Button, message} from 'antd';
import Loading from '../../components/Loadling/index';
import {randomNum} from '../../util/commonUtils';
import axios from 'axios';
import './style.css';

@withRouter @Form.create()
class LoginForm extends React.Component {
    state = {
        verificationCode: ''            // 验证码
    };

    componentDidMount() {
        // 组件加载前生成验证码
        this.generateVerificationCode();
    }

    generateVerificationCode = () => {
        const ctx = this.canvas.getContext('2d');
        const chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        let code = '';
        ctx.clearRect(0, 0, 80, 39);
        for (let i = 0; i < 4; i++) {
            const char = chars[randomNum(0, 57)];
            code += char;
            ctx.font = randomNum(20, 25) + 'px SimHei';     //设置字体随机大小
            ctx.fillStyle = '#000000';
            ctx.textBaseline = 'middle';
            ctx.shadowOffsetX = randomNum(-3, 3);
            ctx.shadowOffsetY = randomNum(-3, 3);
            ctx.shadowBlur = randomNum(-3, 3);
            ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            let x = 80 / 5 * (i + 1);
            let y = 39 / 2;
            let deg = randomNum(-25, 25);
            /**设置旋转角度和坐标原点**/
            ctx.translate(x, y);
            ctx.rotate(deg * Math.PI / 180);
            ctx.fillText(char, 0, 0);
            /**恢复旋转角度和坐标原点**/
            ctx.rotate(-deg * Math.PI / 180);
            ctx.translate(-x, -y);
        }
        this.setState({
            verificationCode: code
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                // 检验验证码
                // if (this.state.verificationCode.toUpperCase() !== values.verificationCode.toUpperCase()) {
                //     this.props.form.setFields({
                //         verificationCode: {
                //             value: values.verificationCode,
                //             errors: [new Error('验证码错误')]
                //         }
                //     });
                //     return;
                // }
                // 执行登录动作
                axios.post('http://localhost:18002/auth/jwt/getToken', values)
                    .then((result) => {
                        if (result.data.code === '000000') {
                            message.success('登录成功');
                        } else {
                            message.error(result.data.message);
                        }
                    });
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} className={'login-form'}>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: '请输入用户名'}]
                        })(
                            <Input prefix={
                                <Icon type={'user'} style={{color: 'rgba(0,0,0,.25)'}}/>
                            } maxLength={16} placeholder={'用户名'}/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: '请输入密码'}]
                        })(
                            <Input prefix={
                                <Icon type={'lock'} style={{color: 'rgba(0,0,0,.25)'}}/>
                            } type={'password'} maxLength={16} placeholder={'密    码'}/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('verificationCode', {
                            rules: [{required: true, message: '请输入验证码'}]
                        })(
                            <Row>
                                <Col span={15}>
                                    <Input prefix={
                                        <Icon type={'safety'} style={{color: 'rgba(0,0,0,.25)'}}/>
                                    } maxLength={4} placeholder={'验证码'}/>
                                </Col>
                                <Col span={9}>
                                    <canvas onClick={this.generateVerificationCode} width="80" height='39' ref={el => this.canvas = el}/>
                                </Col>
                            </Row>
                        )}
                    </Form.Item>
                    <Button htmlType={'submit'} className={'login-btn'}>
                        登录
                    </Button>
                </Form>
            </div>
        );
    }
}

class Login extends React.Component {
    state = {
        loading: false
    };

    render() {
        const {loading} = this.state;
        return (
            <div id={'login-page'}>
                {
                    loading ?
                        <div>
                            <Loading/>
                        </div>
                        :
                        <div>
                            <div>
                                <Card className={'login-card'}>
                                    <LoginForm/>
                                </Card>
                            </div>
                        </div>
                }
            </div>
        );
    }
}

export default Login;
