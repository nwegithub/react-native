
   
export const SaveData = (data) => {
  return{
    type: 'SAVE_DATA',
    data
  }
}

export const RemoveData = () => {
  return{
    type: 'REMOVE_DATA'
  }
}

export default {
  SaveData,
  RemoveData
}

