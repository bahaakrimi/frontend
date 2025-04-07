import App from './App'
import Electronic from './Electronic'
import Fashion from './Fashion'
import Jewellery from './Jewellery'
import { Form, Link } from 'react-router-dom';


function ComposantFc(props) {
    //js
  return (
    <div>
        {/* jsx */}
      hello hello {props.nom} {props.prenom}
    </div>
  )
}

export default ComposantFc