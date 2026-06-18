import { useState } from 'react';



 const Main = () => {

    const [data, setData] = useState([
    {
      id: 1,
      title: "туфли",
      quantity: 40,
      color: "красные",
      price: 100,
      size: 40,
      Barcode: 1234567890,
      status: "в наличии",
      warehouse: 2,
      warehouset: 3
    },
    {
      id: 2,
      title: "кроссовки",
      quantity: 20,
      color: "черные",
      price: 150,
      size: 42,
      Barcode: 1234567891,
      warehouse: 3,
      warehouset: 6
    },
    {
      id: 3,
      title: "ботинки",
      quantity: 10,
      color: "коричневые",
      price: 200,
      size: 41,
      Barcode: 1234567892,
      warehouse: 1,
      warehouset: 4
    },
    {
      id: 4,
      title: "Адидосы",
      quantity: 10,
      color: "коричневые",
      price: 200,
      size: 41,
      Barcode: 1234567892,
      warehouse: 1,
      warehouset: 4
    }
    ,
    {
      id: 5,
      title: "шлепанцы",
      quantity: 10,
      color: "коричневые",
      price: 200,
      size: 41,
      Barcode: 1234567892,
      warehouse: 1,  
      warehouset: 4
    }
  ]);

  const [count, setCount] = useState("");
  const [result, setResult] = useState("");


  const handleChange = (e) => {
    setResult(count)
  }
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        handleChange();
    }
  }
  const updateWarehouse = (barcodeToFind) => {
     setData(data.map(el => 
      el.Barcode === barcodeToFind 
       ? { ...el, warehouset: count, warehouse: count }
       : el
    ));
  }
    
    

    return (
        <div>
              <input type="text"  onKeyDown={handleKeyDown}  onChange={(e) => setCount(e.target.value)} />
                <button onClick={() => handleChange()} >
                       Нажми меня
                </button>
               
                <div>
                  <button onClick={() => updateWarehouse(+result)}>
                     click
                  </button>
                    <div>
                        {
                            data.map(el => (
                                <div key={el.id}>
                                    {
                                        el.Barcode === +result  ? (
                                           <div>
                                           <h1>название: {el.title}</h1>
                                           <h2> warehouse: {el.warehouse} \  {el.warehouset} </h2>
                                           </div>
                                        ) : null
                                    }

                                </div>
                            ))  
                                
                       
                        }
                    </div>
                </div>
        </div>
    )
}

export default Main;
















