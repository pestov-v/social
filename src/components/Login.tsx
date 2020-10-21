import React, {useEffect, useState} from 'react'
import {
    FormControl,
    FormControlLabel,
    Checkbox,
    InputLabel,
    Input, OutlinedInput,
    InputAdornment,
    IconButton,
    FormHelperText,
    Button
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import {EmailTwoTone, Visibility, VisibilityOff} from '@material-ui/icons'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import {useForm, Controller} from 'react-hook-form'
import {Redirect} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {isAuthSelector, captchaUrlSelector} from '../redux/selectors/authSelectors'
import {auth, login} from '../redux/authActions'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: theme.spacing(8),
            '& .MuiFormHelperText-root': {
                position: 'absolute',
                bottom: -20,
                paddingLeft: 5,
                color: '#f00'
            }
        },
        marginBottom: {
            marginBottom: theme.spacing(3)
        },
        emailIcon: {
            padding: 12
        },
        buttonsWrap: {
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2)
        },
        captchaWrap: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        },
        demoAcc: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 150
        },
        demoAccTitle: {
            fontSize: '1.2rem',
            fontWeight: 700,
            marginBottom: '0.5rem'
        }
    })
)

type TFormData = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}
type TProps = {}

const Login: React.FC<TProps> = () => {
    const classes = useStyles()
    const {handleSubmit, control, errors} = useForm<TFormData>()
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState<null | string>(null)
    const isAuth = useSelector(isAuthSelector)
    const captchaUrl = useSelector(captchaUrlSelector)
    const dispatch = useDispatch()
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const [isLogin, setIsLogin] = useState(false)
    const onSubmit = ({email, password, rememberMe, captcha = null}: TFormData) => {
        if (isLogin) {
            const res = dispatch(login(email, password, rememberMe, captcha))
            if (typeof res === 'string') {
                setError(res)
            }
        } else {
            console.log('SignUp:', email, password)
        }
    }

    useEffect(() => {
        dispatch(auth())
    }, [dispatch])

    const handleCloseAlert = () => {
        setError(null)
    }

    return (
        <>
            {isAuth && <Redirect to='/profile'/>}
            {
                error &&
                <Alert onClose={handleCloseAlert} severity="error" variant='filled' style={{position: 'absolute'}} >
                    {error}
                </Alert>
            }
            <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
                <FormControl className={classes.marginBottom}>
                    <InputLabel>Email</InputLabel>
                    <Controller
                        name='email'
                        defaultValue=''
                        as={<Input
                            type='text'
                            endAdornment={
                                <InputAdornment className={classes.emailIcon} position="end">
                                    <EmailTwoTone/>
                                </InputAdornment>
                            }
                        />}
                        control={control}
                        rules={{
                            required: {value: true, message: 'The field is required'},
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
                                message: 'Enter correctly email'
                            }
                        }}
                    />
                    {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
                </FormControl>
                <FormControl className={classes.marginBottom}>
                    <InputLabel>Password</InputLabel>
                    <Controller
                        name='password'
                        defaultValue=''
                        as={<Input
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                    >
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />}
                        control={control}
                        rules={{
                            required: {value: true, message: 'The field is requared'},
                            minLength: {value: 6, message: 'Min length is 6 symbols'}
                        }}
                    />
                    {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
                </FormControl>
                <FormControlLabel
                    control={
                        <Controller
                            name='rememberMe'
                            control={control}
                            defaultValue={false}
                            as={
                                <Checkbox
                                    color="primary"
                                />}
                        />
                    }
                    label="Remember Me"
                />

                {
                    captchaUrl &&
                        <div className={classes.captchaWrap}>
                            <img src={captchaUrl} alt='Captcha' style={{width: 200, height: 'auto'}} />
                            <Controller
                                name='captcha'
                                control={control}
                                defaultValue=''
                                as={<OutlinedInput/>}
                            />
                        </div>
                }

                <div className={classes.buttonsWrap}>
                    <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        onClick={() => setIsLogin(true)}
                    >Sign In</Button>
                    <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        onClick={() => setIsLogin(false)}
                    >Sign Up</Button>
                </div>

            </form>
            <div className={classes.demoAcc}>
                <span className={classes.demoAccTitle}>Demo account:</span>
                <span style={{marginRight: '0.5rem'}}><b>login:</b>&nbsp;pestov.v@yahoo.com</span>
                <span><b>password:</b>&nbsp;123456</span>
            </div>
        </>
    )
}

export default Login
