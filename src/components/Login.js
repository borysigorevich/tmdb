import React, {useState, useContext} from 'react';
import {useNavigate, useHistory} from 'react-router-dom'
import API from '../API'
//Components
import Button from "./Button/Button";
//styles
import {Wrapper} from './Login.styles'
//Context
import {Context} from '../context'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const [_user, setUser] = useContext(Context)
    // const navigate = useNavigate()
    const history = useHistory()

    const handleSubmit = async () => {
        setError(false)
        try {
            const requestToken = await API.getRequestToken()
            const sessionId = await API.authenticate(
                requestToken,
                username,
                password
            )
            console.log(sessionId)
            setUser({
                sessionId: sessionId.session_id,
                username
            })
            history.push('/')
        } catch (error) {
            setError(true)
        }
    }

    const handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value

        if (name === 'username') setUsername(value)
        if (name === 'password') setPassword(value)

    }

    return (
        <Wrapper>
            {error && <div className={'error'}>There was an error</div>}
            <label htmlFor="">Username:</label>
            <input type="text"
                   placeholder={'Username'}
                   value={username}
                   name={'username'}
                   onChange={handleInput}/>
            <input type="password"
                   value={password}
                   name={'password'}
                   placeholder={'Password'}
                   onChange={handleInput}
            />
            <Button text={'Login'} callback={handleSubmit}/>
        </Wrapper>
    );
};

export default Login;