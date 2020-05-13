import React from 'react'
import PubSub from 'pubsub-js'
import { Modal } from 'src/components/modal'
import styles from './deleteItems.jss'
import { removeItem } from 'src/services/items'

export const RemoveItem = ({ openOn, isOpen }: any) => {
  const classes = styles()
  const [open, setOpen] = React.useState(isOpen || false)
  const [selectedItems, setSelectedItems] = React.useState<any[]>([])
  React.useEffect(() => {
    const subscribeOpenOn = PubSub.subscribe(openOn, (_: any, data: any) => {
      setOpen(!open)
      setSelectedItems(data)
    })
    return () => {
      PubSub.unsubscribe(subscribeOpenOn)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const onClose = () => {
    setOpen(false)
  }
  const onRemove = () => {
    Promise.all(selectedItems.map((i) => removeItem(i.id)))
      .then(() => {
        PubSub.publish('DASHBOARD_UPDATE', {})
        setOpen(false)
      })
      .catch(console.error)
  }
  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes.box}>
        <h3 className={classes.header}>Remove selected items</h3>
        {selectedItems.map((i) => (
          <label className={classes.itemsLabel}>- {i.name}</label>
        ))}
        <div className={classes.buttons}>
          <button onClick={onRemove} className={classes.btnOk}>
            remove
          </button>
          <button onClick={onClose} className={classes.btnCancel}>
            cancel
          </button>
        </div>
      </div>
    </Modal>
  )
}
