export const uploadProductImage = (formData, token) => async dispatch => {
  try {
    await fetch(`http://localhost:3001/upload/uploadproductimage`, {
      method: 'POST',
      body: formData,
      headers: {
        // 'Content-Type': 'application/json',
        'auth-token': token
      },
    })
      .then(data => data.json())
      .then(res => {
        if (res.status === 200) {
          // dispatch({
          //   type: 'UPLOAD_PRODUCTIMAGE',
          //   payload: res.upload
          // })
          console.log('LISTO')
        }
      })
  } catch (err) {
    console.log(err)
  }
}