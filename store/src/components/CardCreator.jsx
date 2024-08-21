import '../css/CardEditor.css'
import React, {useState} from 'react'

export default function CardCreator(props) {
  const [img, setImg] = useState(undefined)
  const [imgUrl, setImgUrl] = useState(undefined)
  const [price, setPrice] = useState(0)
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState(0)

  async function sendDishToServer(){
    const form = new FormData();
    form.append('image', img);

    fetch(`https://api.imgbb.com/1/upload?expiration=15552000&key=72dd0a9af9be08a1d4cc0844717e5251&name=${img.name}`, {
          method: 'POST',
          body: form
         })
    .then((response)=>response.json())
    .then((response) => {
          if(response.status == 200)
          {
            let body = {
              "title": title,
              "price": price,
              "desc": desc,
              "img": response.data.url
            }

            fetch(`http://localhost:4444/addDish`, {
              method: 'POST',
              headers: new Headers({'content-type': "application/json; charset=utf-8"}),
              body: JSON.stringify(body)
            })
            .then(()=>{
              props.updateDishes()
            })
          }
        });
  }

  return (
    <div className='cardEditor'>
        <img src={imgUrl} className='imgPreview'/>
        <input className='editorInput' type="file" onChange={(e)=>{
            const file = e.target.files[0];
            setImg(file ? file : undefined);
            setImgUrl(file ? URL.createObjectURL(file) : undefined);
          }
        }/>
        <input placeholder='заголовок' className='editorInput'
               value={title} onChange={(e)=>{setTitle(e.target.value)}}
        />
        <input placeholder='вес' className='editorInput'
               value={desc} onChange={(e)=>{setDesc(e.target.value)}}
        />

        <input placeholder='цена' className='editorInput'
               value={price} onChange={(e)=>{setPrice(e.target.value)}}
        />

        <div className='applyBtn' onClick={sendDishToServer}>
            &#10004;
        </div>
    </div>
  )
}
