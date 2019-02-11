import React from 'react';
import {Form, Input, Icon, Button} from 'antd';
import {randomNum} from '../../util/commonUtils';
import './style.css';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            verificationCode: ''            // 验证码
        };
    }

    componentDidMount() {
        // 组件加载前生辰验证码
        this.generateVerificationCode();
    }

    generateVerificationCode = () => {
        // const ctx = this.canvas.getContext('2d');
        // const chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        // let code = '';
        // ctx.clearRect(0, 0, 80, 39);
        // for (let i = 0; i < 4; i++) {
        //     const char = chars[randomNum(0, 57)];
        //     code += char;
        //     ctx.font = randomNum(20, 25) + 'px SimHei';     //设置字体随机大小
        //     ctx.fillStyle = '#000000';
        //     ctx.textBaseline = 'middle';
        //     ctx.shadowOffsetX = randomNum(-3, 3);
        //     ctx.shadowOffsetY = randomNum(-3, 3);
        //     ctx.shadowBlur = randomNum(-3, 3);
        //     ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        //     let x = 80 / 5 * (i + 1);
        //     let y = 39 / 2;
        //     let deg = randomNum(-25, 25);
        //     /**设置旋转角度和坐标原点**/
        //     ctx.translate(x, y);
        //     ctx.rotate(deg * Math.PI / 180);
        //     ctx.fillText(char, 0, 0);
        //     /**恢复旋转角度和坐标原点**/
        //     ctx.rotate(-deg * Math.PI / 180);
        //     ctx.translate(-x, -y);
        // }
        this.setState({
            verificationCode: 'code'
        });
    };

    handleSubmit = (e) => {

    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit} className={'login-form'}>
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: '请输入用户名'}]
                    })(
                        <Input prefix={
                            <Icon type={'user'} style={{color: 'rgba(0,0,0,.25)'}}/>
                        } placeholder={'用户名'}/>
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码'}]
                    })(
                        <Input prefix={
                            <Icon type={'lock'} style={{color: 'rgba(0,0,0,.25)'}}/>
                        } type={'password'} placeholder={'密码'}/>
                    )}
                </Form.Item>
                <Button type={'primary'} htmlType={'submit'} className={'login-form-button'}>
                    登录
                </Button>
            </Form>
        );
    }
}

const MyLoginForm = Form.create()(LoginForm);

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showBox: 'login',
            backgroundUrl: '',
            loading: false
        };
    }

    render() {
        return (
            <div id={'login-page'}>
                <div className={'container'}>
                    <MyLoginForm className={'box showBox'}/>
                </div>
            </div>
        );
    }
}

export default Login;
