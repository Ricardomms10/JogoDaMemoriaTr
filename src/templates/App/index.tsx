import './styled.css'
import { Grid } from '../../components/Grid';
import { Cards } from '../../data/cards';

import './styled.css';



export function App() {
  return (
    <div className='app'>
      <Grid cards={Cards}  />
    </div>
  );
}




