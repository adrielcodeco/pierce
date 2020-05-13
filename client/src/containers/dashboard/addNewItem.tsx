import React from 'react'
import PubSub from 'pubsub-js'
import { Modal } from 'src/components/modal'
import styles from './addNewItem.jss'
import { Messages } from 'src/components/messages'
import { Loading } from 'src/components/loading'
import { send } from 'src/events/generic'
import {
  Formify,
  FormifyPreventDefault,
  validationErrors
} from 'src/components/formify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { addItem, alterItem } from 'src/services/items'

export const AddNewItem = ({ openOn, isOpen }: any) => {
  const classes = styles()
  const [open, setOpen] = React.useState(isOpen || false)
  const [update, setUpdate] = React.useState<any>()
  React.useEffect(() => {
    const subscribeOpenOn = PubSub.subscribe(openOn, (_: any, data: any) => {
      if (data) {
        setUpdate(data)
      }
      setOpen(!open)
    })
    return () => {
      PubSub.unsubscribe(subscribeOpenOn)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const onClose = () => {
    setOpen(false)
  }
  const validate = (values: any) => {
    const errors: any = {
      name: []
    }
    if (!values.name) errors.name.push(validationErrors.required)
    return errors
  }

  const onSubmit = async (values: any) => {
    try {
      if (update) {
        await alterItem(update.id, { name: values.name })
      } else {
        await addItem({ name: values.name })
      }
      PubSub.publish('DASHBOARD_UPDATE', {})
      onClose()
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes.box}>
        <FontAwesomeIcon
          icon={faTimes}
          className={classes.close}
          onClick={onClose}
        />
        <h3 className={classes.header}>{update ? 'Update' : 'Add'} item</h3>
        <Messages showOn='ADDNEWITEM' />
        {update ? (
          <div className={classes.updateDetais}>
            <label>
              ID: <b>{update.id}</b>
            </label>
            <label>
              Current name: <b>{update.name}</b>
            </label>
          </div>
        ) : null}
        <Formify
          id='addNewItemForm'
          onValidate={validate}
          onSubmit={onSubmit}
          preventDefault={FormifyPreventDefault.always}
          onLoading={(loading: any) => send('addNewItemForm_loading', loading)}
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
                  field: 'name',
                  Input: ({ value, error, changeValue }: any) => (
                    <>
                      <div className={classes.formItemGroup}>
                        <label className={classes.formLabel}>
                          {update ? 'New name:' : 'Name:'}
                        </label>
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
                      message: 'The Name field is required.'
                    }
                  ]
                })}
                <div>
                  <button className={classes.submitButton} type='submit'>
                    {update ? 'Update' : 'Add'}
                  </button>
                </div>
              </>
            )
          }}
        />
      </div>
    </Modal>
  )
}
