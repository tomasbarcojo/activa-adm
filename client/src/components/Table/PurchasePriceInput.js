import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addDataPurchase } from '../../actions/purchases'

export default function PurchasePriceInput({ id }) {
  const [price, setPrice] = useState(0)
  const dispatch = useDispatch()
  const purchase = useSelector(state => state.purchase)

  useEffect(() => {
    if (price !== 0 || purchase.length > 0) {
      let arrPurchase = purchase;
      var changeMade = false
      arrPurchase.map(el => {
        if (el.id === id) {
          el.price = price;
          changeMade = true;
        }
      })
      console.log(arrPurchase)
      if (!changeMade) {
        const newData = {
          id: id,
          price: price
        }
        arrPurchase.push(newData)
        dispatch(addDataPurchase(arrPurchase))
      } else {
        dispatch(addDataPurchase(arrPurchase))
      }
    }
  }, [price])

  //   const handleAddCounter = () => {
  //     if (Number.isNaN(quantity)) {
  //       setQuantity(1)
  //     } else {
  //       setQuantity(quantity + 1)
  //     }
  //   }

  //   const handleReduceCounter = () => {
  //     setQuantity(quantity - 1)
  //     if (quantity <= 0) {
  //       setQuantity(0)
  //     }
  //   }

    const handleChangePrice = (event) => {
      const value = parseInt(event.target.value);
      if (value < 1) {
        setPrice(0)
      } else {
        setPrice(value)
      }
    }

  return (
    <input
      id={id}
      onChange={handleChangePrice}
      type='number'
      value={price}
    />
  )
}