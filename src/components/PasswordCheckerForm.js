import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';

const ENDPOINT = 'https://o9etf82346.execute-api.us-east-1.amazonaws.com/staging/password/strength';

const StrengthIndicator = ({ strength }) => {
    const [indicators, setIndicators] = useState(new Array(5).fill(null));
    const [passwordRemark, setPasswordRemark] = useState('')

    useEffect(() => {
        let indicator = [];
        let passwordRemarkMessage = '';

        if (strength === 0) {
            indicator = ['#E34234'];
            passwordRemarkMessage = 'Your password is too weak!'
        } else if (strength === 1) {
            indicator = new Array(2).fill('#E34234')
            passwordRemarkMessage = 'Your password is very weak!'
        } else if (strength === 2) {
            indicator = new Array(3).fill('#FFC300')
            passwordRemarkMessage = 'Your password is medium!'
        } else if (strength === 3) {
            indicator = new Array(4).fill('#9FE2BF')
            passwordRemarkMessage = 'Your password is strong!'
        } else if (strength >= 4) {
            indicator = new Array(5).fill('#9FE2BF')
            passwordRemarkMessage = 'Your password is very strong!'
        } else {
            indicator = new Array(5).fill('#f5f5f5');
        }

        if (indicator.length < 5) {
            const difference = 5 - indicator.length;
            indicator = [...indicator, ...new Array(difference).fill('#f5f5f5')]
        }

        setIndicators(indicator)
        setPasswordRemark(passwordRemarkMessage)

    }, [strength])

    return (
        <Fragment>
            <ul className="password-checker-form_badges" id="passwordStrength">
                {indicators.map((indicator, index) => (
                    <li key={`indicator-${index}`}>
                        <div className="password-checker-form_badge" style={{ backgroundColor: indicator}}></div>
                    </li>
                ))}
            </ul>
            {passwordRemark && (
               <p >{passwordRemark}</p>
            )}
        </Fragment>
    )
}

export default function PasswordCheckerForm() {
    const [data, setData] = useState({});
    const [password, setPassword] = useState('');

    const checkPassword = async (password) => {
        try {

            const requestConfig = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            };

            const response = await fetch(
                ENDPOINT,
                requestConfig,
                { mode: 'no-cors' }
            );

            const data = await response.json();

            setData(data);

        } catch (err) {
            console.log("err", err)
        }
    }

    const debouncedCheckPassword = useCallback(
        debounce(checkPassword, 200),
        [checkPassword, password]
    )

    const onPasswordChange = useCallback((event) => {
        setPassword(event.target.value);
        debouncedCheckPassword(event.target.value)
    }, []);


    return (
        <div className="password-checker-form">
            <h2>Is your password strong enough?</h2>

            <input placeholder="Please enter your password" type="password" id="passwordInput" value={password} onChange={onPasswordChange}/>

            <StrengthIndicator strength={data.score}/>

            { !!password && data?.guessTimeString && (
                 <p>It will take {data.guessTimeString} to guess your password.</p>
            )}
            { data?.score <= 2 &&
                <p className="suggestion-error">{data.suggestions}</p>
            }
        </div>
    )
}