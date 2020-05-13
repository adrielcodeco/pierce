import React from 'react'
import { layoutContext } from 'src/data/layoutContext'
import styles from './login.jss'
import {
  Formify,
  FormifyPreventDefault,
  validationErrors
} from 'src/components/formify'
import { send } from 'src/events/generic'
import validator from 'validator'
import { login } from 'src/services/auth'
import { redirectToDashboard } from 'src/services/redirect'
import { Messages } from 'src/components/messages'
import { Loading } from 'src/components/loading'

const validate = (values: any) => {
  const errors: any = {
    login: [],
    pass: []
  }
  if (!values.login) errors.login.push(validationErrors.required)
  if (!values.pass) errors.pass.push(validationErrors.required)
  if (values.login && !validator.isEmail(values.login)) {
    errors.login.push(validationErrors.invalid)
  }
  if (values.pass && values.pass.length < 4) {
    errors.pass.push(validationErrors.minLength)
  }
  return errors
}

const onSubmit = async (values: any) => {
  if (values.rememberMe) {
    window.localStorage.setItem('login', values.login)
  } else {
    window.localStorage.removeItem('login')
  }
  try {
    await login(values.login, values.pass)
    redirectToDashboard()
  } catch (err) {
    console.error(err)
  }
}

export const Login = () => {
  layoutContext.cleanMode(true)
  const classes = styles()
  return (
    <>
      <div className={classes.vcenter}>
        <div className={classes.box}>
          <h4 className={classes.title}>Login</h4>
          <Messages showOn='LOGIN' />
          <Formify
            id='siginForm'
            defaultValues={((login) => (login ? { login } : {}))(
              window.localStorage.getItem('login')
            )}
            onValidate={validate}
            onSubmit={onSubmit}
            preventDefault={FormifyPreventDefault.always}
            onLoading={(loading: any) => send('siginForm_loading', loading)}
            className={classes.form}
            render={({ input, loading }: any) => {
              return (
                <>
                  {loading ? (
                    <div className={classes.loading}>
                      <Loading />
                    </div>
                  ) : null}
                  {input({
                    field: 'login',
                    Input: ({ value, error, changeValue }: any) => (
                      <>
                        <div className={classes.formItemGroup}>
                          <label className={classes.formLabel}>Email:</label>
                          <input
                            type='text'
                            className={classes.formInput}
                            value={value}
                            onChange={changeValue((e: any) => e.target.value)}
                          />
                        </div>
                        {error ? (
                          <span className={classes.errorMessage}>{error}</span>
                        ) : null}
                      </>
                    ),
                    errors: [
                      {
                        err: validationErrors.required,
                        message: 'The Email field is required.'
                      },
                      {
                        err: validationErrors.invalid,
                        message: 'Invalid Email.'
                      }
                    ]
                  })}
                  {input({
                    field: 'pass',
                    Input: ({ value, error, changeValue }: any) => (
                      <>
                        <div className={classes.formItemGroup}>
                          <label className={classes.formLabel}>Password:</label>
                          <input
                            type='password'
                            className={classes.formInput}
                            value={value}
                            onChange={changeValue((e: any) => e.target.value)}
                          />
                        </div>
                        {error ? (
                          <span className={classes.errorMessage}>{error}</span>
                        ) : null}
                      </>
                    ),
                    errors: [
                      {
                        err: validationErrors.required,
                        message: 'The Password field is required.'
                      },
                      {
                        err: validationErrors.minLength,
                        message: 'The password need be greater than 3 digits.'
                      }
                    ]
                  })}
                  {input({
                    field: 'rememberMe',
                    Input: ({ value, changeValue }: any) => (
                      <label className={classes.formItemGroupCheckbox}>
                        <input
                          type='checkbox'
                          id='rememberme'
                          name='rememberme'
                          checked={value || false}
                          className={classes.checkbox}
                          onChange={changeValue((e: any) => e.target.checked)}
                        />
                        <span className={classes.formCheckboxLabel}>
                          Remember me
                        </span>
                      </label>
                    )
                  })}
                  <div>
                    <button className={classes.loginButton} type='submit'>
                      Log In
                    </button>
                  </div>
                </>
              )
            }}
          />
        </div>
      </div>
    </>
  )
}
