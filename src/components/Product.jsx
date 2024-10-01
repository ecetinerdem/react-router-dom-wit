import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function Product() {
  const { id, name } = useParams();
  console.log('burada');
  return <p>Product Us {id + name}</p>;
}

export default Product;
