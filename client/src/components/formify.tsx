import React from 'react'
import PropTypes from 'prop-types'
import PubSub from 'pubsub-js'
const autobind = require('react-autobind')

export const validationErrors = {
  required: 'required',
  maxLength: 'maxLength',
  minLength: 'minLength',
  invalid: 'invalid',
  isNumber: 'isNumber',
  minValue: 'minValue',
  maxValue: 'maxValue'
}

export const FormifyPreventDefault = {
  always: Symbol('always'),
  never: Symbol('never'),
  onInvalid: Symbol('onInvalid')
}

const UpdateValueWrapper = (Input: any) => {
  class Wrapper extends React.PureComponent {
    static propTypes = {
      formName: PropTypes.string,
      fieldName: PropTypes.string,
      value: PropTypes.any,
      error: PropTypes.any,
      values: PropTypes.any
    }
    static defaultProps = {}
    notifyKey: string
    constructor (props: any) {
      super(props)
      autobind(this)
      this.state = {
        value: props.value,
        error: props.error,
        values: Object.assign({}, props.values)
      }
      this.notifyKey = `${props.formName}.${props.fieldName}.notify`
      PubSub.unsubscribe(this.notifyKey)
      PubSub.subscribe(this.notifyKey, this.notify)
    }

    render () {
      const state: any = this.state
      const newProps: any = Object.assign({}, this.props)
      newProps.value = state.value
      newProps.error = state.error
      newProps.values = state.values
      return <Input {...newProps} />
    }

    componentWillUnmount () {
      PubSub.unsubscribe(this.notify)
    }

    // @autobind()
    notify (msg: string, { value, error, values }: any) {
      this.setState({ value, error, values: Object.assign({}, values) })
    }
  }
  return Wrapper
}

export const Formify = ({
  id,
  render = () => {
    /* does nothing*/
  },
  onSubmit,
  onReset,
  onValidate,
  onLoading,
  className,
  defaultValues = {},
  preventDefault = FormifyPreventDefault.always,
  action,
  method
}: any) => {
  class Form extends React.PureComponent<
    {},
    { validations: string[] | undefined; loading: boolean | undefined }
  > {
    values: any
    depends: any
    form: any
    constructor (props: any) {
      super(props)
      autobind(this)
      this.state = {
        validations: [],
        loading: false
      }
      this.values = {}
      this.depends = {}
      this.form = React.createRef()
    }

    render () {
      return (
        <form
          id={id}
          action={action}
          method={method}
          onSubmit={this.onSubmitHandle}
          className={className}
          ref={this.form}
        >
          {render({
            input: this.input,
            reset: this.reset,
            loading: this.state.loading
          })}
        </form>
      )
    }

    // @autobind()
    input ({ field, Input, errors = [], depends = [] }: any) {
      this.setDepends(depends, field)
      if (!Reflect.has(this.values, field)) {
        this.values[field] = undefined
      }
      const props: any = {}
      const validations = this.state.validations || []
      if (validations[field]) {
        if (errors) {
          props.error = errors
            .filter((e: any) => validations[field].includes(e.err))
            .concat([{ message: undefined }])[0].message
        } else {
          props.error = validations[field]
        }
      }
      if (defaultValues && defaultValues[field] !== undefined) {
        this.values[field] = defaultValues[field]
      }
      props.value = this.values[field]
      const UpdateValue = UpdateValueWrapper(Input)
      const changeValue = ((f) => f.bind(this))((newValue: any) => {
        this.values[field] = newValue
        const validations = !!onValidate && onValidate(this.values)
        let error
        if (errors) {
          error = (
            errors.filter(
              (e: any) => e.err === (validations[field] || [])[0]
            )[0] || {}
          ).message
        } else {
          error = (validations[field] || [])[0]
        }
        PubSub.publish(`${id}.${field}.notify`, {
          value: newValue,
          error
        })
        if (Reflect.has(this.depends, field)) {
          this.depends[field].forEach(
            ((f) => f.bind(this))((d: any) => {
              PubSub.publish(`${id}.${d}.notify`, {
                values: this.values
              })
            })
          )
        }
      })
      props.changeValue = (newValue: any) => {
        const getValue = (e: any) => e.target.value
        if (newValue === undefined) {
          return (args: any) => {
            newValue = getValue(args)
            changeValue(newValue)
          }
        }
        if (newValue.constructor.name === 'SyntheticEvent') {
          newValue = getValue(newValue)
          changeValue(newValue)
          return
        }
        if (typeof newValue === 'function') {
          return (...args: any[]) => {
            newValue = newValue(...args)
            changeValue(newValue)
          }
        }
        changeValue(newValue)
      }
      return <UpdateValue formName={id} fieldName={field} {...props} />
    }

    setDepends (depends = [], field: any) {
      depends.forEach((d) => {
        if (Reflect.has(this.depends, d)) {
          if (!this.depends[d].includes(field)) {
            this.depends[d].push(field)
          }
        } else {
          this.depends[d] = [field]
        }
      })
    }

    setValidations (validations: any) {
      this.setState({ validations })
    }

    validate () {
      const errors = !!onValidate && onValidate(this.values)
      if (errors && Object.keys(errors).length > 0) {
        this.setValidations(errors)
      }
    }

    // @autobind()
    reset () {
      !!onReset && onReset()
      this.values = {}
      if (this.form.current) {
        this.form.current.reset()
        this.setState({ validations: [] })
      }
    }

    // @autobind()
    onSubmitHandle (event: any) {
      if (preventDefault === FormifyPreventDefault.always) {
        event.preventDefault()
      }
      const errors = !!onValidate && onValidate(this.values)
      if (
        errors &&
        Object.keys(errors).filter((k) => errors[k].length > 0).length > 0
      ) {
        if (preventDefault === FormifyPreventDefault.onInvalid) {
          event.preventDefault()
        }
        this.setValidations(errors)
        return
      }
      if (onSubmit) {
        this.setState({ loading: true })
        onLoading && onLoading(true)
        Promise.resolve(onSubmit(this.values))
          .then((result) => {
            if (result === true || result === undefined || result === '') {
              this.reset()
            }
            this.setState({ loading: false })
            onLoading && onLoading(false)
          })
          .catch((err) => {
            if (Object.keys(err).filter((k) => err[k].length > 0).length > 0) {
              this.setValidations(err)
            }
            this.setState({ loading: false })
            onLoading && onLoading(false)
          })
      }
    }
  }
  return <Form />
}

Formify.propTypes = {
  id: PropTypes.string,
  render: PropTypes.func,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  onLoading: PropTypes.func,
  onValidate: PropTypes.func,
  defaultValues: PropTypes.object,
  preventDefault: PropTypes.symbol,
  action: PropTypes.string,
  method: PropTypes.string,
  className: PropTypes.string
}

Formify.defaultProps = {}
