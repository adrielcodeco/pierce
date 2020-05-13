import React from 'react'
import { layoutContext } from 'src/data/layoutContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import styles from './dashboard.jss'
import { listItems } from 'src/services/items'
import short from 'short-uuid'
import { AddNewItem } from './addNewItem'
import { RemoveItem } from './deleteIItems'
import PubSub from 'pubsub-js'
import { Loading } from 'src/components/loading'

export const Dashboard = () => {
  layoutContext.cleanMode(false)
  const classes = styles()
  const [items, setItems] = React.useState<any[]>([])
  const [selectedItems, setSelectedItems] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    const load = () => {
      listItems()
        .then((items) => {
          setItems(items)
          setSelectedItems([])
          setLoading(false)
        })
        .catch(console.error)
    }
    load()
    const loadEvent = PubSub.subscribe('DASHBOARD_UPDATE', () => {
      setLoading(true)
      load()
    })
    return () => {
      PubSub.unsubscribe(loadEvent)
    }
  }, [])
  const keyOpenAddNewItem = 'event.Dashboard.AddNewItem'
  const keyOpenRemoveItem = 'event.Dashboard.RemoveItem'
  const addNewItem = () => {
    PubSub.publish(keyOpenAddNewItem, undefined)
  }
  const checkAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(items)
    }
  }
  const onCheck = (item: any) => {
    return () => {
      if (selectedItems.includes(item)) {
        setSelectedItems(selectedItems.filter((i) => i.id !== item.id))
      } else {
        setSelectedItems([...selectedItems, item])
      }
    }
  }
  const removeItem = () => {
    PubSub.publish(keyOpenRemoveItem, selectedItems)
  }
  const handleEdit = (item: any) => {
    return () => {
      PubSub.publish(keyOpenAddNewItem, item)
    }
  }
  const handleDelete = (item: any) => {
    return () => {
      PubSub.publish(keyOpenRemoveItem, [item])
    }
  }
  return (
    <>
      <h4>Items</h4>
      <div className={classes.selectAll}>
        <label>
          <input
            type='checkbox'
            checked={selectedItems.length > 0}
            onChange={checkAll}
          />
          <span>Select All</span>
        </label>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <table className={classes.table}>
          <tbody className={classes.tbody}>
            {items.map((item) => (
              <tr key={short.generate()} className={classes.tr}>
                <td className={classes.td}>
                  <input
                    type='checkbox'
                    checked={selectedItems.includes(item)}
                    onChange={onCheck(item)}
                  />
                </td>
                <td className={classes.td}>{item.id}</td>
                <td className={classes.td}>{item.name}</td>
                <td className={classes.td}>
                  <FontAwesomeIcon
                    icon={faPencilAlt}
                    className={classes.actions}
                    onClick={handleEdit(item)}
                  />
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    className={classes.actions}
                    onClick={handleDelete(item)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className={classes.buttons}>
        <button onClick={addNewItem} className={classes.btnAdd}>
          Add new item
        </button>
        <button
          disabled={selectedItems.length === 0}
          onClick={removeItem}
          className={classes.btnRemove}
        >
          Delete selected items
        </button>
      </div>
      <AddNewItem openOn={keyOpenAddNewItem} />
      <RemoveItem openOn={keyOpenRemoveItem} />
    </>
  )
}
